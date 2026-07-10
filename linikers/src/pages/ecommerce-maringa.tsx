import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Grid2,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
} from "@mui/material";
import {
  ExpandMore,
  CheckCircle,
  Speed,
  Code,
  ShoppingCart,
  Payment,
  TrendingUp,
  WhatsApp,
  Storefront,
  LocationOn,
  Star,
  People,
  Timeline,
} from "@mui/icons-material";
import SEO from "@/components/SEO";

// ─── Packages ───────────────────────────────
const packages = [
  {
    name: "Essential",
    price: "R$ 499",
    desc: "Landing page profissional pra começar a vender",
    items: [
      "Site 1 página (landing page)",
      "Design responsivo",
      "Formulário de contato/WhatsApp",
      "SEO básico (meta tags, OG)",
      "Domínio + hospedagem 1 ano grátis",
      "Entrega em 3 dias",
    ],
    cta: "Quero esse",
    highlight: false,
  },
  {
    name: "E-commerce",
    price: "R$ 1.999",
    desc: "Loja virtual completa pra bombar nas vendas",
    items: [
      "Loja com até 50 produtos",
      "Carrinho de compras + checkout",
      "PIX, cartão e boleto",
      "Painel admin pra gerenciar pedidos",
      "SEO completo + Google Analytics",
      "WhatsApp integrado",
      "Catálogo com fotos e categorias",
      "Entrega em 7 dias",
    ],
    cta: "Quero esse",
    highlight: true,
  },
  {
    name: "E-commerce Pro",
    price: "R$ 2.999",
    desc: "Tudo do E-commerce + automações e performance",
    items: [
      "Loja com produtos ilimitados",
      "Integração com transportadora (frete real)",
      "Nota fiscal automática",
      "Dashboard de vendas + relatórios",
      "Integração com ERP/estoque",
      "Automação de marketing (e-mail)",
      "Painel admin completo + múltiplos vendedores",
      "Performance otimizada (CDN AWS)",
      "Suporte prioritário 30 dias",
    ],
    cta: "Quero esse",
    highlight: false,
  },
];

// ─── FAQ ─────────────────────────────────────
const faq = [
  { q: "Preciso ter CNPJ?", a: "Não obrigatoriamente. Dá pra começar como MEI (R$ 70/mês) e emitir nota fiscal. Se for vender como PJ, melhor. Posso te ajudar com isso também." },
  { q: "Quanto tempo demora pra ficar pronto?", a: "Landing page em 3 dias, e-commerce completo em 5 a 7 dias úteis. O que segura é seu conteúdo (fotos, descrições dos produtos)." },
  { q: "Preciso saber programação?", a: "Não. Você só manda as fotos e descrições. Eu cuido de tudo: programação, design, domínio, hospedagem e SEO." },
  { q: "O site aparece no Google?", a: "Sim. Todos os meus projetos têm SEO completo: meta tags, Open Graph, sitemap.xml, robots.txt e Google Analytics. Já tem cliente meu nas primeiras páginas." },
  { q: "E se eu quiser mudar algo depois?", a: "Você tem um painel simples pra alterar textos e fotos. Se precisar de mudanças maiores, é só chamar. Faço ajustes rápidos." },
  { q: "Aceita pagamento parcelado?", a: "Sim. Pode ser no PIX (à vista com 10% off) ou parcelado em até 6x no cartão." },
];

export default function EcommerceMaringa() {
  return (
    <>
      <SEO
        title="Criação de Lojas Virtuais em Maringá"
        description="Criação de lojas virtuais e landing pages em Maringá. Site profissional em 7 dias com SEO incluso e suporte direto no WhatsApp."
        canonical="https://linikers.cloud/ecommerce-maringa"
      />

      {/* ─── HERO ────────────────────────────── */}
      <Box
        sx={{
          minHeight: "85vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(180deg, rgba(99,102,241,0.04) 0%, transparent 60%)",
        }}
      >
        <Container maxWidth="lg">
          <Grid2 container spacing={6} alignItems="center">
            <Grid2 size={{ xs: 12, md: 7 }}>
              <Chip
                icon={<LocationOn />}
                label="Maringá / Paraná"
                variant="outlined"
                sx={{
                  color: "#6366f1",
                  borderColor: "#6366f1",
                  fontWeight: 500,
                  mb: 3,
                  borderRadius: 2,
                }}
              />

              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "1.8rem", md: "3.2rem" },
                  lineHeight: 1.2,
                  mb: 2,
                }}
              >
                Sua loja virtual em{" "}
                <Box component="span" sx={{ color: "#6366f1" }}>
                  7 dias
                </Box>
                , pronta pra vender
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: "text.secondary",
                  fontWeight: 400,
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  lineHeight: 1.7,
                  mb: 5,
                  maxWidth: 560,
                }}
              >
                Landing pages a partir de R$ 499 e lojas completas a partir de R$ 1.999.
                SEO incluso, suporte direto no WhatsApp e sem mensalidade.
                Atendo toda a região de Maringá.
              </Typography>

              <Stack direction={{ xs: "column", sm: "row" }} gap={2}>
                <Button
                  href="https://wa.me/5544984198075?text=Quero%20um%20e-commerce%20em%20Maring%C3%A1"
                  target="_blank"
                  variant="contained"
                  size="large"
                  startIcon={<WhatsApp />}
                  sx={{
                    background: "#6366f1",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: "1rem",
                    px: 4,
                    py: 1.8,
                    textTransform: "none",
                    borderRadius: 2,
                    boxShadow: "0 4px 14px rgba(99,102,241,0.3)",
                    "&:hover": {
                      background: "#4f46e5",
                      boxShadow: "0 6px 20px rgba(99,102,241,0.4)",
                    },
                  }}
                >
                  Solicitar orçamento
                </Button>
                <Button
                  href="#pacotes"
                  variant="outlined"
                  size="large"
                  sx={{
                    color: "text.primary",
                    borderColor: "divider",
                    fontSize: "1rem",
                    textTransform: "none",
                    px: 4,
                    borderRadius: 2,
                    "&:hover": { borderColor: "#6366f1", color: "#6366f1" },
                  }}
                >
                  Ver pacotes
                </Button>
              </Stack>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 5 }}>
              <Box
                component="img"
                src="/ecommerce-hero.png"
                alt="Loja virtual profissional — layout responsivo para desktop e celular"
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "divider",
                  display: "block",
                }}
              />
            </Grid2>
          </Grid2>
        </Container>
      </Box>

      {/* ─── STATS ───────────────────────────── */}
      <Box sx={{ borderTop: "1px solid", borderColor: "divider", py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h6"
            sx={{ color: "#6366f1", fontWeight: 700, mb: 1, fontSize: "0.9rem" }}
          >
            E-commerce em Maringá
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 4, fontSize: "0.9rem" }}>
            O mercado digital na região está crescendo rápido
          </Typography>
          <Grid2 container spacing={3}>
            <Grid2 size={{ xs: 12, md: 4 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  textAlign: "center",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 3,
                  bgcolor: "rgba(99,102,241,0.03)",
                }}
              >
                <Typography variant="h3" sx={{ fontWeight: 800, color: "#6366f1", fontSize: "2.5rem", mb: 1 }}>
                  65%
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.9rem", lineHeight: 1.5 }}>
                  das pequenas empresas já vendem online em Maringá
                </Typography>
              </Paper>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 4 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  textAlign: "center",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 3,
                  bgcolor: "rgba(99,102,241,0.03)",
                }}
              >
                <Typography variant="h3" sx={{ fontWeight: 800, color: "#6366f1", fontSize: "2.5rem", mb: 1 }}>
                  R$ 2,5 bi
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.9rem", lineHeight: 1.5 }}>
                  faturamento do e-commerce regional em 2025
                </Typography>
              </Paper>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 4 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  textAlign: "center",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 3,
                  bgcolor: "rgba(99,102,241,0.03)",
                }}
              >
                <Typography variant="h3" sx={{ fontWeight: 800, color: "#6366f1", fontSize: "2.5rem", mb: 1 }}>
                  +40%
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.9rem", lineHeight: 1.5 }}>
                  crescimento de lojas virtuais na região desde 2023
                </Typography>
              </Paper>
            </Grid2>
          </Grid2>
        </Container>
      </Box>

      {/* ─── BENEFITS ────────────────────────── */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h3"
              sx={{ fontWeight: 800, fontSize: { xs: "1.5rem", md: "2rem" }, mb: 1 }}
            >
              Por que vender online?
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", fontSize: "0.95rem", maxWidth: 500, mx: "auto" }}>
              Seu concorrente já está na internet. Não fique pra trás.
            </Typography>
          </Box>

          <Grid2 container spacing={3}>
            {[
              { icon: <Storefront sx={{ fontSize: 32 }} />, title: "Loja aberta 24h", desc: "Enquanto você dorme, sua loja trabalha. Cliente compra de qualquer lugar, a qualquer hora." },
              { icon: <LocationOn sx={{ fontSize: 32 }} />, title: "Alcance regional", desc: "Comece em Maringá e atenda toda a região metropolitana. Sem limitação geográfica." },
              { icon: <TrendingUp sx={{ fontSize: 32 }} />, title: "Mercado em alta", desc: "O e-commerce regional cresceu 40% em dois anos. É agora ou nunca." },
              { icon: <Payment sx={{ fontSize: 32 }} />, title: "Receba mais", desc: "Aceite PIX, cartão de crédito e boleto. Parcelamento sem juros. Mais formas de pagamento, mais vendas." },
              { icon: <Speed sx={{ fontSize: 32 }} />, title: "Rápido pra criar", desc: "Landing page em 3 dias, loja completa em 7. Sem burocracia, sem enrolação." },
              { icon: <Code sx={{ fontSize: 32 }} />, title: "Sem mensalidade", desc: "Você paga uma vez e o sistema é seu. Só a hospedagem (R$ 20-40/mês) é recorrente." },
            ].map((item) => (
              <Grid2 key={item.title} size={{ xs: 12, sm: 6, md: 4 }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    height: "100%",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 3,
                    transition: "all 0.25s",
                    "&:hover": { borderColor: "#6366f1" },
                  }}
                >
                  <Box sx={{ color: "#6366f1", mb: 1.5 }}>{item.icon}</Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5, fontSize: "1rem" }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.9rem", lineHeight: 1.6 }}>
                    {item.desc}
                  </Typography>
                </Paper>
              </Grid2>
            ))}
          </Grid2>
        </Container>
      </Box>

      {/* ─── PACKAGES ────────────────────────── */}
      <Box id="pacotes" sx={{ py: 8, my: 2 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h3"
              sx={{ fontWeight: 800, fontSize: { xs: "1.5rem", md: "2rem" }, mb: 1 }}
            >
              Pacotes
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", fontSize: "0.95rem" }}>
              Escolha o plano ideal pro seu negócio
            </Typography>
          </Box>

          <Grid2 container spacing={4} justifyContent="center">
            {packages.map((pkg) => (
              <Grid2 key={pkg.name} size={{ xs: 12, sm: 6, md: 4 }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    background: pkg.highlight
                      ? "linear-gradient(180deg, rgba(99,102,241,0.08) 0%, transparent 100%)"
                      : "rgba(255,255,255,0.02)",
                    border: pkg.highlight ? "2px solid #6366f1" : "1px solid",
                    borderColor: pkg.highlight ? "#6366f1" : "divider",
                    borderRadius: 3,
                    position: "relative",
                    transition: "all 0.3s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: pkg.highlight ? "0 8px 30px rgba(99,102,241,0.15)" : "0 4px 20px rgba(0,0,0,0.2)",
                    },
                  }}
                >
                  {pkg.highlight && (
                    <Chip
                      label="MAIS VENDIDO"
                      size="small"
                      sx={{
                        position: "absolute",
                        top: -12,
                        right: 24,
                        background: "#6366f1",
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: "0.65rem",
                        borderRadius: 1.5,
                      }}
                    />
                  )}

                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>
                    {pkg.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.85rem", mb: 2, minHeight: 40 }}>
                    {pkg.desc}
                  </Typography>

                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant="h3"
                      component="span"
                      sx={{ fontWeight: 800, fontSize: "2.5rem" }}
                    >
                      {pkg.price}
                    </Typography>
                    <Typography variant="body2" component="span" sx={{ color: "text.secondary", fontSize: "0.8rem", ml: 0.5 }}>
                      à vista
                    </Typography>
                  </Box>

                  <Box sx={{ flex: 1, mb: 3 }}>
                    {pkg.items.map((item) => (
                      <Box key={item} sx={{ display: "flex", gap: 1, mb: 1.2 }}>
                        <CheckCircle sx={{ fontSize: 18, color: "#6366f1", mt: 0.3, flexShrink: 0 }} />
                        <Typography variant="body2" sx={{ fontSize: "0.88rem", lineHeight: 1.5 }}>
                          {item}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  <Button
                    href={`https://wa.me/5544984198075?text=Quero%20o%20pacote%20${pkg.name}%20-%20E-commerce%20Maring%C3%A1`}
                    target="_blank"
                    variant={pkg.highlight ? "contained" : "outlined"}
                    fullWidth
                    startIcon={<WhatsApp />}
                    sx={{
                      fontWeight: 600,
                      textTransform: "none",
                      py: 1.5,
                      borderRadius: 2,
                      ...(pkg.highlight
                        ? {
                            background: "#6366f1",
                            "&:hover": { background: "#4f46e5" },
                          }
                        : {
                            color: "text.primary",
                            borderColor: "divider",
                            "&:hover": { borderColor: "#6366f1", color: "#6366f1" },
                          }),
                    }}
                  >
                    {pkg.cta}
                  </Button>
                </Paper>
              </Grid2>
            ))}
          </Grid2>
        </Container>
      </Box>

      {/* ─── CASE ────────────────────────────── */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="md">
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 5 },
              textAlign: "center",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 4,
              bgcolor: "rgba(99,102,241,0.02)",
            }}
          >
            <Chip
              label="CASO REAL"
              size="small"
              sx={{ background: "rgba(99,102,241,0.1)", color: "#6366f1", fontWeight: 600, fontSize: "0.7rem", mb: 2, borderRadius: 1.5 }}
            />
            <Typography
              variant="h4"
              sx={{ fontWeight: 800, mb: 2, fontSize: { xs: "1.3rem", md: "1.8rem" } }}
            >
              CarCrew Commerce
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 500, mx: "auto", mb: 3, fontSize: "0.95rem", lineHeight: 1.7 }}>
              E-commerce de suspensão automotiva em Maringá. Loja completa com catálogo, carrinho, admin, SEO e integração com PIX.
              Cliente aparecendo nas primeiras posições do Google.
            </Typography>
            <Stack direction="row" spacing={4} justifyContent="center" sx={{ mb: 3 }} flexWrap="wrap">
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 800, color: "#6366f1" }}>121</Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>avaliações 5★</Typography>
              </Box>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 800, color: "#6366f1" }}>3</Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>páginas no Google</Typography>
              </Box>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 800, color: "#6366f1" }}>7</Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>dias pra ficar pronto</Typography>
              </Box>
            </Stack>
            <Button
              href="https://carcrew.com.br"
              target="_blank"
              variant="outlined"
              startIcon={<ShoppingCart />}
              sx={{ color: "text.primary", borderColor: "divider", textTransform: "none", "&:hover": { borderColor: "#6366f1", color: "#6366f1" } }}
            >
              Ver loja funcionando
            </Button>
          </Paper>
        </Container>
      </Box>

      {/* ─── FAQ ──────────────────────────────── */}
      <Box sx={{ py: 8, my: 4 }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Typography
              variant="h3"
              sx={{ fontWeight: 800, fontSize: { xs: "1.5rem", md: "2rem" }, mb: 1 }}
            >
              Dúvidas frequentes
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", fontSize: "0.95rem" }}>
              Tudo que você precisa saber antes de começar
            </Typography>
          </Box>

          {faq.map((item) => (
            <Accordion
              key={item.q}
              elevation={0}
              sx={{
                bgcolor: "transparent",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: "12px !important",
                mb: 1.5,
                "&::before": { display: "none" },
                "&.Mui-expanded": { borderColor: "#6366f1" },
              }}
            >
              <AccordionSummary expandIcon={<ExpandMore sx={{ color: "#6366f1" }} />}>
                <Typography sx={{ fontWeight: 600, fontSize: "0.95rem" }}>
                  {item.q}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={{ color: "text.secondary", fontSize: "0.9rem", lineHeight: 1.7 }}>
                  {item.a}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </Box>

      {/* ─── FINAL CTA ───────────────────────── */}
      <Box
        sx={{
          py: 8,
          textAlign: "center",
          borderTop: "1px solid",
          borderColor: "divider",
          mt: 4,
          background: "linear-gradient(180deg, rgba(99,102,241,0.03) 0%, transparent 100%)",
        }}
      >
        <Container maxWidth="sm">
          <Typography
            variant="h3"
            sx={{ fontWeight: 800, fontSize: { xs: "1.5rem", md: "2rem" }, mb: 2 }}
          >
            Vamos criar sua loja?
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", mb: 4, fontSize: "0.95rem", lineHeight: 1.7 }}>
            Sem enrolação, sem mensalidade, sem mistério. Me chama no WhatsApp e a gente conversa.
          </Typography>
          <Button
            href="https://wa.me/5544984198075?text=Oi!%20Vim%20pela%20p%C3%A1gina%20de%20e-commerce%20de%20Maring%C3%A1%20e%20quero%20saber%20mais"
            target="_blank"
            variant="contained"
            size="large"
            startIcon={<WhatsApp />}
            sx={{
              background: "#6366f1",
              color: "#fff",
              fontWeight: 600,
              fontSize: "1.1rem",
              px: 6,
              py: 2,
              textTransform: "none",
              borderRadius: 2.5,
              boxShadow: "0 4px 14px rgba(99,102,241,0.3)",
              "&:hover": {
                background: "#4f46e5",
                boxShadow: "0 6px 20px rgba(99,102,241,0.4)",
              },
            }}
          >
            Fale no WhatsApp
          </Button>
          <Typography variant="caption" sx={{ display: "block", mt: 2, color: "text.secondary", opacity: 0.6 }}>
            Resposta em até 30 min em horário comercial
          </Typography>
        </Container>
      </Box>
    </>
  );
}
