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
  Store,
  LocationOn,
} from "@mui/icons-material";
import SEO from "@/components/SEO";
import Link from "next/link";

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
      "Performance otimizada (Vercel Edge)",
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
  { q: "Preciso saber programação?", a: "Não. Você só manda as fotos e descrições. Eu cuido de tudo — programação, design, domínio, hospedagem e SEO." },
  { q: "O site aparece no Google?", a: "Sim. Todos os meus projetos têm SEO completo: meta tags, Open Graph, sitemap.xml, robots.txt e Google Analytics. Já tem cliente meu nas primeiras páginas." },
  { q: "E se eu quiser mudar algo depois?", a: "Você tem um painel simples pra alterar textos e fotos. Se precisar de mudanças maiores, é só chamar — faço ajustes rápidos." },
  { q: "Aceita pagamento parcelado?", a: "Sim. Pode ser no PIX (à vista com 10% off) ou parcelado em até 6x no cartão." },
];

// ─── Stats ───────────────────────────────────
const stats = [
  { value: "65%", label: "das pequenas empresas já vendem online em Maringá" },
  { value: "R$ 2,5 bi", label: "faturamento do e-commerce regional em 2025" },
  { value: "+40%", label: "crescimento de lojas virtuais na região desde 2023" },
];

export default function EcommerceMaringa() {
  return (
    <>
      <SEO
        title="E-commerce em Maringá"
        description="Criação de lojas virtuais e landing pages em Maringá. Site profissional em 7 dias, SEO incluso, sem mensalidade. Atendo toda a região de Maringá."
        canonical="https://linikers.cloud/ecommerce-maringa"
      />

      {/* ─── HERO ────────────────────────────── */}
      <Box
        sx={{
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 600px 400px at 70% 50%, rgba(34,211,238,0.06), transparent), radial-gradient(ellipse 500px 500px at 30% 80%, rgba(168,85,247,0.04), transparent)",
            pointerEvents: "none",
          },
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
                  fontFamily: "monospace",
                  fontSize: "0.7rem",
                  color: "primary.main",
                  borderColor: "primary.main",
                  mb: 3,
                  borderRadius: 1,
                }}
              />

              <Typography
                variant="h2"
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: "2rem", md: "3.5rem" },
                  lineHeight: 1.15,
                  mb: 2,
                }}
              >
                Sua loja virtual em{" "}
                <Box component="span" sx={{ color: "primary.main" }}>
                  7 dias
                </Box>
                , feita por um dev de Maringá
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: "text.secondary",
                  fontWeight: 400,
                  fontSize: { xs: "1rem", md: "1.15rem" },
                  lineHeight: 1.7,
                  mb: 5,
                  maxWidth: 550,
                  opacity: 0.85,
                }}
              >
                Landing pages a partir de R$ 499 e lojas completas a partir de R$ 1.999.
                SEO incluso, sem mensalidade escondida, suporte direto no WhatsApp.
              </Typography>

              <Stack direction={{ xs: "column", sm: "row" }} gap={2}>
                <Button
                  href="https://wa.me/5544984198075?text=Quero%20um%20e-commerce%20em%20Maring%C3%A1"
                  target="_blank"
                  variant="contained"
                  size="large"
                  startIcon={<WhatsApp />}
                  sx={{
                    background: "linear-gradient(135deg, #22d3ee, #a78bfa)",
                    color: "#000",
                    fontWeight: 700,
                    fontFamily: "monospace",
                    fontSize: "1rem",
                    px: 4,
                    py: 1.8,
                    textTransform: "none",
                    borderRadius: 2,
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 30px rgba(34,211,238,0.3)",
                    },
                  }}
                >
                  $ iniciar orçamento
                </Button>
                <Button
                  href="#pacotes"
                  variant="outlined"
                  size="large"
                  sx={{
                    fontFamily: "monospace",
                    fontSize: "1rem",
                    textTransform: "none",
                    px: 4,
                    borderRadius: 2,
                  }}
                >
                  Ver pacotes ↓
                </Button>
              </Stack>
            </Grid2>

            <Grid2 size={{ xs: 12, md: 5 }}>
              <Box
                sx={{
                  p: 4,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 3,
                  background: "rgba(255,255,255,0.02)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <Typography variant="overline" sx={{ fontFamily: "monospace", color: "primary.main", fontSize: "0.65rem" }}>
                  ÚLTIMO PROJETO
                </Typography>
                <Box
                  component="img"
                  src="/carcrew-thumb.png"
                  alt="CarCrew Commerce"
                  sx={{
                    width: "100%",
                    height: 180,
                    objectFit: "cover",
                    borderRadius: 2,
                    my: 2,
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                />
                <Typography variant="subtitle1" sx={{ fontWeight: 700, fontFamily: "monospace" }}>
                  CarCrew Commerce
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", fontFamily: "monospace", fontSize: "0.75rem", mb: 1 }}>
                  E-commerce automotivo • Maringá
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.8rem", lineHeight: 1.6 }}>
                  "Loja completa com catálogo, carrinho, admin, SEO no topo do Google e integração com PIX. Tudo rodando na Vercel."
                </Typography>
                <Box sx={{ mt: 2, display: "flex", gap: 0.5 }}>
                  {["Next.js", "MUI", "Cloudinary", "SEO", "PIX"].map((t) => (
                    <Chip
                      key={t}
                      label={t}
                      size="small"
                      variant="outlined"
                      sx={{ fontFamily: "monospace", fontSize: "0.6rem", borderColor: "divider", color: "text.secondary" }}
                    />
                  ))}
                </Box>
              </Box>
            </Grid2>
          </Grid2>
        </Container>
      </Box>

      {/* ─── STATS ───────────────────────────── */}
      <Box sx={{ borderTop: "1px solid", borderBottom: "1px solid", borderColor: "divider", py: 6, my: 4 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h6"
            sx={{ fontFamily: "monospace", fontWeight: 700, color: "primary.main", mb: 4, fontSize: "0.85rem" }}
          >
            // e-commerce em Maringá
          </Typography>
          <Grid2 container spacing={4}>
            {stats.map((s) => (
              <Grid2 key={s.label} size={{ xs: 12, md: 4 }}>
                <Paper
                  sx={{
                    p: 3,
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 3,
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{ fontWeight: 900, color: "primary.main", fontSize: { xs: "2rem", md: "2.5rem" }, fontFamily: "monospace" }}
                  >
                    {s.value}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary", mt: 1, fontSize: "0.85rem", lineHeight: 1.5 }}>
                    {s.label}
                  </Typography>
                </Paper>
              </Grid2>
            ))}
          </Grid2>
        </Container>
      </Box>

      {/* ─── WHY E-COMMERCE ──────────────────── */}
      <Box sx={{ py: 6, my: 2 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h6"
            sx={{ fontFamily: "monospace", fontWeight: 700, color: "primary.main", mb: 3, fontSize: "0.85rem" }}
          >
            // por que vender online?
          </Typography>
          <Grid2 container spacing={3}>
            {[
              { icon: <Store />, title: "Loja 24h", desc: "Enquanto você dorme, sua loja trabalha. Cliente compra de qualquer lugar a qualquer hora." },
              { icon: <LocationOn />, title: "Alcance regional", desc: "Começa em Maringá, mas vende pra cidade toda e região metropolitana. Sem fronteiras." },
              { icon: <TrendingUp />, title: "Crescimento real", desc: "E-commerce na região cresceu 40% em 2 anos. Seu concorrente já está online." },
              { icon: <Payment />, title: "Receba mais", desc: "PIX, cartão, boleto. Aceita tudo. Parcela sem juros. Cliente compra mais." },
              { icon: <Speed />, title: "Rápido de criar", desc: "Landing page em 3 dias, loja completa em 7. Não é obra de meses." },
              { icon: <Code />, title: "Sem mensalidade", desc: "Você paga uma vez e o site é seu. Só a hospedagem (R$ 20-40/mês) que é recorrente." },
            ].map((item) => (
              <Grid2 key={item.title} size={{ xs: 12, sm: 6, md: 4 }}>
                <Paper
                  sx={{
                    p: 3,
                    height: "100%",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 3,
                    transition: "all 0.25s",
                    "&:hover": { borderColor: "primary.main", transform: "translateY(-2px)" },
                  }}
                >
                  <Box sx={{ color: "primary.main", mb: 1.5 }}>{item.icon}</Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, fontFamily: "monospace", mb: 0.5 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.85rem", lineHeight: 1.6 }}>
                    {item.desc}
                  </Typography>
                </Paper>
              </Grid2>
            ))}
          </Grid2>
        </Container>
      </Box>

      {/* ─── PACKAGES ────────────────────────── */}
      <Box id="pacotes" sx={{ py: 6, my: 4 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            sx={{ fontWeight: 900, fontSize: { xs: "1.6rem", md: "2.2rem" }, textAlign: "center", mb: 1 }}
          >
            Pacotes
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "text.secondary", textAlign: "center", mb: 6, fontFamily: "monospace", fontSize: "0.85rem" }}
          >
            $ escolha o plano ideal pro seu negócio
          </Typography>

          <Grid2 container spacing={4} justifyContent="center">
            {packages.map((pkg) => (
              <Grid2 key={pkg.name} size={{ xs: 12, sm: 6, md: 4 }}>
                <Paper
                  sx={{
                    p: 4,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    background: pkg.highlight
                      ? "linear-gradient(180deg, rgba(34,211,238,0.08) 0%, rgba(168,85,247,0.04) 100%)"
                      : "rgba(255,255,255,0.02)",
                    border: pkg.highlight ? "2px solid" : "1px solid",
                    borderColor: pkg.highlight ? "primary.main" : "divider",
                    borderRadius: 3,
                    position: "relative",
                    transition: "all 0.3s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: pkg.highlight ? "0 8px 40px rgba(34,211,238,0.15)" : "0 4px 20px rgba(0,0,0,0.2)",
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
                        background: "linear-gradient(135deg, #22d3ee, #a78bfa)",
                        color: "#000",
                        fontWeight: 700,
                        fontFamily: "monospace",
                        fontSize: "0.6rem",
                      }}
                    />
                  )}

                  <Typography variant="h5" sx={{ fontWeight: 800, fontFamily: "monospace", mb: 0.5 }}>
                    {pkg.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.8rem", mb: 2, minHeight: 40 }}>
                    {pkg.desc}
                  </Typography>

                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant="h3"
                      component="span"
                      sx={{ fontWeight: 900, fontSize: "2.5rem", fontFamily: "monospace" }}
                    >
                      {pkg.price}
                    </Typography>
                    <Typography variant="body2" component="span" sx={{ color: "text.secondary", fontSize: "0.75rem", ml: 0.5 }}>
                      à vista
                    </Typography>
                  </Box>

                  <Box sx={{ flex: 1, mb: 3 }}>
                    {pkg.items.map((item) => (
                      <Box key={item} sx={{ display: "flex", gap: 1, mb: 1.2 }}>
                        <CheckCircle sx={{ fontSize: 18, color: "primary.main", mt: 0.3, flexShrink: 0 }} />
                        <Typography variant="body2" sx={{ fontSize: "0.82rem", lineHeight: 1.5 }}>
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
                      fontFamily: "monospace",
                      fontWeight: 700,
                      textTransform: "none",
                      py: 1.5,
                      borderRadius: 2,
                      ...(pkg.highlight && {
                        background: "linear-gradient(135deg, #22d3ee, #a78bfa)",
                        color: "#000",
                        "&:hover": {
                          background: "linear-gradient(135deg, #22d3ee, #a78bfa)",
                          boxShadow: "0 4px 20px rgba(34,211,238,0.3)",
                        },
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

      {/* ─── CARCREW CASE ────────────────────── */}
      <Box sx={{ py: 6, my: 4 }}>
        <Container maxWidth="md">
          <Paper
            sx={{
              p: { xs: 3, md: 5 },
              textAlign: "center",
              background: "linear-gradient(135deg, rgba(34,211,238,0.04), rgba(168,85,247,0.04))",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 4,
            }}
          >
            <Typography variant="h6" sx={{ fontFamily: "monospace", color: "primary.main", mb: 2, fontSize: "0.75rem" }}>
              // CASE REAL
            </Typography>
            <Typography
              variant="h4"
              sx={{ fontWeight: 900, mb: 2, fontSize: { xs: "1.3rem", md: "1.8rem" }, fontFamily: "monospace" }}
            >
              CarCrew Commerce
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 500, mx: "auto", mb: 2, fontSize: "0.9rem", lineHeight: 1.7 }}>
              E-commerce de suspensão automotiva em Maringá. Loja completa com catálogo, carrinho, admin, SEO e integração com PIX.
              Cliente aparecendo nas primeiras posições do Google.
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 4, flexWrap: "wrap", mb: 3 }}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 900, color: "primary.main", fontFamily: "monospace" }}>121</Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>avaliações 5★</Typography>
              </Box>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 900, color: "primary.main", fontFamily: "monospace" }}>3</Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>páginas indexadas no Google</Typography>
              </Box>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 900, color: "primary.main", fontFamily: "monospace" }}>7</Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>dias pra ficar pronto</Typography>
              </Box>
            </Box>
            <Button
              href="https://carcrew.com.br"
              target="_blank"
              variant="outlined"
              startIcon={<ShoppingCart />}
              sx={{ fontFamily: "monospace", textTransform: "none" }}
            >
              Ver loja funcionando →
            </Button>
          </Paper>
        </Container>
      </Box>

      {/* ─── FAQ ──────────────────────────────── */}
      <Box sx={{ py: 6, my: 4 }}>
        <Container maxWidth="md">
          <Typography
            variant="h3"
            sx={{ fontWeight: 900, fontSize: { xs: "1.5rem", md: "2rem" }, textAlign: "center", mb: 1 }}
          >
            Dúvidas frequentes
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "text.secondary", textAlign: "center", mb: 5, fontFamily: "monospace", fontSize: "0.85rem" }}
          >
            $ man help e-commerce
          </Typography>

          {faq.map((item) => (
            <Accordion
              key={item.q}
              sx={{
                background: "transparent",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: "12px !important",
                mb: 1.5,
                "&::before": { display: "none" },
                "&.Mui-expanded": { borderColor: "primary.main" },
              }}
            >
              <AccordionSummary expandIcon={<ExpandMore sx={{ color: "primary.main" }} />}>
                <Typography sx={{ fontFamily: "monospace", fontWeight: 600, fontSize: "0.9rem" }}>
                  $ {item.q}
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
      <Box sx={{ py: 8, my: 4, borderTop: "1px solid", borderColor: "divider" }}>
        <Container maxWidth="sm" sx={{ textAlign: "center" }}>
          <Typography
            variant="h3"
            sx={{ fontWeight: 900, fontSize: { xs: "1.5rem", md: "2rem" }, mb: 2, fontFamily: "monospace" }}
          >
            Vamos criar sua loja?
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", mb: 4, fontSize: "0.9rem", lineHeight: 1.7, fontFamily: "monospace" }}>
            $ echo "sem enrolação, sem mensalidade, sem mistério"
          </Typography>
          <Button
            href="https://wa.me/5544984198075?text=Oi!%20Vim%20pela%20p%C3%A1gina%20de%20e-commerce%20de%20Maring%C3%A1%20e%20quero%20saber%20mais"
            target="_blank"
            variant="contained"
            size="large"
            startIcon={<WhatsApp />}
            sx={{
              background: "linear-gradient(135deg, #22d3ee, #a78bfa)",
              color: "#000",
              fontWeight: 700,
              fontFamily: "monospace",
              fontSize: "1.1rem",
              px: 6,
              py: 2,
              textTransform: "none",
              borderRadius: 3,
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 8px 30px rgba(34,211,238,0.3)",
              },
            }}
          >
            $ whatsapp agora
          </Button>
          <Typography variant="caption" sx={{ display: "block", mt: 2, color: "text.secondary", opacity: 0.5, fontFamily: "monospace" }}>
            ▸ resposta em até 30 min em horário comercial
          </Typography>
        </Container>
      </Box>
    </>
  );
}
