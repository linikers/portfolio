import { Container, Typography, Box, Button, Card, Grid2 as Grid, List, ListItem, ListItemText } from "@mui/material";
import SEO from "@/components/SEO";
import Head from "next/head";
import { motion } from "framer-motion";

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.6 } };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Marketing OS — Sistema Operacional do Marketing",
  applicationCategory: "MarketingApplication",
  operatingSystem: "Web",
  offers: [
    { "@type": "Offer", name: "Essential", price: "97", priceCurrency: "BRL" },
    { "@type": "Offer", name: "Pro", price: "197", priceCurrency: "BRL" },
    { "@type": "Offer", name: "Enterprise", price: "497", priceCurrency: "BRL" },
  ],
  areaServed: [{ "@type": "City", name: "Maringá" }, { "@type": "Country", name: "Brasil" }],
  description: "Sistema operacional de marketing multicanal. Gerencia campanhas, leads, canais e anúncios em um único sistema com agentes especializados.",
};

const navAnchor = { color: "#d4d0c8", textDecoration: "none", fontFamily: "monospace", fontSize: "0.65rem", letterSpacing: "2px", textTransform: "uppercase", transition: "0.2s", "&:hover": { color: "#33cc66" } };
const tag = { display: "inline-block", fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "2px", textTransform: "uppercase", px: 1, py: 0.3, background: "#1a3a5c", color: "#fff", alignSelf: "flex-start", mt: 0.5 };
const tagGreen = { ...tag, background: "#227744" };
const sectionLabel = { fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "4px", color: "#1a3a5c", textTransform: "uppercase", mb: 1.5 };
const sectionTitle = { fontWeight: 700, mb: 1.5, color: "#1a1a1a" };
const sectionSub = { color: "#666260", maxWidth: 600, mb: 6, lineHeight: 1.7 };

export default function MarketingOS() {
  return (
    <>
      <SEO
        title="Marketing OS — O Sistema Operacional do seu Marketing"
        description="Campanhas, leads, canais e operações funcionando em um único sistema. Marketing OS — o sistema operacional do marketing digital."
        ogImage="/profileImg.jpg"
      />
      <Head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <meta name="keywords" content="marketing OS, sistema de marketing, gestão de campanhas, google ads, meta ads, automação de marketing, Maringá, Brasil" />
      </Head>

      {/* Hero */}
      <Box sx={{ background: "#1a1a1a", borderBottom: "4px solid #1a3a5c", py: { xs: 8, md: 12 }, position: "relative", overflow: "hidden" }}>
        <Container maxWidth="lg">
          <Typography variant="overline" sx={{ color: "#33cc66", border: "1px solid #227744", px: 2, py: 0.5, display: "inline-block", mb: 3, fontSize: "0.6rem", letterSpacing: 4 }}>
            ◆ MARKETING OS V1.0
          </Typography>
          <Typography variant="h1" sx={{ fontWeight: 700, color: "#fff", fontSize: { xs: "1.8rem", md: "3.5rem" }, lineHeight: 1.1, maxWidth: 800, mb: 2, letterSpacing: -1 }}>
            O Sistema Operacional <span style={{ color: "#4a8abc", display: "block" }}>do seu Marketing.</span>
          </Typography>
          <Typography sx={{ color: "#d4d0c8", maxWidth: 640, mb: 4, lineHeight: 1.7, fontSize: "1.1rem" }}>
            Campanhas, leads, canais e operações funcionando em um único sistema. Tudo orquestrado por agentes especializados que trabalham 24 horas por dia.
          </Typography>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button variant="contained" href="#modulos" sx={{ background: "#1a3a5c", color: "#fff", fontFamily: "monospace", fontWeight: 600, px: 4, py: 1.5, boxShadow: "2px 2px 0 #1a1a1a", "&:hover": { background: "#2a5a8c", boxShadow: "3px 3px 0 #1a1a1a" } }}>
              CONHECER O SISTEMA
            </Button>
            <Button variant="outlined" href="https://wa.me/5544984198075?text=Quero%20testar%20Marketing%20OS" target="_blank" sx={{ borderColor: "#888480", color: "#d4d0c8", fontFamily: "monospace", fontWeight: 600, px: 4, py: 1.5, "&:hover": { borderColor: "#33cc66", color: "#33cc66" } }}>
              FALAR COM CONSULTOR →
            </Button>
          </Box>
          <Box sx={{ mt: 6, display: "flex", gap: { xs: 2, md: 5 }, flexDirection: { xs: "column", md: "row" }, fontFamily: "monospace", fontSize: "0.65rem", color: "#888480", letterSpacing: 1, textTransform: "uppercase" }}>
            <Typography sx={{ fontFamily: "monospace", fontSize: "0.65rem", color: "#888480" }}>google ads <Box component="span" sx={{ color: "#33cc66" }}>●</Box> meta ads <Box component="span" sx={{ color: "#33cc66" }}>●</Box> whatsapp</Typography>
            <Typography sx={{ fontFamily: "monospace", fontSize: "0.65rem", color: "#888480" }}>6 agentes especializados</Typography>
          </Box>
        </Container>
      </Box>

      {/* Como Funciona */}
      <Box sx={{ py: { xs: 6, md: 10 }, borderBottom: "1px solid #e8e0d0" }}>
        <Container maxWidth="lg">
          <Typography sx={sectionLabel}>◆ fluxo operacional</Typography>
          <Typography variant="h2" sx={sectionTitle}>Como o <span style={{ color: "#1a3a5c" }}>Sistema</span> funciona</Typography>
          <Typography sx={sectionSub}>Cada ação de marketing entra como um evento. O sistema roteia para o agente certo, que analisa, decide e executa — tudo em ciclo contínuo.</Typography>
          <Grid container spacing={3}>
            {[
              { num: "01", title: "Evento entra", desc: "Lead novo, campanha criada, mensagem enviada — tudo vira um evento no barramento central." },
              { num: "02", title: "Supervisor roteia", desc: "O supervisor identifica o tipo de evento e encaminha para o especialista correto." },
              { num: "03", title: "Agente processa", desc: "Cada especialista analisa o contexto, toma decisões e coordena a execução." },
              { num: "04", title: "Ação executada", desc: "O resultado é publicado como novo evento — fechando o ciclo e gerando métricas." },
            ].map((step) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={step.num}>
                <Box sx={{ border: "1px solid #d4d0c8", p: 3, background: "#f0ebe0", height: "100%" }}>
                  <Typography variant="h3" sx={{ fontFamily: "monospace", fontSize: "2rem", fontWeight: 700, color: "#1a3a5c", opacity: 0.3, lineHeight: 1, mb: 1 }}>{step.num}</Typography>
                  <Typography sx={{ fontWeight: 600, mb: 1, color: "#1a1a1a" }}>{step.title}</Typography>
                  <Typography variant="body2" sx={{ color: "#666260", lineHeight: 1.5, fontSize: "0.8rem" }}>{step.desc}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Módulos */}
      <Box sx={{ py: { xs: 6, md: 10 }, background: "#fff", borderBottom: "1px solid #e8e0d0" }} id="modulos">
        <Container maxWidth="lg">
          <Typography sx={sectionLabel}>◆ módulos do sistema</Typography>
          <Typography variant="h2" sx={sectionTitle}>Tudo em <span style={{ color: "#1a3a5c" }}>um só lugar</span></Typography>
          <Typography sx={sectionSub}>Seis módulos que cobrem o ciclo completo do marketing operacional.</Typography>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }, gap: "2px", background: "#d4d0c8", border: "1px solid #d4d0c8" }}>
            {[
              { icon: "📊", title: "Campanhas", desc: "Criação, agendamento, execução e relatórios de campanhas multicanal.", green: false },
              { icon: "👤", title: "Contatos", desc: "Gestão de leads, segmentação por estágio do funil, histórico de interações.", green: false },
              { icon: "📨", title: "Canais", desc: "WhatsApp integrado. Email e SMS prontos para ativar.", green: false },
              { icon: "📈", title: "Anúncios", desc: "Google Ads e Meta Ads conectados via OAuth. Dashboard com métricas e alertas.", green: false },
              { icon: "🧠", title: "Agentes IA", desc: "Especialistas que analisam métricas, tomam decisões e sugerem otimizações.", green: true },
              { icon: "📋", title: "Relatórios", desc: "Eventos, métricas, alertas automáticos e exportação CSV/PDF.", green: false },
            ].map((mod) => (
              <Box key={mod.title} sx={{ background: "#f0ebe0", p: { xs: 3, md: 4 } }}>
                <Typography variant="h3" sx={{ fontSize: "1.5rem", mb: 0.5 }}>{mod.icon}</Typography>
                <Typography sx={{ fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, color: "#1a1a1a", mb: 0.5 }}>{mod.title}</Typography>
                <Typography variant="body2" sx={{ color: "#666260", fontSize: "0.75rem", mb: 1 }}>{mod.desc}</Typography>
                <Box sx={mod.green ? tagGreen : tag}>{mod.green ? "internal" : "ativo"}</Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Agentes */}
      <Box sx={{ py: { xs: 6, md: 10 }, borderBottom: "1px solid #e8e0d0" }}>
        <Container maxWidth="lg">
          <Typography sx={sectionLabel}>◆ agentes especializados</Typography>
          <Typography variant="h2" sx={sectionTitle}>Seis especialistas <span style={{ color: "#1a3a5c" }}>trabalhando</span></Typography>
          <Typography sx={sectionSub}>Cada agente cobre um domínio específico. Eles se comunicam por eventos — nenhum depende do outro.</Typography>
          <Grid container spacing={3}>
            {[
              { name: "Campaign Specialist", role: "Analisa e gerencia campanhas", desc: "Valida dados, seleciona audiência, agenda mensagens e coordena a execução multicanal.", events: ["campanha.criada", "campanha.iniciada", "msg.falhou"] },
              { name: "Lead Specialist", role: "Processa novos contatos", desc: "Cadastra leads, atualiza estágio do funil e prepara contatos para campanhas.", events: ["lead.criado", "lead.atualizado"] },
              { name: "Channel Specialist", role: "Gerencia canais de envio", desc: "Roteia mensagens para o canal correto — WhatsApp, Email ou SMS — e monitora entregas.", events: ["msg.enviada", "msg.entregue", "msg.falhou"] },
              { name: "Analytics Specialist", role: "Métricas e relatórios", desc: "Coleta métricas de campanhas, calcula KPIs e alimenta os dashboards em tempo real.", events: ["campanha.concluida", "campanha.falha"] },
              { name: "Optimizer Specialist", role: "Otimização contínua", desc: "Analisa resultados e ajusta lances, orçamentos e segmentação para melhor performance.", events: ["campanha.concluida"] },
              { name: "Pricing Specialist", role: "Análise financeira", desc: "Avalia preços, margens, concorrência e recomenda estratégias de precificação.", events: ["chamada direta"] },
            ].map((ag) => (
              <Grid size={{ xs: 12, md: 6 }} key={ag.name}>
                <Box sx={{ border: "1px solid #d4d0c8", p: 3.5, background: "#f0ebe0", height: "100%" }}>
                  <Typography sx={{ fontFamily: "monospace", fontSize: "0.75rem", fontWeight: 600, color: "#1a3a5c", letterSpacing: 1 }}>{ag.name}</Typography>
                  <Typography variant="caption" sx={{ fontFamily: "monospace", color: "#888480", textTransform: "uppercase", letterSpacing: 1, display: "block", mb: 1 }}>{ag.role}</Typography>
                  <Typography variant="body2" sx={{ color: "#666260", lineHeight: 1.6, mb: 1.5 }}>{ag.desc}</Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
                    {ag.events.map((ev) => (
                      <Typography key={ev} variant="caption" sx={{ fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: 1, px: 1, py: 0.3, border: "1px solid #d4d0c8", color: "#888480", background: "#fff" }}>{ev}</Typography>
                    ))}
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Canais */}
      <Box sx={{ py: { xs: 6, md: 10 }, background: "#fff", borderBottom: "1px solid #e8e0d0" }}>
        <Container maxWidth="lg">
          <Typography sx={sectionLabel}>◆ canais suportados</Typography>
          <Typography variant="h2" sx={sectionTitle}>Conecte seus <span style={{ color: "#1a3a5c" }}>canais</span></Typography>
          <Typography sx={sectionSub}>Disparo multicanal com tracking individual e taxa-limite por canal.</Typography>
          <Grid container spacing={3}>
            {[
              { icon: "💬", title: "WhatsApp", desc: "API oficial integrada. Envio de texto, imagens e templates.", status: "● operacional", color: "#227744" },
              { icon: "✉️", title: "Email", desc: "Adapter implementado com rate-limiter e tracking de abertura.", status: "● operacional", color: "#227744" },
              { icon: "📱", title: "SMS", desc: "Infraestrutura pronta. Adapter, rate-limiter e tracker.", status: "○ em breve", color: "#888480" },
            ].map((ch) => (
              <Grid size={{ xs: 12, md: 4 }} key={ch.title}>
                <Box sx={{ border: "1px solid #d4d0c8", p: 3, textAlign: "center", background: "#f0ebe0" }}>
                  <Typography variant="h3" sx={{ fontSize: "2rem", mb: 1 }}>{ch.icon}</Typography>
                  <Typography sx={{ fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, mb: 1 }}>{ch.title}</Typography>
                  <Typography variant="body2" sx={{ color: "#666260", fontSize: "0.75rem", mb: 1 }}>{ch.desc}</Typography>
                  <Typography variant="caption" sx={{ fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: 2, textTransform: "uppercase", color: ch.color }}>{ch.status}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Painel */}
      <Box sx={{ py: { xs: 6, md: 10 }, borderBottom: "1px solid #e8e0d0" }}>
        <Container maxWidth="lg">
          <Typography sx={sectionLabel}>◆ painel de controle</Typography>
          <Typography variant="h2" sx={sectionTitle}>Visão completa <span style={{ color: "#1a3a5c" }}>em tempo real</span></Typography>
          <Typography sx={sectionSub}>Acompanhe campanhas, métricas de anúncios e operações em um único dashboard.</Typography>
          <Box sx={{ border: "2px solid #1a1a1a", background: "#2a2a2a", p: { xs: 2, md: 5 } }}>
            <Box sx={{ background: "#1a1a1a", border: "1px solid #444", p: { xs: 2, md: 3 }, fontFamily: "monospace", fontSize: "0.7rem", color: "#f5f0e8" }}>
              <Box sx={{ display: "flex", gap: 0.75, mb: 2, pb: 1.5, borderBottom: "1px solid #333" }}>
                <Box sx={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f56" }} />
                <Box sx={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e" }} />
                <Box sx={{ width: 10, height: 10, borderRadius: "50%", background: "#27c93f" }} />
              </Box>
              {[
                { cols: ["campanha", "status", "gasto", "roas"], header: true },
                { cols: ["carros usados — search", "● ativa", "R$ 4.320", "3.2x"], green: true },
                { cols: ["pneus promo — shopping", "● ativa", "R$ 2.180", "4.7x"], green: true },
                { cols: ["ofertas julho — display", "○ pausada", "R$ 890", "1.8x"] },
                { cols: ["lançamento — meta ads", "● ativa", "R$ 1.540", "2.9x"], green: true },
              ].map((row, i) => (
                <Box key={i} sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "120px 1fr 80px 80px" }, gap: { xs: 0.5, md: 2 }, py: 0.75, borderBottom: "1px solid #222" }}>
                  {row.cols.map((col, j) => (
                    <Typography key={j} variant="caption" sx={{ fontFamily: "monospace", fontSize: { xs: "0.6rem", md: "0.7rem" }, color: row.header ? "#4a8abc" : row.green && j === 1 ? "#33cc66" : j === 0 ? "#4a8abc" : "#f5f0e8", fontWeight: row.header ? 600 : 400, display: row.header && j === 0 ? { xs: "none", md: "block" } : "block" }}>
                      {col}
                    </Typography>
                  ))}
                </Box>
              ))}
            </Box>
            <Typography variant="caption" sx={{ display: "block", mt: 2, fontFamily: "monospace", fontSize: "0.6rem", color: "#888480", letterSpacing: 1, textAlign: "center" }}>
              dashboard — google ads + meta ads (dados simulados para demonstração)
            </Typography>
          </Box>
          <Grid container spacing={2} sx={{ mt: 4 }}>
            {["✔ Gráficos de gasto, ROAS, CTR, CPC", "✔ Alertas automáticos de baixo ROAS e CPA alto", "✔ Comparação com período anterior", "✔ Exportação CSV e PDF"].map((item) => (
              <Grid size={{ xs: 12, md: 6 }} key={item}>
                <Box sx={{ p: 2, border: "1px solid #d4d0c8", display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography sx={{ color: "#227744", fontWeight: 700, fontSize: "0.8rem" }}>{item}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Benefícios */}
      <Box sx={{ py: { xs: 6, md: 10 }, background: "#1a1a1a" }}>
        <Container maxWidth="lg">
          <Typography sx={{ ...sectionLabel, color: "#4a8abc" }}>◆ por que marketing os</Typography>
          <Typography variant="h2" sx={{ ...sectionTitle, color: "#fff" }}>Organização. <span style={{ color: "#4a8abc" }}>Controle. Execução.</span></Typography>
          <Typography sx={{ ...sectionSub, color: "#888480" }}>Não é mais uma ferramenta de IA. É a infraestrutura que o seu marketing precisava.</Typography>
          <Grid container spacing={3}>
            {[
              { num: "01", title: "Um sistema, todos os canais", desc: "Google Ads, Meta Ads, WhatsApp, Email — tudo gerenciado de um único lugar. Sem alternar entre abas." },
              { num: "02", title: "Agentes que nunca dormem", desc: "Enquanto você opera o negócio, os agentes monitoram métricas, processam leads e mantêm campanhas no ar." },
              { num: "03", title: "Decisões baseadas em dados", desc: "Cada ação vira um evento. Cada evento gera métrica. Cada métrica alimenta a próxima decisão." },
              { num: "04", title: "Arquitetura que escala", desc: "Componentes desacoplados, barramento de eventos, agentes independentes. Cresce sem reestruturar." },
              { num: "05", title: "Conectado com as plataformas", desc: "OAuth com Google e Meta. API do WhatsApp. Pronto para Mercado Livre e Shopee." },
              { num: "06", title: "Feito para PMEs", desc: "Complexidade técnica abstraída. Configure em minutos, não em dias." },
            ].map((ben) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={ben.num}>
                <Box sx={{ border: "1px solid #333", p: 3.5 }}>
                  <Typography variant="h3" sx={{ fontFamily: "monospace", fontSize: "2.5rem", fontWeight: 700, color: "#1a3a5c", opacity: 0.4, lineHeight: 1, mb: 1.5 }}>{ben.num}</Typography>
                  <Typography sx={{ fontWeight: 600, mb: 1, color: "#fff" }}>{ben.title}</Typography>
                  <Typography variant="body2" sx={{ color: "#888480", lineHeight: 1.6, fontSize: "0.78rem" }}>{ben.desc}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Casos de Uso */}
      <Box sx={{ py: { xs: 6, md: 10 }, borderBottom: "1px solid #e8e0d0" }}>
        <Container maxWidth="lg">
          <Typography sx={sectionLabel}>◆ casos de uso</Typography>
          <Typography variant="h2" sx={sectionTitle}>Para quem o <span style={{ color: "#1a3a5c" }}>Sistema</span> foi feito</Typography>
          <Typography sx={sectionSub}>Empresas que precisam organizar o marketing operacional sem depender de plataformas desconectadas.</Typography>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: "2px", background: "#d4d0c8", border: "1px solid #d4d0c8" }}>
            {[
              { title: "Loja que anuncia no Google e Facebook", desc: "Unifica campanhas, métricas e orçamento em um dashboard só. Sem planilha, sem login em dois lugares." },
              { title: "Prestador de serviços com captação de leads", desc: "Lead chega → agente processa → campanha dispara → funil avança. Tudo automático." },
              { title: "Agência que gerencia múltiplos clientes", desc: "Contas separadas por cliente. Relatórios automáticos. Visão consolidada ou individual." },
              { title: "E-commerce que opera em marketplaces", desc: "Análise de preços, concorrência e margens. Decisão de precificação assistida por agente." },
            ].map((c) => (
              <Box key={c.title} sx={{ background: "#f0ebe0", p: 4 }}>
                <Typography sx={{ fontWeight: 600, mb: 1 }}>{c.title}</Typography>
                <Typography variant="body2" sx={{ color: "#666260", lineHeight: 1.6, fontSize: "0.78rem" }}>{c.desc}</Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* CTA Final */}
      <Box sx={{ py: { xs: 8, md: 12 }, background: "#1a1a1a", textAlign: "center", borderBottom: "4px solid #1a3a5c" }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ fontWeight: 700, color: "#fff", mb: 2, fontSize: { xs: "1.8rem", md: "2.5rem" } }}>
            Pronto para <span style={{ color: "#4a8abc" }}>organizar</span> seu marketing?
          </Typography>
          <Typography sx={{ color: "#888480", mb: 4, maxWidth: 500, mx: "auto" }}>Teste grátis por 7 dias. Sem compromisso. Sem cartão de crédito.</Typography>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
            <Button variant="contained" href="https://wa.me/5544984198075?text=Quero%20testar%20Marketing%20OS" target="_blank" sx={{ background: "#1a3a5c", color: "#fff", fontFamily: "monospace", fontWeight: 600, px: 4, py: 1.5, boxShadow: "2px 2px 0 #1a1a1a", "&:hover": { background: "#2a5a8c" } }}>
              TESTAR GRÁTIS →
            </Button>
            <Button variant="outlined" href="https://marketing.linikers.cloud" sx={{ borderColor: "#888480", color: "#888480", fontFamily: "monospace", fontWeight: 600, px: 4, py: 1.5, "&:hover": { borderColor: "#4a8abc", color: "#4a8abc" } }}>
              ACESSAR DASHBOARD
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}
