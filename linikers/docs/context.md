# Documentação do Projeto

## Visão Geral

Este é o portfólio pessoal + hub de ferramentas do Liniker (LinikerS.dev).
Construído com Next.js 13 (Pages Router), TypeScript, MUI v6, Tailwind CSS,
Firebase (Auth + Firestore), e integração com IA (Groq + Gemini).

## Arquitetura

- **Pages Router** — Rotas tradicionais do Next.js 13
- **SSR** — Loja de prompts e propaganda usam getServerSideProps com Firestore
- **Client State** — Zustand (gerador.store, propaganda.store)
- **IA** — Dupla camada: Groq como provider principal, Gemini como fallback automático
- **Auth** — Firebase Auth com email/senha e login Google

## Módulos

### Admin `/admin/`
- Dashboard com gráficos e atalhos
- Gerador de Prompts (formulário → IA → Firestore)
- Propaganda & Marketing (CRUD de posts, calendário)
- Painel de Cotação (AwesomeAPI)

### Loja `/loja`
- Catálogo de prompts com SSR
- Filtros por categoria e busca textual
- Integração com Firestore (coleção "prompts")

### Blog `/blog`
- Posts em markdown com gray-matter + remark
- Arquivo único `iniBlog.md` com separador `---_POST_SEPARATOR_---`

## Deploy

Vercel — push na branch principal faz deploy automático.
