import Head from "next/head";
import SEO from "@/components/SEO";

const styles = `
/* ═══════════════════════════════════════
   MARKETING OS — Landing Page
   Sistema Operacional do Marketing
   ═══════════════════════════════════════ */

@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap');

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

.mkt-body {
  font-family: 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif;
  background: #f5f0e8;
  color: #1a1a1a;
  line-height: 1.6;
  min-height: 100vh;
}

.mkt-body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.008) 2px, rgba(0,0,0,0.008) 4px);
  pointer-events: none;
  z-index: 9999;
}

.mkt-container { max-width: 1100px; margin: 0 auto; padding: 0 32px; }

/* Top Bar */
.mkt-topbar {
  background: #1a1a1a;
  color: #f5f0e8;
  padding: 10px 0;
  border-bottom: 3px solid #1a3a5c;
  position: sticky;
  top: 0;
  z-index: 100;
}
.mkt-topbar .mkt-container { display: flex; justify-content: space-between; align-items: center; }
.mkt-topbar .mkt-logo {
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #f5f0e8;
  text-decoration: none;
}
.mkt-topbar .mkt-logo em { color: #33cc66; font-style: normal; }
.mkt-topbar nav { display: flex; gap: 24px; }
.mkt-topbar nav a {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #d4d0c8;
  text-decoration: none;
  transition: 0.2s;
}
.mkt-topbar nav a:hover { color: #33cc66; }

/* Hero */
.mkt-hero {
  padding: 100px 0 80px;
  background: #1a1a1a;
  border-bottom: 4px solid #1a3a5c;
  position: relative;
  overflow: hidden;
}
.mkt-hero::after {
  content: '';
  position: absolute;
  bottom: 0; right: 0;
  width: 300px; height: 300px;
  background: radial-gradient(circle at 100% 100%, rgba(42,90,140,0.08) 0%, transparent 70%);
  pointer-events: none;
}
.mkt-hero .mkt-container { position: relative; z-index: 1; }
.mkt-badge {
  display: inline-block;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 4px;
  color: #33cc66;
  border: 1px solid #227744;
  padding: 4px 14px;
  margin-bottom: 30px;
  text-transform: uppercase;
}
.mkt-hero h1 {
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.1;
  color: #ffffff;
  max-width: 800px;
  margin-bottom: 20px;
  letter-spacing: -1px;
}
.mkt-hero h1 span { color: #4a8abc; display: block; }
.mkt-hero p {
  font-size: 1.1rem;
  color: #d4d0c8;
  max-width: 640px;
  margin-bottom: 36px;
  line-height: 1.7;
}
.mkt-hero .mkt-cta-group { display: flex; gap: 16px; flex-wrap: wrap; }

.mkt-btn {
  display: inline-flex;
  align-items: center;
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 600;
  font-size: 0.75rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-decoration: none;
  padding: 14px 36px;
  cursor: pointer;
  transition: 0.2s;
  border: none;
}
.mkt-btn-primary {
  background: #1a3a5c;
  color: #ffffff;
  box-shadow: 2px 2px 0 #1a1a1a;
}
.mkt-btn-primary:hover {
  background: #2a5a8c;
  box-shadow: 3px 3px 0 #1a1a1a;
  transform: translate(-1px, -1px);
}
.mkt-btn-outline {
  background: transparent;
  color: #d4d0c8;
  border: 1px solid #888480;
}
.mkt-btn-outline:hover { border-color: #33cc66; color: #33cc66; }

.mkt-meta {
  margin-top: 50px;
  display: flex;
  gap: 40px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.65rem;
  color: #888480;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.mkt-meta span { color: #33cc66; }

/* Seções */
.mkt-section { padding: 80px 0; }
.mkt-section-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 4px;
  color: #1a3a5c;
  text-transform: uppercase;
  margin-bottom: 12px;
}
.mkt-section-title {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 16px;
  color: #1a1a1a;
}
.mkt-section-title span { color: #1a3a5c; }
.mkt-section-sub {
  font-size: 0.95rem;
  color: #666260;
  max-width: 600px;
  margin-bottom: 48px;
  line-height: 1.7;
}

/* Steps */
.mkt-border-b { border-bottom: 1px solid #e8e0d0; }
.mkt-steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
.mkt-step {
  border: 1px solid #d4d0c8;
  padding: 24px;
  background: #f0ebe0;
}
.mkt-step .mkt-num {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 2rem;
  font-weight: 700;
  color: #1a3a5c;
  opacity: 0.3;
  line-height: 1;
  margin-bottom: 8px;
}
.mkt-step h4 { font-size: 0.85rem; font-weight: 600; margin-bottom: 8px; color: #1a1a1a; }
.mkt-step p { font-size: 0.8rem; color: #666260; line-height: 1.5; }

/* Modules */
.mkt-bg-white { background: #ffffff; }
.mkt-module-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  background: #d4d0c8;
  border: 1px solid #d4d0c8;
}
.mkt-module-item {
  background: #f0ebe0;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.mkt-module-item .mkt-icon { font-size: 1.5rem; margin-bottom: 4px; }
.mkt-module-item h4 {
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #1a1a1a;
}
.mkt-module-item p { font-size: 0.75rem; color: #666260; line-height: 1.5; }
.mkt-tag {
  display: inline-block;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.55rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 2px 8px;
  background: #1a3a5c;
  color: #ffffff;
  align-self: flex-start;
  margin-top: 4px;
}
.mkt-tag-green { background: #227744; }

/* Agents */
.mkt-agent-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
.mkt-agent-card {
  border: 1px solid #d4d0c8;
  padding: 28px;
  background: #f0ebe0;
}
.mkt-agent-card h4 {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.75rem;
  font-weight: 600;
  color: #1a3a5c;
  letter-spacing: 1px;
  margin-bottom: 4px;
}
.mkt-agent-card .mkt-role {
  font-size: 0.7rem;
  color: #888480;
  font-family: 'IBM Plex Mono', monospace;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
}
.mkt-agent-card p { font-size: 0.8rem; color: #666260; line-height: 1.6; margin-bottom: 10px; }
.mkt-events { display: flex; flex-wrap: wrap; gap: 6px; }
.mkt-events span {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.55rem;
  letter-spacing: 1px;
  padding: 2px 8px;
  border: 1px solid #d4d0c8;
  color: #888480;
  background: #ffffff;
}

/* Channels */
.mkt-channel-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.mkt-channel-card {
  border: 1px solid #d4d0c8;
  padding: 24px;
  text-align: center;
  background: #f0ebe0;
}
.mkt-channel-card .mkt-icon-big { font-size: 2rem; margin-bottom: 8px; }
.mkt-channel-card h4 { font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
.mkt-channel-card p { font-size: 0.75rem; color: #666260; margin-bottom: 8px; }
.mkt-status {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.55rem;
  letter-spacing: 2px;
  text-transform: uppercase;
}
.mkt-status-on { color: #227744; }
.mkt-status-soon { color: #888480; }

/* Panel */
.mkt-panel-box {
  border: 2px solid #1a1a1a;
  background: #2a2a2a;
  padding: 40px;
}
.mkt-screen {
  background: #1a1a1a;
  border: 1px solid #444;
  padding: 24px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.7rem;
  color: #f5f0e8;
}
.mkt-screen-header {
  display: flex;
  gap: 6px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #333;
}
.mkt-screen-header div { width: 10px; height: 10px; border-radius: 50%; }
.mkt-dot-r { background: #ff5f56; }
.mkt-dot-y { background: #ffbd2e; }
.mkt-dot-g { background: #27c93f; }
.mkt-line {
  display: grid;
  grid-template-columns: 120px 1fr 80px 80px;
  gap: 16px;
  padding: 6px 0;
  border-bottom: 1px solid #222;
}
.mkt-line-h { color: #4a8abc; font-weight: 600; }
.mkt-green { color: #33cc66; }
.mkt-blue { color: #4a8abc; }
.mkt-caption {
  margin-top: 20px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.6rem;
  color: #888480;
  letter-spacing: 1px;
  text-align: center;
}
.mkt-panel-items { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 32px; }
.mkt-panel-items .mkt-item {
  padding: 16px;
  border: 1px solid #d4d0c8;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 10px;
}
.mkt-check { color: #227744; font-weight: 700; }

/* Benefits */
.mkt-bg-black { background: #1a1a1a; }
.mkt-bg-black .mkt-section-title { color: #ffffff; }
.mkt-bg-black .mkt-section-title span { color: #4a8abc; }
.mkt-bg-black .mkt-section-sub { color: #888480; }
.mkt-bg-black .mkt-section-label { color: #4a8abc; }
.mkt-benefits-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.mkt-benefit-item {
  border: 1px solid #333;
  padding: 28px;
}
.mkt-benefit-item .mkt-num-lg {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a3a5c;
  opacity: 0.4;
  line-height: 1;
  margin-bottom: 12px;
}
.mkt-benefit-item h4 { font-size: 0.85rem; font-weight: 600; margin-bottom: 8px; color: #ffffff; }
.mkt-benefit-item p { font-size: 0.78rem; color: #888480; line-height: 1.6; }

/* Cases */
.mkt-cases-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2px;
  background: #d4d0c8;
  border: 1px solid #d4d0c8;
}
.mkt-case-item { background: #f0ebe0; padding: 32px; }
.mkt-case-item h4 { font-size: 0.85rem; font-weight: 600; margin-bottom: 8px; }
.mkt-case-item p { font-size: 0.78rem; color: #666260; line-height: 1.6; }

/* CTA Final */
.mkt-cta-final {
  padding: 100px 0;
  background: #1a1a1a;
  text-align: center;
  border-bottom: 4px solid #1a3a5c;
}
.mkt-cta-final h2 { font-size: 2.5rem; font-weight: 700; color: #ffffff; margin-bottom: 16px; }
.mkt-cta-final h2 span { color: #4a8abc; }
.mkt-cta-final p { font-size: 1rem; color: #888480; max-width: 500px; margin: 0 auto 36px; }
.mkt-btn-group { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }

/* Footer */
.mkt-footer {
  background: #2a2a2a;
  padding: 30px 0;
  text-align: center;
  border-top: 1px solid #444;
}
.mkt-footer p {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.6rem;
  color: #888480;
  letter-spacing: 1px;
}
.mkt-footer p em { color: #33cc66; font-style: normal; }

/* Responsivo */
@media (max-width: 900px) {
  .mkt-steps { grid-template-columns: repeat(2, 1fr); }
  .mkt-module-grid { grid-template-columns: repeat(2, 1fr); }
  .mkt-agent-grid { grid-template-columns: 1fr; }
  .mkt-channel-grid { grid-template-columns: 1fr; }
  .mkt-benefits-grid { grid-template-columns: 1fr; }
  .mkt-cases-grid { grid-template-columns: 1fr; }
  .mkt-panel-items { grid-template-columns: 1fr; }
  .mkt-hero h1 { font-size: 2.2rem; }
}
@media (max-width: 600px) {
  .mkt-steps { grid-template-columns: 1fr; }
  .mkt-module-grid { grid-template-columns: 1fr; }
  .mkt-topbar nav { display: none; }
  .mkt-hero h1 { font-size: 1.8rem; }
  .mkt-meta { flex-direction: column; gap: 8px; }
  .mkt-container { padding: 0 20px; }
  .mkt-section { padding: 50px 0; }
  .mkt-panel-box { padding: 16px; }
  .mkt-line { grid-template-columns: 1fr; font-size: 0.6rem; gap: 2px; }
  .mkt-line-h { display: none; }
  .mkt-cta-final h2 { font-size: 1.8rem; }
}
`;

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
      <style>{styles}</style>
      <div className="mkt-body">

        {/* Top Bar */}
        <div className="mkt-topbar">
          <div className="mkt-container">
            <a href="/" className="mkt-logo">[ <em>◆</em> ] marketing <em>os</em></a>
            <nav>
              <a href="#como-funciona">[como funciona]</a>
              <a href="#modulos">[módulos]</a>
              <a href="#agentes">[agentes]</a>
              <a href="#beneficios">[benefícios]</a>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <div className="mkt-hero">
          <div className="mkt-container">
            <div className="mkt-badge">◆ marketing os v1.0</div>
            <h1>O Sistema Operacional<span>do seu Marketing.</span></h1>
            <p>Campanhas, leads, canais e operações funcionando em um único sistema. Tudo orquestrado por agentes especializados que trabalham 24 horas por dia.</p>
            <div className="mkt-cta-group">
              <a href="#modulos" className="mkt-btn mkt-btn-primary">Conhecer o Sistema</a>
              <a href="https://wa.me/5544984198075?text=Quero%20testar%20Marketing%20OS" className="mkt-btn mkt-btn-outline" target="_blank" rel="noopener noreferrer">Falar com Consultor →</a>
            </div>
            <div className="mkt-meta">
              <div>google ads <span>●</span> meta ads <span>●</span> whatsapp</div>
              <div>6 agentes especializados</div>
            </div>
          </div>
        </div>

        {/* Como Funciona */}
        <div className="mkt-section mkt-border-b" id="como-funciona">
          <div className="mkt-container">
            <div className="mkt-section-label">◆ fluxo operacional</div>
            <h2 className="mkt-section-title">Como o <span>Sistema</span> funciona</h2>
            <p className="mkt-section-sub">Cada ação de marketing entra como um evento. O sistema roteia para o agente certo, que analisa, decide e executa — tudo em ciclo contínuo.</p>
            <div className="mkt-steps">
              <div className="mkt-step">
                <div className="mkt-num">01</div>
                <h4>Evento entra</h4>
                <p>Lead novo, campanha criada, mensagem enviada — tudo vira um evento no barramento central.</p>
              </div>
              <div className="mkt-step">
                <div className="mkt-num">02</div>
                <h4>Supervisor roteia</h4>
                <p>O supervisor identifica o tipo de evento e encaminha para o especialista correto.</p>
              </div>
              <div className="mkt-step">
                <div className="mkt-num">03</div>
                <h4>Agente processa</h4>
                <p>Cada especialista analisa o contexto, toma decisões e coordena a execução.</p>
              </div>
              <div className="mkt-step">
                <div className="mkt-num">04</div>
                <h4>Ação executada</h4>
                <p>O resultado é publicado como novo evento — fechando o ciclo e gerando métricas.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Módulos */}
        <div className="mkt-section mkt-bg-white mkt-border-b" id="modulos">
          <div className="mkt-container">
            <div className="mkt-section-label">◆ módulos do sistema</div>
            <h2 className="mkt-section-title">Tudo em <span>um só lugar</span></h2>
            <p className="mkt-section-sub">Seis módulos que cobrem o ciclo completo do marketing operacional.</p>
            <div className="mkt-module-grid">
              {[
                { icon: "📊", title: "Campanhas", desc: "Criação, agendamento, execução e relatórios de campanhas multicanal.", tag: "ativo", green: false },
                { icon: "👤", title: "Contatos", desc: "Gestão de leads, segmentação por estágio do funil, histórico de interações.", tag: "ativo", green: false },
                { icon: "📨", title: "Canais", desc: "WhatsApp integrado. Email e SMS prontos para ativar.", tag: "ativo", green: false },
                { icon: "📈", title: "Anúncios", desc: "Google Ads e Meta Ads conectados via OAuth. Dashboard com métricas e alertas.", tag: "ativo", green: false },
                { icon: "🧠", title: "Agentes IA", desc: "Especialistas que analisam métricas, tomam decisões e sugerem otimizações.", tag: "internal", green: true },
                { icon: "📋", title: "Relatórios", desc: "Eventos, métricas, alertas automáticos e exportação CSV/PDF.", tag: "ativo", green: false },
              ].map((mod) => (
                <div className="mkt-module-item" key={mod.title}>
                  <div className="mkt-icon">{mod.icon}</div>
                  <h4>{mod.title}</h4>
                  <p>{mod.desc}</p>
                  <span className={`mkt-tag ${mod.green ? 'mkt-tag-green' : ''}`}>{mod.tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Agentes */}
        <div className="mkt-section mkt-border-b" id="agentes">
          <div className="mkt-container">
            <div className="mkt-section-label">◆ agentes especializados</div>
            <h2 className="mkt-section-title">Seis especialistas <span>trabalhando</span></h2>
            <p className="mkt-section-sub">Cada agente cobre um domínio específico. Eles se comunicam por eventos — nenhum depende do outro.</p>
            <div className="mkt-agent-grid">
              {[
                { name: "Campaign Specialist", role: "Analisa e gerencia campanhas", desc: "Valida dados, seleciona audiência, agenda mensagens e coordena a execução multicanal.", events: ["campanha.criada", "campanha.iniciada", "msg.falhou"] },
                { name: "Lead Specialist", role: "Processa novos contatos", desc: "Cadastra leads, atualiza estágio do funil e prepara contatos para campanhas.", events: ["lead.criado", "lead.atualizado"] },
                { name: "Channel Specialist", role: "Gerencia canais de envio", desc: "Roteia mensagens para o canal correto — WhatsApp, Email ou SMS — e monitora entregas.", events: ["msg.enviada", "msg.entregue", "msg.falhou"] },
                { name: "Analytics Specialist", role: "Métricas e relatórios", desc: "Coleta métricas de campanhas, calcula KPIs e alimenta os dashboards em tempo real.", events: ["campanha.concluida", "campanha.falha"] },
                { name: "Optimizer Specialist", role: "Otimização contínua", desc: "Analisa resultados e ajusta lances, orçamentos e segmentação para melhor performance.", events: ["campanha.concluida"] },
                { name: "Pricing Specialist", role: "Análise financeira", desc: "Avalia preços, margens, concorrência e recomenda estratégias de precificação.", events: ["chamada direta"] },
              ].map((ag) => (
                <div className="mkt-agent-card" key={ag.name}>
                  <h4>{ag.name}</h4>
                  <div className="mkt-role">{ag.role}</div>
                  <p>{ag.desc}</p>
                  <div className="mkt-events">
                    {ag.events.map((ev) => <span key={ev}>{ev}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Canais */}
        <div className="mkt-section mkt-bg-white mkt-border-b">
          <div className="mkt-container">
            <div className="mkt-section-label">◆ canais suportados</div>
            <h2 className="mkt-section-title">Conecte seus <span>canais</span></h2>
            <p className="mkt-section-sub">Disparo multicanal com tracking individual e taxa-limite por canal.</p>
            <div className="mkt-channel-grid">
              <div className="mkt-channel-card">
                <div className="mkt-icon-big">💬</div>
                <h4>WhatsApp</h4>
                <p>API oficial integrada. Envio de texto, imagens e templates.</p>
                <div className="mkt-status mkt-status-on">● operacional</div>
              </div>
              <div className="mkt-channel-card">
                <div className="mkt-icon-big">✉️</div>
                <h4>Email</h4>
                <p>Adapter implementado com rate-limiter e tracking de abertura.</p>
                <div className="mkt-status mkt-status-on">● operacional</div>
              </div>
              <div className="mkt-channel-card">
                <div className="mkt-icon-big">📱</div>
                <h4>SMS</h4>
                <p>Infraestrutura pronta. Adapter, rate-limiter e tracker.</p>
                <div className="mkt-status mkt-status-soon">○ em breve</div>
              </div>
            </div>
          </div>
        </div>

        {/* Painel */}
        <div className="mkt-section mkt-border-b">
          <div className="mkt-container">
            <div className="mkt-section-label">◆ painel de controle</div>
            <h2 className="mkt-section-title">Visão completa <span>em tempo real</span></h2>
            <p className="mkt-section-sub">Acompanhe campanhas, métricas de anúncios e operações em um único dashboard.</p>
            <div className="mkt-panel-box">
              <div className="mkt-screen">
                <div className="mkt-screen-header">
                  <div className="mkt-dot-r"></div>
                  <div className="mkt-dot-y"></div>
                  <div className="mkt-dot-g"></div>
                </div>
                <div className="mkt-line mkt-line-h">
                  <span>campanha</span>
                  <span>status</span>
                  <span>gasto</span>
                  <span>roas</span>
                </div>
                <div className="mkt-line">
                  <span className="mkt-blue">carros usados — search</span>
                  <span className="mkt-green">● ativa</span>
                  <span>R$ 4.320</span>
                  <span>3.2x</span>
                </div>
                <div className="mkt-line">
                  <span className="mkt-blue">pneus promo — shopping</span>
                  <span className="mkt-green">● ativa</span>
                  <span>R$ 2.180</span>
                  <span>4.7x</span>
                </div>
                <div className="mkt-line">
                  <span className="mkt-blue">ofertas julho — display</span>
                  <span>○ pausada</span>
                  <span>R$ 890</span>
                  <span>1.8x</span>
                </div>
                <div className="mkt-line">
                  <span className="mkt-blue">lançamento — meta ads</span>
                  <span className="mkt-green">● ativa</span>
                  <span>R$ 1.540</span>
                  <span>2.9x</span>
                </div>
              </div>
              <div className="mkt-caption">dashboard — google ads + meta ads (dados simulados para demonstração)</div>
            </div>
            <div className="mkt-panel-items">
              <div className="mkt-item"><span className="mkt-check">✔</span> Gráficos de gasto, ROAS, CTR, CPC</div>
              <div className="mkt-item"><span className="mkt-check">✔</span> Alertas automáticos de baixo ROAS e CPA alto</div>
              <div className="mkt-item"><span className="mkt-check">✔</span> Comparação com período anterior</div>
              <div className="mkt-item"><span className="mkt-check">✔</span> Exportação CSV e PDF</div>
            </div>
          </div>
        </div>

        {/* Benefícios */}
        <div className="mkt-section mkt-bg-black" id="beneficios">
          <div className="mkt-container">
            <div className="mkt-section-label">◆ por que marketing os</div>
            <h2 className="mkt-section-title">Organização. <span>Controle. Execução.</span></h2>
            <p className="mkt-section-sub">Não é mais uma ferramenta de IA. É a infraestrutura que o seu marketing precisava.</p>
            <div className="mkt-benefits-grid">
              {[
                { num: "01", title: "Um sistema, todos os canais", desc: "Google Ads, Meta Ads, WhatsApp, Email — tudo gerenciado de um único lugar." },
                { num: "02", title: "Agentes que nunca dormem", desc: "Enquanto você opera o negócio, os agentes monitoram métricas e mantêm campanhas no ar." },
                { num: "03", title: "Decisões baseadas em dados", desc: "Cada ação vira um evento. Cada evento gera métrica. Cada métrica alimenta a próxima decisão." },
                { num: "04", title: "Arquitetura que escala", desc: "Componentes desacoplados, barramento de eventos, agentes independentes." },
                { num: "05", title: "Conectado com as plataformas", desc: "OAuth com Google e Meta. API do WhatsApp. Pronto para Mercado Livre e Shopee." },
                { num: "06", title: "Feito para PMEs", desc: "Complexidade técnica abstraída. Configure em minutos, não em dias." },
              ].map((ben) => (
                <div className="mkt-benefit-item" key={ben.num}>
                  <div className="mkt-num-lg">{ben.num}</div>
                  <h4>{ben.title}</h4>
                  <p>{ben.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Casos de Uso */}
        <div className="mkt-section mkt-border-b">
          <div className="mkt-container">
            <div className="mkt-section-label">◆ casos de uso</div>
            <h2 className="mkt-section-title">Para quem o <span>Sistema</span> foi feito</h2>
            <p className="mkt-section-sub">Empresas que precisam organizar o marketing operacional sem depender de plataformas desconectadas.</p>
            <div className="mkt-cases-grid">
              <div className="mkt-case-item">
                <h4>Loja que anuncia no Google e Facebook</h4>
                <p>Unifica campanhas, métricas e orçamento em um dashboard só. Sem planilha, sem login em dois lugares.</p>
              </div>
              <div className="mkt-case-item">
                <h4>Prestador de serviços com captação de leads</h4>
                <p>Lead chega → agente processa → campanha dispara → funil avança. Tudo automático.</p>
              </div>
              <div className="mkt-case-item">
                <h4>Agência que gerencia múltiplos clientes</h4>
                <p>Contas separadas por cliente. Relatórios automáticos. Visão consolidada ou individual.</p>
              </div>
              <div className="mkt-case-item">
                <h4>E-commerce que opera em marketplaces</h4>
                <p>Análise de preços, concorrência e margens. Decisão de precificação assistida por agente.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div className="mkt-cta-final">
          <div className="mkt-container">
            <h2>Pronto para <span>organizar</span> seu marketing?</h2>
            <p>Teste grátis por 7 dias. Sem compromisso. Sem cartão de crédito.</p>
            <div className="mkt-btn-group">
              <a href="https://wa.me/5544984198075?text=Quero%20testar%20Marketing%20OS" className="mkt-btn mkt-btn-primary" target="_blank" rel="noopener noreferrer">Testar Grátis →</a>
              <a href="https://marketing.linikers.cloud" className="mkt-btn mkt-btn-outline" style={{ color: '#888480', borderColor: '#888480' }}>Acessar Dashboard</a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mkt-footer">
          <div className="mkt-container">
            <p>root@linikers:~$ <em>◆</em> echo &quot;marketing os — sistema operacional do marketing&quot;<br />© 2026 LinikerS &nbsp;|&nbsp; built with next.js + prisma + postgresql</p>
          </div>
        </div>

      </div>
    </>
  );
}
