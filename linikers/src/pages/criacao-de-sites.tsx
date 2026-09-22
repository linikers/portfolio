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
} from "@mui/material";
import SEO from "@/components/SEO";
import Head from "next/head";
import { motion } from "framer-motion";
import { WHATSAPP_NUMERO } from "@/lib/conversaoWhatsapp";

/**
 * Página de oferta do serviço que a campanha do Google anuncia.
 *
 * Por que existe: o anúncio promete "seu site ou sistema pronto para vender" e mandava
 * o clique para a home — que explica tudo e não fecha nada. Aqui a oferta, o preço e a
 * prova estão no mesmo lugar, com o CTA de WhatsApp (medido pelo listener global).
 *
 * Preços e fatos vieram das páginas que JÁ existem no site (landing a partir de R$ 499,
 * loja a partir de R$ 1.999, hospedagem R$ 20–40/mês, sem mensalidade) — nada inventado.
 */

const LINK_WHATSAPP = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(
  "Quero um orçamento para um site/sistema"
)}`;

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Criação de Sites, Landing Pages e Sistemas Sob Medida",
  provider: {
    "@type": "Person",
    name: "LinikerS - Desenvolvedor Full Stack",
    url: "https://linikers.cloud",
  },
  areaServed: [{ "@type": "Country", name: "Brasil" }],
  description:
    "Criação de sites, landing pages, lojas virtuais e sistemas web sob medida. Tecnologia Next.js, React, Node e integrações.",
  offers: { "@type": "Offer", price: "499", priceCurrency: "BRL" },
};

const ofertas = [
  {
    nome: "Landing page",
    preco: "a partir de R$ 499",
    prazo: "entrega em até 7 dias",
    itens: [
      "Página focada em converter visita em contato",
      "Botão de WhatsApp e formulário já integrados",
      "Rápida no celular (a maioria do tráfego vem de lá)",
    ],
  },
  {
    nome: "Site ou loja virtual",
    preco: "a partir de R$ 1.999",
    prazo: "projeto de 2 a 4 semanas",
    itens: [
      "Catálogo, carrinho e checkout",
      "Integração com Mercado Livre / meios de pagamento",
      "Painel para você mesmo cadastrar produtos",
    ],
  },
  {
    nome: "Sistema sob medida",
    preco: "orçamento em 24h",
    prazo: "escopo definido junto",
    itens: [
      "Automação de processo que hoje é manual",
      "Integrações com sistemas que você já usa",
      "Painel de gestão com os números do negócio",
    ],
  },
];

const provas = [
  "CarCrew Commerce — loja com catálogo e pedidos",
  "polyLink — dashboard de dados de mercado",
  "ERC20 Token Lab — produto Web3 que vende curso",
  "Taiff Connect — app + backend em nuvem",
];

const faq = [
  {
    q: "Preciso ter CNPJ?",
    a: "Não obrigatoriamente — dá pra começar como MEI e emitir nota fiscal. Se for vender como PJ, melhor.",
  },
  {
    q: "Tem mensalidade?",
    a: "Não. Você paga uma vez e o sistema é seu. A única recorrência é a hospedagem, entre R$ 20 e R$ 40 por mês.",
  },
  {
    q: "Quanto tempo leva?",
    a: "Landing page em até 7 dias. Site ou loja entre 2 e 4 semanas, dependendo do escopo.",
  },
  {
    q: "Você atende fora de Maringá?",
    a: "Sim — trabalho remoto com clientes de todo o Brasil. Reunião por chamada de vídeo e entrega online.",
  },
];

export default function CriacaoDeSites() {
  return (
    <>
      <SEO
        title="Criação de Sites e Sistemas Sob Medida | Orçamento em 24h"
        description="Seu site ou sistema pronto para vender: landing pages a partir de R$ 499 e lojas virtuais a partir de R$ 1.999. Next.js, React e Node. Orçamento em 24h no WhatsApp."
        ogImage="/ecommerce-hero.png"
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <meta
          name="keywords"
          content="criação de sites, landing page, loja virtual, e-commerce, sistema sob medida, automação, desenvolvedor full stack, Next.js, React, Node, Maringá, Brasil"
        />
      </Head>
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 }, minHeight: "80vh" }}>
        {/* Hero */}
        <motion.div {...fadeUp}>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="overline"
              sx={{
                color: "#00ff41",
                letterSpacing: 3,
                border: "1px solid #00ff41",
                px: 2,
                py: 0.5,
                display: "inline-block",
                mb: 2,
                fontSize: "0.65rem",
              }}
            >
              ✦ DESENVOLVIMENTO SOB MEDIDA
            </Typography>
            <Typography
              variant="h1"
              sx={{ fontWeight: 700, mb: 2, color: "#fff", fontSize: { xs: "1.8rem", md: "2.5rem" } }}
            >
              Seu site ou sistema <span style={{ color: "#00ff41" }}>pronto para vender</span>
            </Typography>
            <Typography sx={{ color: "#00cc33", maxWidth: 750, mx: "auto", mb: 4, fontSize: "0.9rem" }}>
              Landing pages, lojas virtuais e automações sob medida. Você paga uma vez, o
              sistema é seu — sem mensalidade, só a hospedagem. Orçamento em 24h.
            </Typography>
            <Button
              variant="contained"
              href={LINK_WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                bgcolor: "#00ff41",
                color: "#000",
                fontFamily: "monospace",
                fontWeight: 600,
                px: 4,
                py: 1.5,
                "&:hover": { bgcolor: "#00cc33" },
              }}
            >
              PEDIR ORÇAMENTO NO WHATSAPP
            </Button>
          </Box>
        </motion.div>

        {/* Ofertas e preços */}
        <motion.div {...fadeUp}>
          <Grid container spacing={3} sx={{ mb: 8 }}>
            {ofertas.map((o) => (
              <Grid key={o.nome} size={{ xs: 12, md: 4 }}>
                <Card
                  sx={{
                    height: "100%",
                    bgcolor: "rgba(255,255,255,0.01)",
                    border: "1px solid #1e293b",
                    p: 4,
                  }}
                >
                  <Typography variant="h6" sx={{ color: "#fff", fontFamily: "monospace", mb: 0.5 }}>
                    {o.nome}
                  </Typography>
                  <Typography sx={{ color: "#00ff41", fontFamily: "monospace", fontWeight: 700, mb: 0.5 }}>
                    {o.preco}
                  </Typography>
                  <Typography sx={{ color: "#00cc33", fontSize: "0.75rem", mb: 2 }}>{o.prazo}</Typography>
                  <List dense>
                    {o.itens.map((i) => (
                      <ListItem key={i} sx={{ px: 0 }}>
                        <ListItemText
                          primary={`▸ ${i}`}
                          primaryTypographyProps={{ sx: { color: "#cbd5e1", fontSize: "0.82rem" } }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Card>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Prova */}
        <motion.div {...fadeUp}>
          <Box sx={{ mb: 8, textAlign: "center" }}>
            <Typography
              variant="h6"
              sx={{ fontFamily: "monospace", color: "#fff", mb: 3, letterSpacing: 1 }}
            >
              ▸ JÁ ENTREGUE
            </Typography>
            <Grid container spacing={2}>
              {provas.map((p) => (
                <Grid key={p} size={{ xs: 12, sm: 6 }}>
                  <Typography sx={{ color: "#94a3b8", fontFamily: "monospace", fontSize: "0.82rem" }}>
                    {`✓ ${p}`}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Box>
        </motion.div>

        {/* FAQ */}
        <motion.div {...fadeUp}>
          <Box sx={{ mb: 8, maxWidth: 800, mx: "auto" }}>
            <Typography variant="h6" sx={{ fontFamily: "monospace", color: "#fff", mb: 3, textAlign: "center" }}>
              ▸ DÚVIDAS QUE SEMPRE CHEGAM
            </Typography>
            {faq.map((f) => (
              <Box key={f.q} sx={{ mb: 3 }}>
                <Typography sx={{ color: "#00ff41", fontFamily: "monospace", fontSize: "0.85rem", mb: 0.5 }}>
                  {f.q}
                </Typography>
                <Typography sx={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.7 }}>{f.a}</Typography>
              </Box>
            ))}
          </Box>
        </motion.div>

        {/* CTA final */}
        <motion.div {...fadeUp}>
          <Box sx={{ textAlign: "center" }}>
            <Typography sx={{ color: "#00cc33", mb: 3, fontSize: "0.85rem" }}>
              Me conta o que você precisa e eu te respondo em até 24h.
            </Typography>
            <Button
              variant="contained"
              href={LINK_WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                bgcolor: "#00ff41",
                color: "#000",
                fontFamily: "monospace",
                fontWeight: 600,
                px: 4,
                py: 1.5,
                "&:hover": { bgcolor: "#00cc33" },
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
