import { Container, Typography, Box, Button, Stack, Grid, Card, CardContent, List, ListItem, ListItemIcon, ListItemText, Divider } from "@mui/material";
import SEO from "@/components/SEO";
import Image from "next/image";
import { FaWhatsapp, FaChartLine, FaRobot, FaBrain, FaDollarSign } from "react-icons/fa6";
import { motion } from "framer-motion";

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.6 } };

const FAIcon: any = FaChartLine;
const RobotIcon: any = FaRobot;
const BrainIcon: any = FaBrain;
const DollarIcon: any = FaDollarSign;
const ZapIcon: any = FaWhatsapp;

export default function ConsultoriaIA() {
  return (
    <>
      <SEO
        title="Consultoria IA em Precificação"
        description="Maximize sua margem com precificação inteligente baseada em IA. Análise de mercado, concorrência e custos para definir o preço ideal."
      />
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 }, minHeight: "80vh" }}>
        
        {/* Hero */}
        <motion.div {...fadeUp}>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography variant="overline" sx={{ color: "#00ff41", letterSpacing: 3, border: "1px solid #00ff41", px: 2, py: 0.5, display: "inline-block", mb: 2, fontSize: "0.65rem" }}>
              ✦ CONSULTORIA IA
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, color: "#fff", fontSize: { xs: "1.8rem", md: "2.5rem" } }}>
              Precificação <span style={{ color: "#00ff41" }}>Inteligente</span> com IA
            </Typography>
            <Typography sx={{ color: "#00cc33", maxWidth: 700, mx: "auto", mb: 4, fontSize: "0.9rem" }}>
              Maximize sua margem com decisões baseadas em dados. Nossa IA analisa mercado, concorrência e custos para definir o preço ideal do seu produto.
            </Typography>
            <Button variant="contained" href="https://wa.me/5544984198075?text=Quero%20consultoria%20IA%20de%20precifica%C3%A7%C3%A3o" target="_blank" sx={{ bgcolor: "#00ff41", color: "#000", fontFamily: "monospace", fontWeight: 600, px: 4, py: 1.5, '&:hover': { bgcolor: "#00cc33" } }}>
              QUERO SABER MAIS
            </Button>
          </Box>
        </motion.div>

        {/* Pricing */}
        <motion.div {...fadeUp}>
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Card sx={{ maxWidth: 400, mx: "auto", bgcolor: "rgba(255,255,255,0.01)", border: "1px solid #1e293b", p: 4 }}>
              <Typography variant="overline" sx={{ color: "#00cc33", letterSpacing: 3, fontSize: "0.7rem" }}>CONSULTORIA IA</Typography>
              <Typography variant="h3" sx={{ color: "#fff", fontWeight: 700, my: 1 }}>R$ 97 <Typography component="span" variant="body1" sx={{ color: "#00cc33" }}>/projeto</Typography></Typography>
              <List dense>
                {["Análise de precificação com IA", "Comparativo de concorrência", "Relatório completo de cenários", "Recomendação de margem ideal", "Suporte por 7 dias"].map((item) => (
                  <ListItem key={item} sx={{ borderBottom: "1px solid #1e293b", py: 1 }}>
                    <ListItemText primary={item} sx={{ "& .MuiListItemText-primary": { fontSize: "0.8rem", color: "#ccc" } }} />
                  </ListItem>
                ))}
              </List>
              <Button variant="contained" fullWidth href="https://wa.me/5544984198075?text=Quero%20consultoria%20IA%20de%20precifica%C3%A7%C3%A3o" target="_blank" sx={{ mt: 2, bgcolor: "#00ff41", color: "#000", fontFamily: "monospace", fontWeight: 600, '&:hover': { bgcolor: "#00cc33" } }}>
                CONTRATAR
              </Button>
            </Card>
          </Box>
        </motion.div>

        {/* Como funciona */}
        <motion.div {...fadeUp}>
          <Typography variant="h4" sx={{ textAlign: "center", mb: 4, fontWeight: 700, color: "#fff" }}>
            Como <span style={{ color: "#00ff41" }}>Funciona</span>
          </Typography>
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ color: "#00ff41", fontWeight: 600, mb: 1 }}>1. Análise de Dados</Typography>
                <Typography sx={{ color: "#00cc33", fontSize: "0.85rem" }}>Coletamos dados do seu produto (custo, margem) e do mercado (preço dos concorrentes, volume).</Typography>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ color: "#00ff41", fontWeight: 600, mb: 1 }}>2. IA Processa</Typography>
                <Typography sx={{ color: "#00cc33", fontSize: "0.85rem" }}>Nossa IA analisa centenas de variáveis e gera cenários de precificação com projeção de resultados.</Typography>
              </Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ color: "#00ff41", fontWeight: 600, mb: 1 }}>3. Você Decide</Typography>
                <Typography sx={{ color: "#00cc33", fontSize: "0.85rem" }}>Recebe um relatório completo com recomendações de preço, margem e estratégia.</Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ width: "100%", height: 300, borderRadius: 1, border: "1px solid #1e293b", overflow: "hidden", position: "relative" }}>
                <Image src="/ecommerce-hero.png" alt="Dashboard IA" fill style={{ objectFit: "cover" }} />
              </Box>
            </Grid>
          </Grid>
        </motion.div>

        {/* CTA */}
        <Box sx={{ textAlign: "center", mt: 8, pt: 6, borderTop: "1px solid #1e293b" }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: "#fff" }}>
            Pronto para <span style={{ color: "#00ff41" }}>maximizar</span> seus lucros?
          </Typography>
          <Typography sx={{ color: "#00cc33", mb: 3, fontSize: "0.85rem" }}>Primeira análise gratuita. Sem compromisso.</Typography>
          <Button variant="contained" href="https://wa.me/5544984198075?text=Quero%20consultoria%20IA%20de%20precifica%C3%A7%C3%A3o" target="_blank" sx={{ bgcolor: "#00ff41", color: "#000", fontFamily: "monospace", fontWeight: 600, px: 4, py: 1.5, '&:hover': { bgcolor: "#00cc33" } }}>
            FALAR NO WHATSAPP
          </Button>
        </Box>

      </Container>
    </>
  );
}
