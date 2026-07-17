import { Container, Typography, Box, Button, Card, CardContent, List, ListItem, ListItemText, Grid } from "@mui/material";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.6 } };

const planos = [
  {
    name: "ESSENTIAL", price: "R$ 97", period: "/mês", desc: "Para quem está começando",
    items: ["1 conta Google Ads ou Meta Ads", "Dashboard com métricas básicas", "Até 3 campanhas ativas", "Relatórios semanais", "Suporte por e-mail"],
    featured: false, wa: "Quero%20plano%20Essential%20Marketing%20OS",
  },
  {
    name: "PRO", price: "R$ 197", period: "/mês", desc: "Para negócios em crescimento",
    items: ["Google Ads + Meta Ads", "Dashboard completo com gráficos", "Campanhas ilimitadas", "IA cria e otimiza campanhas", "Relatórios automáticos", "Suporte WhatsApp prioritário"],
    featured: true, wa: "Quero%20plano%20Pro%20Marketing%20OS",
  },
  {
    name: "ENTERPRISE", price: "R$ 497", period: "/mês", desc: "Para agências e multi-contas",
    items: ["Múltiplas contas de anúncio", "Dashboard white-label", "API exclusiva para integração", "IA personalizada", "Gerente de conta dedicado", "Suporte 24h via WhatsApp"],
    featured: false, wa: "Quero%20plano%20Enterprise%20Marketing%20OS",
  },
];

const features = [
  { icon: "🤖", title: "IA que Cria Campanhas", desc: "A inteligência artificial cria e otimiza campanhas automaticamente baseada nos seus objetivos" },
  { icon: "📊", title: "Dashboard em Tempo Real", desc: "Gráficos de gasto, ROAS, CTR, CPC e impressões atualizados em tempo real" },
  { icon: "🎯", title: "Google & Meta Ads", desc: "Gerencie Google Ads e Facebook/Instagram Ads em um só lugar" },
  { icon: "📈", title: "Otimização Contínua", desc: "A IA ajusta lances, orçamentos e segmentação automaticamente" },
  { icon: "🔐", title: "Segurança OAuth", desc: "Conexão segura via OAuth 2.0 sem compartilhar senhas" },
  { icon: "📱", title: "Suporte Premium", desc: "Suporte direto via WhatsApp com respostas em até 2h úteis" },
];

export default function MarketingOS() {
  return (
    <>
      <SEO
        title="Marketing OS - Automação de Marketing com IA"
        description="Sistema inteligente que cria, gerencia e otimiza suas campanhas de Google Ads e Meta Ads automaticamente."
      />
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 }, minHeight: "80vh" }}>
        
        {/* Hero */}
        <motion.div {...fadeUp}>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography variant="overline" sx={{ color: "#00ff41", letterSpacing: 3, border: "1px solid #00ff41", px: 2, py: 0.5, display: "inline-block", mb: 2, fontSize: "0.65rem" }}>
              ✦ MARKETING OS
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, color: "#fff", fontSize: { xs: "1.8rem", md: "2.5rem" } }}>
              Automação de Marketing <span style={{ color: "#00ff41" }}>com IA</span>
            </Typography>
            <Typography sx={{ color: "#00cc33", maxWidth: 700, mx: "auto", mb: 4, fontSize: "0.9rem" }}>
              Sistema inteligente que cria, gerencia e otimiza suas campanhas de Google Ads e Meta Ads automaticamente.
            </Typography>
            <Button variant="contained" href="https://wa.me/5544984198075?text=Quero%20testar%20Marketing%20OS" target="_blank" sx={{ bgcolor: "#00ff41", color: "#000", fontFamily: "monospace", fontWeight: 600, px: 4, py: 1.5, mr: 1, '&:hover': { bgcolor: "#00cc33" } }}>
              TESTAR GRÁTIS
            </Button>
            <Button variant="outlined" href="https://marketing.linikers.cloud" target="_blank" sx={{ borderColor: "#00ff41", color: "#00ff41", fontFamily: "monospace", fontWeight: 600, px: 4, py: 1.5, mt: { xs: 1, md: 0 }, '&:hover': { borderColor: "#00cc33", color: "#00cc33" } }}>
              VER DASHBOARD
            </Button>
          </Box>
        </motion.div>

        {/* Features */}
        <motion.div {...fadeUp}>
          <Typography variant="h4" sx={{ textAlign: "center", mb: 4, fontWeight: 700, color: "#fff" }}>
            Tudo que você <span style={{ color: "#00ff41" }}>precisa</span>
          </Typography>
          <Grid container spacing={2} sx={{ mb: 8 }}>
            {features.map((f) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={f.title}>
                <Card sx={{ bgcolor: "rgba(255,255,255,0.01)", border: "1px solid #1e293b", textAlign: "center", p: 3, height: "100%" }}>
                  <Typography variant="h3" sx={{ mb: 1 }}>{f.icon}</Typography>
                  <Typography variant="subtitle1" sx={{ color: "#fff", fontWeight: 600, mb: 1 }}>{f.title}</Typography>
                  <Typography variant="body2" sx={{ color: "#00cc33", fontSize: "0.75rem" }}>{f.desc}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Plans */}
        <motion.div {...fadeUp}>
          <Typography variant="h4" sx={{ textAlign: "center", mb: 4, fontWeight: 700, color: "#fff" }}>
            Planos <span style={{ color: "#00ff41" }}>Marketing OS</span>
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            {planos.map((p) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={p.name}>
                <Card sx={{
                  bgcolor: "rgba(255,255,255,0.01)", border: p.featured ? "1px solid #00ff41" : "1px solid #1e293b",
                  p: 3, textAlign: "center", height: "100%", position: "relative",
                }}>
                  {p.featured && (
                    <Typography variant="caption" sx={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", bgcolor: "#00ff41", color: "#000", px: 2, fontWeight: 600, fontSize: "0.55rem", letterSpacing: 2 }}>
                      MAIS POPULAR
                    </Typography>
                  )}
                  <Typography variant="overline" sx={{ color: "#00cc33", letterSpacing: 3, fontSize: "0.7rem" }}>{p.name}</Typography>
                  <Typography variant="h4" sx={{ color: "#fff", fontWeight: 700, my: 1 }}>
                    {p.price} <Typography component="span" variant="body2" sx={{ color: "#00cc33" }}>{p.period}</Typography>
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#666", mb: 1, fontSize: "0.75rem" }}>{p.desc}</Typography>
                  <List dense>
                    {p.items.map((item) => (
                      <ListItem key={item} sx={{ borderBottom: "1px solid #1e293b", py: 0.5 }}>
                        <ListItemText primary={item} sx={{ "& .MuiListItemText-primary": { fontSize: "0.75rem", color: "#ccc" } }} />
                      </ListItem>
                    ))}
                  </List>
                  <Button variant="contained" fullWidth href={`https://wa.me/5544984198075?text=${p.wa}`} target="_blank" sx={{ mt: 2, bgcolor: "#00ff41", color: "#000", fontFamily: "monospace", fontWeight: 600, '&:hover': { bgcolor: "#00cc33" } }}>
                    ASSINAR
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* CTA */}
        <Box sx={{ textAlign: "center", mt: 8, pt: 6, borderTop: "1px solid #1e293b" }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: "#fff" }}>
            Teste grátis por <span style={{ color: "#00ff41" }}>7 dias</span>
          </Typography>
          <Typography sx={{ color: "#00cc33", mb: 3, fontSize: "0.85rem" }}>Sem compromisso. Sem cartão de crédito.</Typography>
          <Button variant="contained" href="https://wa.me/5544984198075?text=Quero%20testar%20Marketing%20OS" target="_blank" sx={{ bgcolor: "#00ff41", color: "#000", fontFamily: "monospace", fontWeight: 600, px: 4, py: 1.5, '&:hover': { bgcolor: "#00cc33" } }}>
            QUERO TESTAR GRÁTIS
          </Button>
        </Box>

      </Container>
    </>
  );
}
