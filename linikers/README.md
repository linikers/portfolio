# LinikerS.dev — Portfólio & Hub Pessoal

Portfólio interativo + plataforma de ferramentas com IA, loja de prompts, blog, painel admin e marketing.

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js 13.4 (Pages Router) |
| Linguagem | TypeScript |
| UI | MUI v6 + Tailwind CSS + SCSS |
| Animações | Framer Motion + GSAP |
| Autenticação | Firebase Auth (email/senha + Google) |
| Banco | Firestore (via Firebase Admin) |
| Estado | Zustand |
| IA | Groq (Llama 3.3 70B) + Gemini 1.5 Flash (fallback) |
| Analytics | Firebase Analytics |
| Pagamento | (futuro) |

## Funcionalidades

### Páginas Públicas
- **Home** — Tela de boot retrô com animação em canvas + terminal sequencial
- **Projetos** — Portfólio de projetos com cards e links
- **Ferramentas** — Carrossel infinito com tecnologias dominadas
- **Blog** — Posts em markdown com renderização SSR
- **Loja de Prompts** — Catálogo de prompts com busca, filtros e SSR via Firestore
- **Contato** — WhatsApp + redes sociais
- **Perfil** — Página pessoal com integração Pinterest

### Painel Admin (`/admin/dashboard`)
- **Dashboard** — Visão geral com gráficos e atalhos
- **Gerador de Prompts** — Cria prompts com IA (Groq → Gemini fallback) e publica na loja
- **Propaganda & Marketing** — CRUD de posts, calendário de conteúdo, campanhas pagas
- **Cotação** — Painel com BTC, USD, EUR em tempo real (AwesomeAPI)

## Estrutura

```
linikers/
├── src/
│   ├── components/       # Componentes reutilizáveis
│   ├── pages/            # Rotas Next.js (Pages Router)
│   │   ├── admin/        # Painel administrativo
│   │   ├── api/          # API routes
│   │   ├── loja/         # Loja de prompts
│   │   └── components/   # Componentes de página (backgroundDesk, animatedPage)
│   ├── lib/              # Firebase, IA, utilitários
│   ├── store/            # Zustand stores
│   ├── styles/           # Estilos globais
│   ├── types/            # Tipos TypeScript
│   └── config/           # Configurações (Firebase client)
├── public/               # Assets estáticos
└── docs/                 # Documentação
```

## Desenvolvimento

```bash
yarn dev        # Inicia dev server
yarn build      # Build de produção
yarn start      # Inicia produção
yarn lint       # Linter
```

## Variáveis de Ambiente

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
FIREBASE_PROJECT_ID=

# IA
GROQ_API_KEY=
GEMINI_API_KEY=

# Cloudinary
CLOUDINARY_URL=
```

## Deploy

Automatizado via Vercel — pushes na branch principal disparam deploy.
