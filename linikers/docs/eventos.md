# Eventos first-party (`eventos`)

Medição própria de visita e clique no WhatsApp, sem GA e sem cookie de terceiro.

- Cliente: `src/lib/track.ts` (pageview por rota + listener global de clique)
- API: `POST /api/track` (`src/pages/api/track.ts`)
- Painel: `/admin/visao` (`src/pages/admin/visao.tsx` + `GET /api/admin/visao?dias=7|30|90`)
- Agregação: `src/lib/visao.ts`
- Inventário de rotas: `src/data/rotas.ts`

## Documento gravado

```jsonc
{
  "tipo": "pageview",            // ou "clique_whatsapp"
  "path": "/bside",              // só caminho interno, sem query string
  "sessao": "8a3c…",             // id anônimo aleatório (localStorage, 30 min)
  "nova": true,                  // sessão criada neste evento
  "origem": {                    // first-touch da sessão
    "source": "google",
    "medium": "cpc",
    "campaign": "sites-pr",
    "term": "",
    "content": "",
    "referrer": "google.com",    // só hostname, e só se for externo
    "landing": "/consultoria-ia",
    "em": "2026-11-26T14:50:00.000Z"
  },
  "utm": { "source": "google", "medium": "cpc", "campaign": "sites-pr", "term": "", "content": "" },
  "local": "header",             // só em clique_whatsapp
  "data": "2026-11-26T14:50:00.000Z", // relógio do servidor, base de todas as contagens
  "dia": "2026-11-26",
  "criadoEm": "<Timestamp>",
  "expiraEm": "<Timestamp + 90 dias>"
}
```

## Sem PII

O documento é montado no servidor a partir de uma lista fechada de campos — o que
o cliente envie a mais é descartado. Não são gravados: nome, telefone, e-mail,
IP, user-agent, texto digitado, URL completa com query, caminho do referrer.
O IP existe só em memória do processo para o limite de 120 eventos/minuto.

## Retenção de 90 dias (TTL)

O campo `expiraEm` já vai em todo documento. Para o Firestore apagar sozinho,
ativar a política TTL uma única vez (Console → Firestore → TTL, ou gcloud):

```bash
gcloud firestore fields ttls update expiraEm \
  --collection-group=eventos \
  --enable-ttl \
  --project=portfoliolinikers
```

Sem o TTL, nada é apagado automaticamente — o painel continua limitado a 90 dias
(`src/lib/visao.ts`) e a consulta nunca lê mais que isso.

## Como conferir número

```bash
# contagem direta no Firestore (painel usa o mesmo filtro)
# onde data >= ISO de hoje-30d
```

O painel faz `where("data", ">=", ISO)` e conta em memória; qualquer divergência
entre painel e contagem direta é bug, não arredondamento.
