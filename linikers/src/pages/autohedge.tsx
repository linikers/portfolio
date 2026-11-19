import {
  Container,
  Typography,
  Box,
  Button,
  Grid2 as Grid,
  Card,
  List,
  ListItem,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SEO from "@/components/SEO";
import Head from "next/head";
import { WHATSAPP_NUMERO } from "@/lib/conversaoWhatsapp";
import { motion } from "framer-motion";

// h2 do tema herda 3.75rem, o que deixa o título de seção maior que o h1.
const H2 = {
  fontWeight: 700,
  color: "text.primary",
  fontSize: { xs: "1.35rem", md: "1.75rem" },
};

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  // once: sem isso a seção volta a opacity 0 ao sair da viewport, e quem rola
  // de volta para cima vê buraco (também quebra impressão e captura de tela).
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6 },
};

const CTA_MSG = encodeURIComponent(
  "Quero um diagnóstico do AutoHedge para a minha carteira"
);
const CTA = `https://wa.me/${WHATSAPP_NUMERO}?text=${CTA_MSG}`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AutoHedge: instalação de bot de cripto com trava de segurança",
  provider: {
    "@type": "Person",
    name: "LinikerS - Desenvolvedor Full Stack",
    url: "https://linikers.cloud",
  },
  areaServed: [{ "@type": "Country", name: "Brasil" }],
  description:
    "Instalação e acompanhamento de bot de trading de cripto com simulação obrigatória antes de cada ordem, conferência on-chain depois e limites por ordem. Sem promessa de retorno.",
  offers: { "@type": "Offer", price: "2400", priceCurrency: "BRL" },
};

const problemas = [
  {
    titulo: "Decide sem limite",
    texto:
      "Um sinal ruim vira ordem de qualquer tamanho. Sem teto por operação e sem perda máxima no dia.",
  },
  {
    titulo: "Sai sem conferência",
    texto:
      "A API responde sucesso e o dinheiro não volta. Ninguém compara o que saiu com o que entrou.",
  },
  {
    titulo: "Ninguém audita",
    texto:
      "Win rate que não fecha com o histórico, resultado que não bate com a carteira, print que não vira prova.",
  },
];

const travas = [
  {
    numero: "01",
    titulo: "Simula antes de assinar",
    texto:
      "Toda ordem passa por uma simulação na rede. Se a moeda de entrada sai e a de saída não entra, a ordem é bloqueada antes da assinatura. Sem simulação, não assina.",
  },
  {
    numero: "02",
    titulo: "Confere depois de executar",
    texto:
      "A transação confirmada é lida de novo. Se o saldo não fechar dentro do slippage combinado, vira erro e não entra no histórico como operação feita.",
  },
  {
    numero: "03",
    titulo: "Teto por ordem e limite diário",
    texto:
      "Valor máximo por operação, perda máxima no dia e desligamento automático. O limite é definido com você e não depende do humor do modelo.",
  },
];

const passos = [
  {
    titulo: "Conversa de 30 minutos",
    texto:
      "Capital disponível, exchange que você usa e quanto de perda você tolera. Se o número não fizer sentido, eu digo na hora.",
  },
  {
    titulo: "Instalação na sua conta",
    texto:
      "O bot roda na sua carteira ou numa subconta sua. A chave de API fica com você, com permissão apenas de negociação.",
  },
  {
    titulo: "Limites definidos juntos",
    texto:
      "Teto por ordem, perda máxima no dia e quais ativos entram. Fica escrito no painel, não na memória.",
  },
  {
    titulo: "Painel e relatório semanal",
    texto:
      "Você acompanha saldo, operações e bloqueios da trava. Um resumo por semana explica o que aconteceu e por quê.",
  },
];

const naoFaz = [
  "Não promete retorno. Nenhum bot garante lucro.",
  "Não pede permissão de saque. Só negociação.",
  "Não opera alavancado nem derivativo.",
  "Não esconde resultado ruim: o acerto aparece com o número real.",
];

const faq = [
  {
    q: "Preciso saber programar?",
    a: "Não. A instalação, os limites e o painel são feitos por mim. Você recebe o acesso e o relatório semanal.",
  },
  {
    q: "Minha chave fica com você?",
    a: "Não. A chave de API é criada por você, com permissão apenas de negociação e sem saque. Eu configuro o bot para usá-la, e você pode revogar quando quiser.",
  },
  {
    q: "Isso garante lucro?",
    a: "Não, e quem garante está vendendo outra coisa. O que a instalação garante é limite por ordem, simulação antes de assinar e conferência depois de executar.",
  },
  {
    q: "Funciona com a exchange que eu já uso?",
    a: "Sim, desde que a exchange tenha API de negociação. Binance, OKX e Bybit são as mais comuns. Se a sua não tiver, eu digo antes de você pagar.",
  },
  {
    q: "Quanto capital preciso ter?",
    a: "O suficiente para a taxa não comer a operação. Em ordem de 1 dólar a taxa consome 40 por cento do trade. Na conversa eu calculo o mínimo para o seu caso.",
  },
];

export default function AutoHedge() {
  return (
    <>
      <SEO
        title="AutoHedge: bot de cripto com trava de segurança antes da ordem"
        description="Instalação de bot de trading de cripto com simulação obrigatória antes de cada ordem, conferência on-chain e limite por operação. Acompanhamento mensal. Sem promessa de retorno."
        ogImage="/profileImg.jpg"
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <meta
          name="keywords"
          content="bot de cripto, trading automatizado, bot com limite de risco, instalação de bot, automação de cripto, conferência on-chain, segurança em bot de trading"
        />
        <meta name="geo.region" content="BR-PR" />
        <meta name="geo.placename" content="Maringá" />
      </Head>

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 }, minHeight: "80vh" }}>
        {/* Hero */}
        <motion.div {...fadeUp}>
          <Box sx={{ textAlign: "center", mb: 7 }}>
            <Typography
              variant="overline"
              sx={{
                color: "primary.main",
                letterSpacing: 3,
                border: "1px solid", borderColor: "primary.main",
                px: 2,
                py: 0.5,
                display: "inline-block",
                mb: 2,
                fontSize: "0.65rem",
              }}
            >
              AUTOHEDGE
            </Typography>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: "text.primary",
                fontSize: { xs: "1.7rem", md: "2.4rem" },
                maxWidth: 900,
                mx: "auto",
              }}
            >
              O bot só manda a ordem depois de{" "}
              <span style={{ color: "primary.main" }}>provar que o saldo fecha</span>
            </Typography>
            <Typography
              sx={{
                color: "primary.main",
                maxWidth: 720,
                mx: "auto",
                mb: 4,
                fontSize: "0.9rem",
                lineHeight: 1.7,
              }}
            >
              Instalação do AutoHedge na sua carteira, com simulação obrigatória
              antes de cada ordem, conferência on-chain depois e limite por
              operação. Sem promessa de retorno.
            </Typography>
            <Button
              variant="contained"
              href={CTA}
              target="_blank"
              rel="noopener"
              sx={{
                bgcolor: "primary.main",
                color: "primary.contrastText",
                fontFamily: "monospace",
                fontWeight: 600,
                px: 4,
                py: 1.5,
                "&:hover": { bgcolor: "primary.main" },
              }}
            >
              QUERO UM DIAGNÓSTICO
            </Button>
            <Typography sx={{ mt: 2, color: "text.secondary", fontSize: "0.72rem" }}>
              Resposta no mesmo dia. Diagnóstico sem custo.
            </Typography>
          </Box>
        </motion.div>

        {/* Problema */}
        <motion.div {...fadeUp}>
          <Typography variant="h2" sx={{ ...H2, textAlign: "center", mb: 1 }}>
            O que dá errado em bot de cripto
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              color: "text.secondary",
              mb: 4,
              fontSize: "0.85rem",
            }}
          >
            Três falhas que aparecem em quase todo bot vendido como renda
            automática.
          </Typography>
          <Grid container spacing={2} sx={{ mb: 5 }}>
            {problemas.map((p) => (
              <Grid size={{ xs: 12, md: 4 }} key={p.titulo}>
                <Card
                  sx={{
                    height: "100%",
                    bgcolor: "background.paper",
                    border: "1px solid", borderColor: "divider",
                    borderTop: "2px solid", borderTopColor: "error.main",
                    p: 3,
                  }}
                >
                  <Typography
                    sx={{ color: "text.primary", fontWeight: 700, mb: 1, fontSize: "0.95rem" }}
                  >
                    {p.titulo}
                  </Typography>
                  <Typography sx={{ color: "text.secondary", fontSize: "0.82rem", lineHeight: 1.6 }}>
                    {p.texto}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Número real */}
        <motion.div {...fadeUp}>
          <Box
            sx={{
              border: "1px solid", borderColor: "divider",
              bgcolor: "rgba(255,68,68,0.04)",
              p: { xs: 3, md: 4 },
              mb: 8,
            }}
          >
            <Typography
              variant="overline"
              sx={{ color: "error.main", letterSpacing: 2, fontSize: "0.65rem" }}
            >
              ACONTECEU COM O MEU PRÓPRIO BOT
            </Typography>
            <Typography
              sx={{ color: "text.primary", fontSize: { xs: "0.95rem", md: "1.05rem" }, mt: 1, lineHeight: 1.7 }}
            >
              Em 18 de agosto, uma transação sem swap levou{" "}
              <strong>10,37 USDC</strong> da carteira para um endereço sem
              histórico. A conta caiu de 12,40 para 0,21 dólar. Foi essa
              transação que virou a trava que hoje bloqueia a ordem antes da
              assinatura.
            </Typography>
          </Box>
        </motion.div>

        {/* As três travas */}
        <motion.div {...fadeUp}>
          <Typography variant="h2" sx={{ ...H2, textAlign: "center", mb: 1 }}>
            Três travas antes do dinheiro sair
          </Typography>
          <Typography
            sx={{ textAlign: "center", color: "text.secondary", mb: 4, fontSize: "0.85rem" }}
          >
            Ordem que não fecha o balanço não passa.
          </Typography>
          <Grid container spacing={2} sx={{ mb: 8 }}>
            {travas.map((t) => (
              <Grid size={{ xs: 12, md: 4 }} key={t.numero}>
                <Card
                  sx={{
                    height: "100%",
                    bgcolor: "background.paper",
                    border: "1px solid", borderColor: "divider",
                    p: 3,
                  }}
                >
                  <Typography
                    sx={{
                      color: "primary.main",
                      fontFamily: "monospace",
                      fontSize: "0.7rem",
                      letterSpacing: 2,
                      mb: 1,
                    }}
                  >
                    TRAVA {t.numero}
                  </Typography>
                  <Typography
                    sx={{ color: "text.primary", fontWeight: 700, mb: 1, fontSize: "0.95rem" }}
                  >
                    {t.titulo}
                  </Typography>
                  <Typography sx={{ color: "text.secondary", fontSize: "0.82rem", lineHeight: 1.6 }}>
                    {t.texto}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Como funciona */}
        <motion.div {...fadeUp}>
          <Typography variant="h2" sx={{ ...H2, textAlign: "center", mb: 4 }}>
            Como funciona a instalação
          </Typography>
          <Grid container spacing={2} sx={{ mb: 8 }}>
            {passos.map((p, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={p.titulo}>
                <Box
                  sx={{
                    border: "1px solid", borderColor: "divider",
                    p: 3,
                    height: "100%",
                  }}
                >
                  <Typography
                    sx={{
                      color: "primary.main",
                      fontFamily: "monospace",
                      fontSize: "1.4rem",
                      fontWeight: 700,
                      mb: 1,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </Typography>
                  <Typography
                    sx={{ color: "text.primary", fontWeight: 600, mb: 1, fontSize: "0.88rem" }}
                  >
                    {p.titulo}
                  </Typography>
                  <Typography sx={{ color: "text.secondary", fontSize: "0.8rem", lineHeight: 1.6 }}>
                    {p.texto}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* O que não faz */}
        <motion.div {...fadeUp}>
          <Box sx={{ display: { md: "flex" }, gap: 4, mb: 8 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h2" sx={{ ...H2, mb: 2 }}>
                O que o AutoHedge não faz
              </Typography>
              <List dense>
                {naoFaz.map((item) => (
                  <ListItem key={item} sx={{ borderBottom: "1px solid", borderColor: "divider", py: 1 }}>
                    <ListItemText
                      primary={item}
                      sx={{
                        "& .MuiListItemText-primary": {
                          fontSize: "0.84rem",
                          color: "text.secondary",
                        },
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
            <Box
              sx={{
                flex: 1,
                border: "1px solid", borderColor: "divider",
                bgcolor: "background.paper",
                p: 3,
                mt: { xs: 3, md: 0 },
              }}
            >
              <Typography
                variant="overline"
                sx={{ color: "primary.main", letterSpacing: 2, fontSize: "0.65rem" }}
              >
                O NÚMERO QUE EU PREFIRO MOSTRAR
              </Typography>
              <Typography sx={{ color: "text.secondary", fontSize: "0.84rem", mt: 1, lineHeight: 1.7 }}>
                Nas 624 análises do meu próprio bot, o acerto ficou em 46,6 por
                cento em 1 hora, 54,8 por cento em 4 horas e 53,4 por cento em 24
                horas. Sem vantagem estatística sobre o acaso.
              </Typography>
              <Typography sx={{ color: "text.primary", fontSize: "0.84rem", mt: 2, lineHeight: 1.7 }}>
                Prefiro abrir esse número do que prometer dez mil dólares em 23
                dias. É por isso que o que eu vendo é controle de risco, não
                previsão.
              </Typography>
            </Box>
          </Box>
        </motion.div>

        {/* Preço */}
        <motion.div {...fadeUp}>
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography variant="h2" sx={{ ...H2, mb: 3 }}>
              Preço
            </Typography>
            <Grid container spacing={2} sx={{ justifyContent: "center" }}>
              <Grid size={{ xs: 12, md: 5 }}>
                <Card
                  sx={{
                    bgcolor: "background.paper",
                    border: "1px solid", borderColor: "divider",
                    borderTop: "2px solid", borderTopColor: "primary.main",
                    p: 4,
                    height: "100%",
                  }}
                >
                  <Typography
                    variant="overline"
                    sx={{ color: "primary.main", letterSpacing: 3, fontSize: "0.7rem" }}
                  >
                    INSTALAÇÃO
                  </Typography>
                  <Typography variant="h3" sx={{ color: "text.primary", fontWeight: 700, my: 1 }}>
                    R$ 2.400{" "}
                    <Typography component="span" variant="body1" sx={{ color: "primary.main" }}>
                      /uma vez
                    </Typography>
                  </Typography>
                  <List dense>
                    {[
                      "Instalação na sua conta ou subconta",
                      "Chave de API com permissão só de negociação",
                      "Três travas configuradas e testadas",
                      "Limites definidos com você",
                      "Painel de acompanhamento",
                    ].map((item) => (
                      <ListItem key={item} sx={{ borderBottom: "1px solid", borderColor: "divider", py: 1 }}>
                        <ListItemText
                          primary={item}
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "0.8rem",
                              color: "text.secondary",
                            },
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Button
                    variant="contained"
                    fullWidth
                    href={CTA}
                    target="_blank"
                    rel="noopener"
                    sx={{
                      mt: 2,
                      minHeight: 46,
                      bgcolor: "primary.main",
                      color: "primary.contrastText",
                      fontFamily: "monospace",
                      fontWeight: 600,
                      "&:hover": { bgcolor: "primary.main" },
                    }}
                  >
                    QUERO A INSTALAÇÃO
                  </Button>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, md: 5 }}>
                <Card
                  sx={{
                    bgcolor: "background.paper",
                    border: "1px solid", borderColor: "divider",
                    p: 4,
                    height: "100%",
                  }}
                >
                  <Typography
                    variant="overline"
                    sx={{ color: "primary.main", letterSpacing: 3, fontSize: "0.7rem" }}
                  >
                    ACOMPANHAMENTO
                  </Typography>
                  <Typography variant="h3" sx={{ color: "text.primary", fontWeight: 700, my: 1 }}>
                    R$ 300{" "}
                    <Typography component="span" variant="body1" sx={{ color: "primary.main" }}>
                      /mês
                    </Typography>
                  </Typography>
                  <List dense>
                    {[
                      "Monitoramento das travas e do saldo",
                      "Ajuste de limite quando fizer sentido",
                      "Relatório semanal em texto claro",
                      "Suporte no WhatsApp em dia útil",
                      "Cancelamento quando quiser",
                    ].map((item) => (
                      <ListItem key={item} sx={{ borderBottom: "1px solid", borderColor: "divider", py: 1 }}>
                        <ListItemText
                          primary={item}
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "0.8rem",
                              color: "text.secondary",
                            },
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Button
                    variant="outlined"
                    fullWidth
                    href={CTA}
                    target="_blank"
                    rel="noopener"
                    sx={{
                      mt: 2,
                      minHeight: 46,
                      borderColor: "primary.main",
                      color: "primary.main",
                      fontFamily: "monospace",
                      fontWeight: 600,
                      "&:hover": { borderColor: "primary.main", opacity: 0.85 },
                    }}
                  >
                    FALAR SOBRE ACOMPANHAMENTO
                  </Button>
                </Card>
              </Grid>
            </Grid>
            <Typography sx={{ mt: 2, color: "text.secondary", fontSize: "0.72rem" }}>
              Sem fidelidade. O bot roda na sua conta, não na minha.
            </Typography>
          </Box>
        </motion.div>

        {/* FAQ */}
        <motion.div {...fadeUp}>
          <Typography variant="h2" sx={{ ...H2, textAlign: "center", mb: 4 }}>
            Perguntas que sempre aparecem
          </Typography>
          <Box sx={{ maxWidth: 820, mx: "auto", mb: 8 }}>
            {faq.map((item) => (
              <Accordion
                key={item.q}
                sx={{
                  bgcolor: "transparent",
                  border: "1px solid", borderColor: "divider",
                  mb: 1,
                  "&:before": { display: "none" },
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "primary.main" }} />}>
                  <Typography sx={{ color: "text.primary", fontSize: "0.86rem", fontWeight: 600 }}>
                    {item.q}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ color: "text.secondary", fontSize: "0.82rem", lineHeight: 1.7 }}>
                    {item.a}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </motion.div>

        {/* CTA final */}
        <motion.div {...fadeUp}>
          <Box sx={{ textAlign: "center", borderTop: "1px solid", borderColor: "divider", pt: 6 }}>
            <Typography
              variant="h2"
              sx={{ fontWeight: 700, color: "text.primary", mb: 2, fontSize: { xs: "1.3rem", md: "1.7rem" } }}
            >
              Se o bot não passa na simulação, ele não manda a ordem
            </Typography>
            <Typography sx={{ color: "primary.main", mb: 3, fontSize: "0.85rem" }}>
              Me conta qual exchange você usa e quanto pretende colocar. Eu digo
              se faz sentido.
            </Typography>
            <Button
              variant="contained"
              href={CTA}
              target="_blank"
              rel="noopener"
              sx={{
                bgcolor: "primary.main",
                color: "primary.contrastText",
                fontFamily: "monospace",
                fontWeight: 600,
                px: 4,
                py: 1.5,
                "&:hover": { bgcolor: "primary.main" },
              }}
            >
              FALAR NO WHATSAPP
            </Button>
          </Box>
        </motion.div>
      </Container>
    </>
  );
}
