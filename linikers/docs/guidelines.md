# Diretrizes de Desenvolvimento

## Estilo de Código
- TypeScript estrito (`strict: true` no tsconfig)
- Preferir MUI `sx` para estilos de componente, Tailwind para layout
- Nomes de arquivo em kebab-case para páginas, camelCase para componentes

## Commits
- Mensagens em português, descritivas
- PRs pequenos e incrementais

## Componentes
- Componentes compartilháveis em `/components/`
- Componentes específicos de página em `/pages/components/`
- Stores Zustand em `/store/` — uma store por domínio

## API Routes
- Validação de entrada antes de processar
- Tratamento de erro consistente com try/catch
