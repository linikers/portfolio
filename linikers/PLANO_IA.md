# Linikers — Plano de Expansão com IA

> **Documentação Técnica v2.0** | Stack: Next.js 13 (Pages Router) · TypeScript · React · Node.js | Fevereiro 2025

---

## Sumário

1. [Visão Geral](#1-visão-geral)
2. [Módulos do Projeto](#2-módulos-do-projeto)
3. [Stack Técnica](#3-stack-técnica)
4. [APIs de Inteligência Artificial](#4-apis-de-inteligência-artificial)
5. [Estrutura de Arquivos](#5-estrutura-de-arquivos)
6. [Variáveis de Ambiente](#6-variáveis-de-ambiente)
7. [Cronograma de Implantação](#7-cronograma-de-implantação)
8. [Modelo de Dados (Firestore)](#8-modelo-de-dados-firestore)
9. [Prompts para Iniciar a Implantação](#9-prompts-para-iniciar-a-implantação)
10. [Análise de Custos](#10-análise-de-custos)
11. [Próximos Passos Imediatos](#11-próximos-passos-imediatos)

---

## 1. Visão Geral

Este documento descreve o planejamento completo para expandir o portfólio Linikers com dois novos módulos principais: um **Gerador de Prompts** com fluxo de venda integrado e um **Gerenciador de Propaganda com IA**. Ambos os módulos serão construídos sobre a base existente do projeto e utilizarão as APIs gratuitas do Groq e Google Gemini como motores de IA.

> [!IMPORTANT]
> O projeto utiliza **Next.js 13 com Pages Router** (`src/pages/`), **não** App Router (`src/app/`).
> Todo o plano foi adaptado para essa arquitetura. As API Routes ficam em `src/pages/api/` e as páginas em `src/pages/`.

### Objetivos estratégicos

- Monetizar o portfólio existente através de venda de prompts digitais
- Criar um painel de gerenciamento de publicações em redes sociais
- Automatizar a criação de copies e conteúdos com IA
- Manter infraestrutura 100% gratuita (Vercel + Firebase + APIs free tier)

---

## 2. Módulos do Projeto

### 2.1 Módulo A — Gerador de Prompts

O Gerador de Prompts é uma ferramenta interativa onde o usuário preenche parâmetros (objetivo, tom, plataforma, nicho) e a IA gera um prompt otimizado. O fluxo inclui uma tela de teste/validação e, ao aprovar, o usuário pode publicar diretamente na loja do site.

#### Fluxo de Telas

1. **Configuração** — selecionar categoria, plataforma alvo, tom de voz, idioma
2. **Geração** — input de contexto + resultado gerado pela IA (Groq/Gemini)
3. **Preview/Teste** — testar o prompt na própria interface com ajustes
4. **Publicação na Loja** — definir título, descrição, preço e publicar
5. **Página da Loja** — listagem pública com filtros, busca e botão de compra

#### Funcionalidades Técnicas

- Geração via Groq API (Llama 3.3 70B) com Gemini 1.5 Flash como fallback
- Histórico de prompts gerados (Firebase Firestore)
- Sistema de categorias e tags para organização
- Preview com markdown rendering
- Integração com sistema de autenticação já existente (Firebase Auth — `src/config/firebaseClient.ts`)
- Webhook para notificação de nova venda (via API Route do Next.js em `src/pages/api/`)

---

### 2.2 Módulo B — Gerenciador de Propaganda com IA

Painel centralizado para criação, agendamento e monitoramento de publicações em múltiplas redes sociais. A IA auxilia na geração de copies, sugestão de hashtags, melhores horários e criação de variações A/B.

#### Telas Principais

1. **Dashboard** — resumo de publicações ativas, agendadas, métricas e alertas
2. **Criar Publicação** — editor com assistente IA para gerar copy por rede social
3. **Calendário de Conteúdo** — visão mensal/semanal de publicações agendadas
4. **Publicações Pagas** — gerenciar campanhas, budget, público-alvo e status
5. **Análise de Performance** — CTR, impressões, cliques (dados manuais ou via API)
6. **Configurações** — conectar contas de redes sociais, tokens de API

#### Redes Sociais Suportadas (Fase 1)

- **Instagram** — geração de copy + hashtags + sugestão de horário
- **LinkedIn** — copy profissional com tom corporativo
- **WhatsApp Business** — mensagens de campanha
- **X (Twitter)** — threads e tweets otimizados

---

## 3. Stack Técnica

### 3.1 Tecnologias Existentes (Já Instaladas)

| Tecnologia        | Versão  | Uso                                                      |
| ----------------- | ------- | -------------------------------------------------------- |
| Next.js           | 13.4.3  | Framework principal, **Pages Router**, API Routes        |
| TypeScript        | 5.0.4   | Tipagem em todo o projeto                                |
| React             | 18.2.0  | Interface dos módulos                                    |
| Firebase          | ^11.1.0 | Auth + Firestore (banco de dados)                        |
| Firebase Admin    | ^13.0.1 | Operações server-side (`getServerSideProps`, API Routes) |
| Tailwind CSS      | ^3.4.14 | Estilização (já configurado)                             |
| MUI (Material UI) | ^6.1.1  | Componentes UI (já usado no login, admin)                |
| Formik            | ^2.4.6  | Formulários (já usado no login)                          |
| Yup               | ^1.4.0  | Validação de schemas (já usado no login)                 |
| Framer Motion     | ^11.5.5 | Animações de UI                                          |
| Axios             | ^1.7.7  | Chamadas HTTP para APIs de IA                            |
| react-icons       | ^4.9.0  | Ícones (já instalado)                                    |
| GSAP              | ^3.13.0 | Animações avançadas                                      |
| Chart.js          | ^4.4.6  | Gráficos (já instalado, usar no dashboard)               |
| react-chartjs-2   | ^5.2.0  | Wrapper React para Chart.js                              |
| SASS              | ^1.62.1 | Estilos globais (`globals.scss`)                         |
| Vercel            | —       | Deploy e hosting                                         |

### 3.2 Novas Dependências a Instalar

```bash
yarn add @groq-sdk @google/generative-ai zustand date-fns react-big-calendar react-markdown
```

> [!NOTE]
> **Removidos da lista original:** `react-hook-form` (o projeto já usa `formik`), `zod` (o projeto já usa `yup`), `lucide-react` (o projeto já usa `react-icons` e `@mui/icons-material`).

| Pacote                  | Finalidade                          | Custo    |
| ----------------------- | ----------------------------------- | -------- |
| `@groq-sdk`             | Client oficial Groq API (Llama 3.3) | Gratuito |
| `@google/generative-ai` | Gemini 1.5 Flash fallback           | Gratuito |
| `zustand`               | Estado global dos módulos           | Gratuito |
| `date-fns`              | Manipulação de datas no calendário  | Gratuito |
| `react-big-calendar`    | Componente de calendário            | Gratuito |
| `react-markdown`        | Renderizar preview dos prompts      | Gratuito |

---

## 4. APIs de Inteligência Artificial

### 4.1 Groq API (Principal)

A Groq é a IA principal do projeto por oferecer inferência extremamente rápida (LPU) com modelos de alta qualidade. O free tier é generoso e suficiente para uso pessoal e de pequeno negócio.

- **Modelo recomendado:** `llama-3.3-70b-versatile`
- **Free tier:** 14.400 requisições/dia, 6.000 tokens/minuto
- **Latência média:** 0.3–0.8 segundos por resposta
- **Cadastro:** [console.groq.com](https://console.groq.com) → Settings > API Keys

### 4.2 Google Gemini API (Fallback)

O Gemini atua como fallback quando o Groq atinge limite de taxa. Também é útil para tarefas que exigem contexto maior (janela de 1M tokens).

- **Modelo recomendado:** `gemini-1.5-flash`
- **Free tier:** 1.500 requisições/dia, 1M tokens por requisição
- **Cadastro:** [aistudio.google.com](https://aistudio.google.com) → Get API Key

### 4.3 Estratégia de Contexto Global

Um contexto global será mantido via variáveis de ambiente e injetado em todas as chamadas de IA para manter consistência de marca e tom:

- Nome do produto, nicho e persona do usuário-alvo
- Tom de voz preferido (profissional, descontraído, técnico)
- Idioma padrão e idiomas suportados
- Exemplos de outputs aprovados (few-shot learning)

---

## 5. Estrutura de Arquivos

> [!IMPORTANT]
> O projeto usa **Pages Router**. Todas as páginas ficam em `src/pages/` e as API Routes em `src/pages/api/`. Componentes ficam em `src/components/`.

Novos diretórios e arquivos a criar dentro da estrutura existente:

```
src/
├── pages/
│   ├── _app.jsx                         # ✅ Já existe (entry point)
│   ├── _document.jsx                    # ✅ Já existe
│   ├── login.tsx                        # ✅ Já existe (Firebase Auth)
│   ├── admin/
│   │   ├── dashboard/                   # ✅ Já existe
│   │   │   ├── index.tsx
│   │   │   ├── painelCotacao.tsx
│   │   │   └── prices.tsx
│   │   ├── gerador/                     # 🆕 Módulo Gerador de Prompts
│   │   │   ├── index.tsx                # Configuração do gerador
│   │   │   ├── resultado.tsx            # Preview + publicar na loja
│   │   │   └── historico.tsx            # Prompts criados
│   │   └── propaganda/                  # 🆕 Módulo Propaganda
│   │       ├── index.tsx                # Dashboard Propaganda
│   │       ├── criar.tsx                # Editor com IA
│   │       ├── calendario.tsx           # Calendário de conteúdo
│   │       └── pagas.tsx                # Campanhas pagas
│   ├── loja/                            # 🆕 Loja pública de Prompts
│   │   ├── index.tsx                    # Listagem pública da loja
│   │   └── [id].tsx                     # Detalhe do prompt
│   └── api/
│       ├── pinterest.js                 # ✅ Já existe
│       ├── ia/                          # 🆕 Endpoints de IA
│       │   ├── gerar-prompt.ts          # POST: gerar prompt com Groq/Gemini
│       │   └── gerar-copy.ts            # POST: copy otimizado por rede social
│       ├── loja/
│       │   └── prompts.ts               # GET/POST: CRUD prompts da loja
│       └── propaganda/
│           └── posts.ts                 # GET/POST: CRUD publicações
├── components/
│   ├── menu.tsx                         # ✅ Já existe
│   ├── logo.tsx                         # ✅ Já existe
│   ├── gerador/                         # 🆕 Componentes do gerador
│   │   ├── FormGerador.tsx              # Formulário com Formik + Yup
│   │   ├── PromptPreview.tsx            # Preview com react-markdown
│   │   ├── PublicarModal.tsx            # Modal de publicação na loja
│   │   └── HistoricoList.tsx            # Lista de prompts criados
│   ├── loja/                            # 🆕 Componentes da loja
│   │   ├── PromptCard.tsx               # Card do prompt na loja
│   │   ├── LojaFilters.tsx              # Filtros e busca
│   │   └── ComprarModal.tsx             # Modal de compra/Pix
│   └── propaganda/                      # 🆕 Componentes do gerenciador
│       ├── PropagandaDashboard.tsx       # Dashboard com Chart.js
│       ├── EditorPublicacao.tsx          # Editor com assistente IA
│       ├── CalendarioConteudo.tsx        # Calendário react-big-calendar
│       └── CampanhasPagas.tsx           # Tabela de campanhas
├── lib/                                 # 🆕 Novo diretório
│   └── ia/
│       ├── groq.ts                      # Client Groq + generateText()
│       ├── gemini.ts                    # Client Gemini (fallback)
│       └── context.ts                   # Contexto global da IA
├── store/                               # 🆕 Novo diretório (Zustand)
│   ├── gerador.store.ts                 # Estado do gerador
│   └── propaganda.store.ts              # Estado do gerenciador
├── config/
│   └── firebaseClient.ts               # ✅ Já existe (Firebase init)
├── utils/
│   ├── animatedPage/                    # ✅ Já existe
│   └── retroSFX.ts                      # ✅ Já existe
└── styles/
    └── globals.scss                     # ✅ Já existe
```

---

## 6. Variáveis de Ambiente

Adicionar ao `.env.local` (que já existe) e configurar no painel do Vercel em **Settings > Environment Variables**:

```env
# ──────────────────────────────
# ✅ Já existentes (NÃO ALTERAR)
# ──────────────────────────────
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
NEXTAUTH_URL=...
NEXTAUTH_SECRET=...
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_API_KEY_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=...

# ──────────────────────────────
# 🆕 Novas variáveis (ADICIONAR)
# ──────────────────────────────

# IAs
GROQ_API_KEY=gsk_xxxxxxxxxxxx
GEMINI_API_KEY=AIzaSyxxxxxxxx

# Contexto Global da IA
IA_BRAND_CONTEXT="Linikers - portfólio e produtos digitais"
IA_DEFAULT_LANG=pt-BR
IA_TONE=profissional-descontraido

# Loja
NEXT_PUBLIC_PIX_KEY=seu@email.com
```

---

## 7. Cronograma de Implantação

| Fase                              | Duração          | Entregas                                                                                                  |
| --------------------------------- | ---------------- | --------------------------------------------------------------------------------------------------------- |
| **Fase 1** — Setup & IA Core      | 3–4 dias         | Instalar deps, configurar Groq/Gemini, `src/lib/ia/*`, rotas `src/pages/api/ia/*`                         |
| **Fase 2** — Gerador de Prompts   | 5–7 dias         | Telas em `src/pages/admin/gerador/`, componentes em `src/components/gerador/`. Formulários com Formik+Yup |
| **Fase 3** — Loja de Prompts      | 3–4 dias         | CRUD da loja, página pública `src/pages/loja/`, componentes de card e filtro                              |
| **Fase 4** — Dashboard Propaganda | 4–5 dias         | Dashboard com Chart.js, criar publicação com IA, visualização por rede social                             |
| **Fase 5** — Calendário & Pagas   | 4–5 dias         | Calendário de conteúdo com react-big-calendar, tela de campanhas pagas                                    |
| **Fase 6** — Testes & Deploy      | 2–3 dias         | Testes E2E, ajustes de UI, variáveis no Vercel, deploy final                                              |
| **Total estimado**                | **~3–4 semanas** |                                                                                                           |

---

## 8. Modelo de Dados (Firestore)

### Collection: `prompts`

| Campo         | Tipo        | Descrição                                                    |
| ------------- | ----------- | ------------------------------------------------------------ |
| `id`          | `string`    | Auto-gerado pelo Firestore                                   |
| `title`       | `string`    | Título do prompt na loja                                     |
| `description` | `string`    | Descrição pública                                            |
| `content`     | `string`    | O prompt completo gerado                                     |
| `category`    | `string`    | `marketing` \| `copywriting` \| `seo` \| `social` \| `outro` |
| `platform`    | `string`    | `instagram` \| `linkedin` \| `geral` \| `chatgpt` \| etc     |
| `price`       | `number`    | Preço em R$ (0 = gratuito)                                   |
| `published`   | `boolean`   | `true` = visível na loja                                     |
| `createdAt`   | `timestamp` | Data de criação                                              |
| `uid`         | `string`    | ID do usuário criador (Firebase Auth)                        |

### Collection: `posts` (Propaganda)

| Campo            | Tipo        | Descrição                                         |
| ---------------- | ----------- | ------------------------------------------------- |
| `id`             | `string`    | Auto-gerado                                       |
| `content`        | `string`    | Texto da publicação                               |
| `platform`       | `string[]`  | Redes sociais alvo                                |
| `scheduledAt`    | `timestamp` | Data/hora agendada                                |
| `status`         | `string`    | `draft` \| `scheduled` \| `published` \| `paused` |
| `isPaid`         | `boolean`   | Se é publicação paga/patrocinada                  |
| `budget`         | `number`    | Budget da campanha paga (opcional)                |
| `targetAudience` | `string`    | Descrição do público-alvo                         |
| `aiGenerated`    | `boolean`   | Se o conteúdo foi gerado por IA                   |
| `uid`            | `string`    | ID do usuário                                     |

---

## 9. Prompts para Iniciar a Implantação

Use os prompts abaixo em sequência com Claude, Cursor, ou qualquer assistente de código.

> [!IMPORTANT]
> **Contexto base de todos os prompts** — não repita isso manualmente, cada prompt já inclui:
>
> - Next.js 13.4.3 · **Pages Router** · TypeScript 5 strict
> - Formulários: **Formik** ^2.4.6 + **Yup** ^1.4.0
> - UI: **MUI** ^6.1.1 + **Tailwind CSS** ^3.4.14
> - Ícones: **react-icons** ^4.9.0 + **@mui/icons-material** ^6.1.1
> - Gráficos: **Chart.js** ^4.4.6 + **react-chartjs-2** ^5.2.0
> - Firebase Auth/Firestore inicializados em `src/config/firebaseClient.ts` (exporta `auth`, `db`)
> - Gerenciador de pacotes: **yarn**
> - Entry point: `src/pages/_app.jsx`

---

### 🤖 PROMPT 1 — Setup da IA e Contexto Global

```
## Contexto

Projeto Next.js 13.4.3 com Pages Router, TypeScript strict, deploy no Vercel.
Gerenciador de pacotes: yarn. Firebase já configurado em src/config/firebaseClient.ts.

## Objetivo

Implementar a camada de abstração de IA com dois providers (Groq como principal,
Gemini como fallback automático) e expor via API Routes.

## Arquivos a criar

### 1. src/lib/ia/groq.ts
- Instanciar client @groq-sdk com env var GROQ_API_KEY.
- Exportar `generateText(prompt: string, systemPrompt?: string): Promise<string>`.
- Modelo: `llama-3.3-70b-versatile`. Temperature: 0.7. Max tokens: 2048.
- Em caso de erro (rate limit, timeout, exceptions), chamar automaticamente
  o fallback em gemini.ts e logar o erro com console.warn.

### 2. src/lib/ia/gemini.ts
- Instanciar client @google/generative-ai com env var GEMINI_API_KEY.
- Exportar a mesma interface `generateText(prompt, systemPrompt?)` com modelo
  `gemini-1.5-flash`. Deve ser intercambiável com groq.ts.

### 3. src/lib/ia/context.ts
- Exportar `getSystemPrompt(): string` — prompt de sistema com: marca (Linikers),
  tom (profissional-descontraído), idioma (pt-BR), nicho (portfólio/produtos digitais).
- Ler de env vars: IA_BRAND_CONTEXT, IA_DEFAULT_LANG, IA_TONE.
- Exportar também interface `IARequestConfig` e `IAResponse`.

### 4. src/pages/api/ia/gerar-prompt.ts
- API Route POST. Signature: `handler(req: NextApiRequest, res: NextApiResponse)`.
- Body esperado: `{ categoria: string, plataforma: string, objetivo: string, tom: string }`.
- Validar body. Chamar generateText() injetando getSystemPrompt().
- Responder 200 com `{ prompt: string }` ou 400/500 com `{ error: string }`.

### 5. src/pages/api/ia/gerar-copy.ts
- Mesmo padrão. Body: `{ rede: string, assunto: string, tom: string, cta: string }`.
- O system prompt deve incluir boas práticas de copy para a rede específica
  (limites de caracteres, uso de hashtags, etc).
- Responder 200 com `{ copy: string }` ou 400/500 com `{ error: string }`.

## Restrições

- TypeScript strict: sem `any`, interfaces explícitas para request/response.
- Apenas `export default async function handler` — padrão Pages Router.
- NÃO instalar dependências além de @groq-sdk e @google/generative-ai (usar yarn add).
- NÃO alterar arquivos existentes.
```

Fase 1 concluída! ✅ IA Abstraction Layer implementada com sucesso.

5 arquivos criados, yarn tsc --noEmit compila com zero erros, nenhum arquivo existente alterado.

Próximo passo para testar:
Adicione as env vars GROQ_API_KEY e GEMINI_API_KEY no .env.local e rode yarn dev. Os endpoints estarão disponíveis em:

POST /api/ia/gerar-prompt — gera prompts otimizados
POST /api/ia/gerar-copy — gera copy por rede social (instagram, linkedin, x, whatsapp)

---

### 🤖 PROMPT 2 — Gerador de Prompts (Telas Completas)

```
## Contexto

Projeto Next.js 13 Pages Router · TypeScript strict · MUI ^6 + Tailwind · Formik + Yup ·
Firebase Auth/Firestore em src/config/firebaseClient.ts · yarn.
A camada de IA já está implementada em src/lib/ia/ e os endpoints estão em
src/pages/api/ia/gerar-prompt.ts.

## Objetivo

Criar o módulo completo de Gerador de Prompts com 3 páginas e 4 componentes.

## Páginas — src/pages/admin/gerador/

### index.tsx (Configuração)
- Formulário Formik com schema Yup.
- Campos: categoria (Select), plataforma alvo (Select), objetivo (TextField multiline),
  tom de voz (RadioGroup), idioma (Select).
- Submit chama `POST /api/ia/gerar-prompt` via Axios.
- Loading: MUI CircularProgress + Skeleton.
- Redirect para `/admin/gerador/resultado` passando dados via query string ou zustand.
- Layout: Tailwind para grid/spacing, MUI para form controls.

### resultado.tsx (Preview)
- Recebe o prompt gerado (query/zustand) e renderiza com react-markdown.
- Ações: "Regenerar" (re-call API), "Copiar" (clipboard API), "Editar" (inline textarea),
  "Publicar na Loja" (abre PublicarModal).
- PublicarModal: MUI Dialog com Formik form (título, descrição, preço R$).
  Salva no Firestore collection `prompts` com { ...dados, published: false, uid, createdAt }.
  Redireciona para `/admin/gerador/historico` via useRouter.

### historico.tsx
- Firestore query: collection `prompts`, where uid == current user, orderBy createdAt desc.
- MUI Table com colunas: título, categoria, data, status (Chip: rascunho/publicado), ações.
- Toggle publicar/despublicar atualiza campo `published` no Firestore.

## API — src/pages/api/loja/prompts.ts
- GET: retorna docs de `prompts` onde published == true. Paginação com limit/offset.
- POST: cria ou atualiza prompt (body com id opcional para update). Firebase Admin SDK.
- Validar body server-side.

## Componentes — src/components/gerador/
- FormGerador.tsx — formulário isolado, recebe onSubmit via props.
- PromptPreview.tsx — markdown renderer com container estilizado.
- PublicarModal.tsx — dialog controlado via props open/onClose.
- HistoricoList.tsx — tabela com dados recebidos via props.

## Restrições

- Sem `any`. Criar interfaces em cada arquivo ou em src/types/ se compartilhadas.
- Usar o hook `auth.currentUser` de src/config/firebaseClient.ts para obter uid.
- Componentes devem ser puros (sem fetching direto). Fetching na page, dados via props.
- NÃO usar App Router, Server Components, ou `route.ts`.
```

---

### 🤖 PROMPT 3 — Loja Pública de Prompts

```
## Contexto

Projeto Next.js 13 Pages Router · TypeScript strict · MUI ^6 + Tailwind · Framer Motion ·
Firebase Admin SDK · yarn. API de prompts já existe em src/pages/api/loja/prompts.ts (GET).

## Objetivo

Criar a vitrine pública da loja de prompts. Área aberta (sem auth).

## Páginas — src/pages/loja/

### index.tsx (Listagem)
- `getServerSideProps`: busca do Firestore via Admin SDK, filtro published == true.
  Serializar timestamps para ISO string.
- Grid responsivo (Tailwind: grid-cols-1 sm:2 lg:3) de PromptCard.
- Filtros client-side: MUI Select (categoria) + TextField (busca por título).
- Animação: framer-motion stagger nos cards (initial/animate/variants).
- SEO: title e meta description dinâmicos via next/head.

### [id].tsx (Detalhe)
- `getServerSideProps`: busca prompt único por query.id. 404 se não encontrado.
- Exibir: título, descrição completa, categoria (Chip), plataforma, preview parcial.
- Prompt gratuito (price === 0): botão "Copiar" que revela conteúdo completo + clipboard.
- Prompt pago: botão "Comprar" abre ComprarModal com QR Pix.
  Chave Pix via process.env.NEXT_PUBLIC_PIX_KEY.

## Componentes — src/components/loja/
- PromptCard.tsx — card com título, descrição truncada, Chip categoria, preço. onClick navega.
- LojaFilters.tsx — barra de filtros controlada (categoria + busca). Callbacks via props.
- ComprarModal.tsx — MUI Dialog com instruções de Pix, valor, chave copiável.

## Restrições

- Dados server-side apenas — getServerSideProps, sem useEffect para fetch inicial.
- Filtros operam sobre os dados já carregados (client-side filter, sem re-fetch).
- Sem `any`. Props tipadas em cada componente.
- NÃO criar rotas autenticadas aqui — loja é 100% pública.
```

---

### 🤖 PROMPT 4 — Gerenciador de Propaganda (Dashboard + Criar)

```
## Contexto

Projeto Next.js 13 Pages Router · TypeScript strict · MUI ^6 + Tailwind · Formik + Yup ·
Chart.js + react-chartjs-2 (já instalados) · react-icons · Firebase · zustand · yarn.
Endpoint de IA: POST /api/ia/gerar-copy (body: { rede, assunto, tom, cta }).

## Objetivo

Criar o módulo de gerenciamento de propaganda com dashboard analítico e editor de publicações.

## Páginas — src/pages/admin/propaganda/

### index.tsx (Dashboard)
- Métricas em cards MUI (Paper + Typography): total posts, agendados, publicados, campanhas pagas.
- Gráfico de barras (react-chartjs-2 Bar) — posts por rede social.
  Cores: Instagram #E1306C, LinkedIn #0077B5, X #000, WhatsApp #25D366.
- Tabela MUI (Table) de posts recentes:
  Colunas: preview (50 chars), redes (ícones react-icons), data agendada (date-fns format),
  status (Chip: draft=cinza, scheduled=azul, published=verde, paused=amarelo),
  ações (IconButton: edit, delete).
- Filtros: Select por rede + Select por status.
- Dados via getServerSideProps (Firestore Admin, collection `posts`, orderBy scheduledAt desc).

### criar.tsx (Editor)
- Formulário Formik + Yup:
  - `platform`: Autocomplete MUI múltipla seleção (Instagram, LinkedIn, X, WhatsApp).
  - `content`: TextField multiline.
  - `scheduledAt`: input datetime-local (ou MUI DateTimePicker se @mui/x-date-pickers disponível).
  - `isPaid`: Switch MUI. Quando true, expandir campos `budget` (number) e `targetAudience` (text).
- Botão "Gerar com IA": chama POST /api/ia/gerar-copy via Axios; preenche `content` com resposta.
- Preview tabs (MUI Tabs): cada rede selecionada mostra preview estilizado do copy.
- Submit salva no Firestore collection `posts` com { uid, status: 'draft', createdAt }.

## Store — src/store/propaganda.store.ts
- Zustand store com: posts[], filtros ativos, loading states.
- Actions: fetchPosts, createPost, updatePost, deletePost.

## API — src/pages/api/propaganda/posts.ts
- GET: listar com filtros opcionais (rede, status). Firebase Admin SDK.
- POST: criar post (validar body server-side).
- PUT: atualizar post por id.
- DELETE: remover post por id.

## Componentes — src/components/propaganda/
- PropagandaDashboard.tsx — grid de métricas + gráfico (recebe dados via props).
- EditorPublicacao.tsx — formulário isolado (Formik), recebe onSubmit via props.

## Restrições

- Sem `any`. Criar interface `IPost` com todos os campos do model Firestore.
- Chart.js: registrar componentes necessários (CategoryScale, BarElement, etc).
- NÃO instalar dependências novas — tudo já está no projeto.
```

---

### 🤖 PROMPT 5 — Calendário, Campanhas Pagas e Layout do Módulo

```
## Contexto

Projeto Next.js 13 Pages Router · TypeScript strict · MUI ^6 + Tailwind · react-big-calendar ·
date-fns · react-icons · Firebase · yarn.
Módulo propaganda já existe em src/pages/admin/propaganda/ (index.tsx e criar.tsx).
Firestore collection `posts` com interface IPost já definida.

## Objetivo

Finalizar o módulo propaganda com calendário, gestão de campanhas pagas e layout
compartilhado com sidebar de navegação.

## Páginas — src/pages/admin/propaganda/

### calendario.tsx
- react-big-calendar com localizer de date-fns (locale pt-BR).
- Cada evento = post agendado. Mapear IPost para Event do calendar.
- Cor do evento por rede: Instagram=#E1306C, LinkedIn=#0077B5, X=#000, WhatsApp=#25D366.
  Implementar via eventPropGetter.
- Click no evento abre MUI Drawer (anchor right) com: conteúdo completo, redes (ícones),
  data formatada (date-fns), status, botões editar (navega para /criar?id=X) e cancelar
  (atualiza status para 'paused' no Firestore).
- Toolbar customizada com navegação mês anterior/próximo (MUI IconButton + ArrowBack/Forward).
- Dados via getServerSideProps (Firestore query where scheduledAt != null).

### pagas.tsx
- Filtro server-side: Firestore where isPaid == true.
- Cards de resumo (MUI Paper): budget total (sum), campanhas ativas (count status=published),
  rede mais usada (mode da array platform).
- Tabela MUI com colunas: nome (content truncado), redes (ícones), budget (R$ formatado),
  público-alvo, status (Chip colorido), período (início–fim formatado date-fns),
  ROI estimado (TextField inline editável, onBlur salva no Firestore).

## Layout — src/components/propaganda/PropagandaLayout.tsx
- Wrapper HOC/component com MUI Drawer permanente (variant="permanent", 240px width).
- Sidebar com List/ListItemButton para 4 telas:
  Dashboard (/admin/propaganda), Criar (/criar), Calendário (/calendario), Pagas (/pagas).
  Highlight do item ativo baseado em useRouter().pathname.
- Aplicar este layout em todas as 4 páginas do módulo (importar e wrappear).

## Componentes — src/components/propaganda/
- CalendarioConteudo.tsx — calendar wrapper isolado. Props: events[], onSelectEvent().
- CampanhasPagas.tsx — tabela + cards de resumo. Props: posts[], onUpdateROI().
- PropagandaLayout.tsx — sidebar + children.

## Restrições

- Sem `any`. Tipar eventPropGetter, custom toolbar, inline edit handlers.
- date-fns: usar `{ locale: ptBR }` em todos os format().
- react-big-calendar: importar CSS default ('react-big-calendar/lib/css/react-big-calendar.css').
- NÃO alterar _app.jsx nem arquivos fora do escopo propaganda.
- NÃO instalar novas dependências — react-big-calendar e date-fns já estarão instalados.
```

---

## 10. Análise de Custos

| Serviço            | Plano Gratuito | Limite                     | Upgrade se necessário     |
| ------------------ | -------------- | -------------------------- | ------------------------- |
| Vercel             | Hobby          | 100GB bandwidth/mês        | Pro: $20/mês              |
| Firebase Firestore | Spark          | 1GB storage, 50k reads/dia | Blaze: pay-as-you-go      |
| Groq API           | Free tier      | 14.400 req/dia             | $0.27/1M tokens           |
| Gemini API         | Free tier      | 1.500 req/dia              | $0.075/1M tokens          |
| Domínio            | vercel.app     | Gratuito                   | ~R$50/ano domínio próprio |

> 💡 **Custo total para lançamento: R$ 0,00.** O projeto pode operar completamente no free tier para até ~500 usuários/mês com uso moderado da IA.

---

## 11. Próximos Passos Imediatos

1. Criar conta em [console.groq.com](https://console.groq.com) e gerar API key
2. Criar API key em [aistudio.google.com](https://aistudio.google.com) (Gemini)
3. Adicionar as novas variáveis no `.env.local` (já existente) e no painel do Vercel
4. Instalar as novas dependências:
   ```bash
   yarn add @groq-sdk @google/generative-ai zustand date-fns react-big-calendar react-markdown
   ```
5. Usar o **Prompt 1** para criar a camada de IA
6. Seguir os demais prompts em sequência por fase

---

_Linikers — Documentação adaptada à estrutura do projeto — v2.0_
