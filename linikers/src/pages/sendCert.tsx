// src/pages/sendCert.tsx
//
// Tela de envio de certificado digital. Grava o arquivo na VPS byte a byte,
// sem passar por nenhuma conversao de texto — e mostra na hora se o PKCS#12
// abriu corretamente.
//
// A pagina so existe para quem tem o token: sem ?k=<token> valido ela devolve
// 404, e a API confere o token de novo no servidor.

import { useRef, useState } from "react";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

interface Props {
  token: string;
}

interface Resposta {
  ok?: boolean;
  arquivo?: string;
  bytes?: number;
  sha256?: string;
  pkcs12_valido?: boolean;
  bytes_nulos?: number;
  titular?: string;
  valido_ate?: string;
  certificados_na_cadeia?: number;
  erro?: string;
  diagnostico?: string;
  detail?: string;
}

export const getServerSideProps: GetServerSideProps<Props> = async (contexto) => {
  const esperado = process.env.SENDCERT_TOKEN || "";
  const recebido = typeof contexto.query.k === "string" ? contexto.query.k : "";

  if (!esperado || recebido !== esperado) {
    return { notFound: true };
  }

  return { props: { token: recebido } };
};

export default function SendCert({ token }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [senha, setSenha] = useState("");
  const [sobre, setSobre] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [resultado, setResultado] = useState<Resposta | null>(null);
  const [erroRede, setErroRede] = useState("");

  function escolher(lista: FileList | null) {
    if (lista && lista[0]) {
      setArquivo(lista[0]);
      setResultado(null);
      setErroRede("");
    }
  }

  async function enviar() {
    if (!arquivo) return;
    setEnviando(true);
    setResultado(null);
    setErroRede("");

    const corpo = new FormData();
    corpo.append("arquivo", arquivo, arquivo.name);
    corpo.append("senha", senha || "");

    try {
      const resposta = await fetch("/api/sendCert", {
        method: "POST",
        headers: { "x-sendcert-token": token },
        body: corpo,
      });
      const json = (await resposta.json()) as Resposta;
      setResultado(json);
    } catch (erro) {
      setErroRede(String(erro));
    } finally {
      setEnviando(false);
    }
  }

  const tamanho = arquivo ? `${(arquivo.size / 1024).toFixed(1)} kB` : "";

  return (
    <>
      <Head>
        <title>Enviar certificado</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <Container maxWidth="sm" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Enviar certificado
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.7, mb: 4 }}>
          O arquivo é gravado exatamente como está — sem conversão de texto.
        </Typography>

        <Paper
          variant="outlined"
          onDragEnter={(evento) => {
            evento.preventDefault();
            setSobre(true);
          }}
          onDragOver={(evento) => {
            evento.preventDefault();
            setSobre(true);
          }}
          onDragLeave={() => setSobre(false)}
          onDrop={(evento) => {
            evento.preventDefault();
            setSobre(false);
            escolher(evento.dataTransfer.files);
          }}
          onClick={() => inputRef.current?.click()}
          sx={{
            p: 5,
            textAlign: "center",
            cursor: "pointer",
            borderStyle: "dashed",
            borderWidth: 2,
            borderColor: sobre ? "primary.main" : "divider",
            transition: "border-color .15s",
            "&:hover": { borderColor: "primary.main" },
          }}
        >
          <CloudUploadIcon sx={{ fontSize: 44, opacity: 0.6, mb: 1 }} />
          <Typography sx={{ fontWeight: 600 }}>Arraste o .pfx aqui</Typography>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            ou clique para escolher o arquivo
          </Typography>
          <input
            ref={inputRef}
            type="file"
            hidden
            onChange={(evento) => escolher(evento.target.files)}
          />
        </Paper>

        {arquivo && (
          <Stack direction="row" spacing={1} sx={{ mt: 2, alignItems: "center" }}>
            <Chip
              label={`${arquivo.name} · ${tamanho}`}
              onDelete={() => setArquivo(null)}
              variant="outlined"
            />
          </Stack>
        )}

        <TextField
          fullWidth
          type="password"
          label="Senha do certificado (opcional)"
          helperText="Usada apenas para conferir aqui se o arquivo abre corretamente."
          value={senha}
          onChange={(evento) => setSenha(evento.target.value)}
          sx={{ mt: 3 }}
        />

        <Button
          fullWidth
          size="large"
          variant="contained"
          disabled={!arquivo || enviando}
          onClick={enviar}
          startIcon={enviando ? <CircularProgress size={18} color="inherit" /> : null}
          sx={{ mt: 2 }}
        >
          {enviando ? "Enviando..." : "Enviar"}
        </Button>

        {erroRede && (
          <Alert severity="error" sx={{ mt: 3 }}>
            {erroRede}
          </Alert>
        )}

        {resultado && resultado.pkcs12_valido && (
          <Alert
            severity="success"
            icon={<CheckCircleIcon />}
            sx={{ mt: 3, "& pre": { m: 0, fontFamily: "monospace", fontSize: 12 } }}
          >
            <Typography sx={{ fontWeight: 600, mb: 1 }}>
              Recebido e íntegro
            </Typography>
            <pre>{`arquivo  : ${resultado.arquivo}
tamanho  : ${resultado.bytes} bytes
sha256   : ${resultado.sha256}
titular  : ${resultado.titular || "-"}
validade : ${resultado.valido_ate || "-"}`}</pre>
          </Alert>
        )}

        {resultado && !resultado.pkcs12_valido && (
          <Alert
            severity="error"
            icon={<ErrorOutlineIcon />}
            sx={{ mt: 3, "& pre": { m: 0, fontFamily: "monospace", fontSize: 12 } }}
          >
            <Typography sx={{ fontWeight: 600, mb: 1 }}>
              {resultado.detail ? "Falha no envio" : "Salvo, mas NÃO abriu como PKCS#12"}
            </Typography>
            <pre>
              {resultado.detail ||
                `arquivo : ${resultado.arquivo}
bytes   : ${resultado.bytes}
sha256  : ${resultado.sha256}
NUL     : ${resultado.bytes_nulos}
erro    : ${resultado.erro || "-"}

${resultado.diagnostico || ""}`}
            </pre>
          </Alert>
        )}

        <Box sx={{ mt: 4, opacity: 0.55 }}>
          <Typography variant="caption">
            O arquivo fica em /opt/sendcert/recebidos na VPS, com permissão 600, junto
            com a versão base64 e o hash SHA-256.
          </Typography>
        </Box>
      </Container>
    </>
  );
}
