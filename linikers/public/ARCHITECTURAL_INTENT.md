# ARCHITECTURAL_INTENT.md

> **Intenção Arquitetural do Marketing OS**
>
> *Este documento descreve por que a arquitetura existe, quais princípios a orientam e o que nunca deve ser sacrificado. Não descreve implementação. Não contém roadmap. Deve ser consultado antes de qualquer mudança estrutural.*

---

## 1. Propósito

O Marketing OS existe para **automatizar decisões de marketing de pequenas e médias empresas** combinando agentes de IA com execução determinística. A arquitetura foi desenhada para que o sistema possa:

- Receber eventos do mundo real (lead novo, campanha criada, mensagem enviada)
- Decidir o que fazer com base em análise de IA (quando julgamento é necessário)
- Executar ações concretas (enviar WhatsApp, pausar anúncio, agendar mensagem)
- Registrar tudo como eventos imutáveis para auditoria e rastreamento
- Ser estendido com novos tipos de campanha, canais e provedores sem reestruturar o núcleo

A arquitetura não foi concebida para ser um monólito nem um sistema distribuído — ela é um **orquestrador in-process baseado em eventos**, com clara separação entre roteamento (Supervisor), decisão (Agentes) e execução (Serviços determinísticos).

---

## 2. Princípios Fundamentais

Os princípios abaixo foram **observados no código** — não são aspirações. Cada um tem evidência concreta no código-fonte.

### 2.1. Eventos como espinha dorsal

**Evidência:** O `InProcessEventBus` centraliza toda comunicação entre módulos. O `CampaignExecutor` nunca chama serviços diretamente — ele publica eventos (`campanha.validada`, `contatos.selecionados`, `mensagens.agendadas`). O Supervisor escuta eventos e roteia para especialistas.

**Significado:** Módulos não conhecem uns aos outros. Eles conhecem apenas o barramento de eventos.

**Impacto:** Adicionar um novo especialista não exige alterar nenhum existente. Basta registrar no Supervisor e assinar os eventos desejados.

### 2.2. Supervisor como roteador puro

**Evidência:** `SupervisorAgent` contém zero lógica de domínio. Ele mantém um mapa `tipo_de_evento → especialista` e apenas delega. Não executa, não valida, não transforma dados.

**Significado:** O Supervisor é burro por design. Inteligência pertence aos especialistas.

**Impacto:** Se o roteamento precisar mudar (ex: evento pode ir para múltiplos especialistas), apenas o Supervisor muda. Nenhum especialista é afetado.

### 2.3. Especialistas com responsabilidade única

**Evidência:** Cada especialista cobre um domínio — `CampaignSpecialist` (campanhas), `LeadSpecialist` (contatos), `ChannelSpecialist` (canais de envio), `AnalyticsSpecialist` (métricas). Nenhum mistura domínios.

**Significado:** Um especialista tem um motivo para existir e um motivo para mudar.

**Impacto:** Um bug no processamento de leads não afeta campanhas. Uma mudança no fluxo de WhatsApp não afeta métricas.

### 2.4. Determinismo primeiro, IA depois

**Evidência:** `LeadSpecialist` e `AnalyticsSpecialist` são totalmente determinísticos. `ChannelSpecialist` é determinístico com chamada a serviço externo. Apenas `CampaignSpecialist` usa IA (`AgentRuntime`).

**Significado:** IA é adicionada apenas onde julgamento é necessário. Onde regras são suficientes, regras são usadas.

**Impacto:** Menor custo de LLM, menor latência, maior previsibilidade em operações que não exigem decisão.

### 2.5. Abstração por interfaces

**Evidência:** `ILLMProvider`, `IMemoryProvider`, `IEventBus`, `IScheduler`, `IAgentSpecialist` — todos os pontos de variação são abstraídos por interfaces. A factory (`LLMProviderFactory`, `MemoryFactory`) permite trocar implementações sem alterar consumidores.

**Significado:** O núcleo do sistema não depende de provedores concretos.

**Impacto:** Trocar de OpenAI para Anthropic, ou de Redis para banco relacional como scheduler, não exige reescrever agentes.

### 2.6. Observabilidade por decoração, não por invasão

**Evidência:** `MonitoredAgent` é um wrapper — ele envolve um especialista e adiciona tracing sem modificar o especialista original. `MonitoredSupervisor` faz o mesmo para o Supervisor.

**Significado:** Observabilidade é uma camada transversal, não uma responsabilidade dos componentes de negócio.

**Impacto:** Um especialista não precisa saber que está sendo monitorado. Remover tracing não altera lógica de negócio.

### 2.7. Imutabilidade do log de eventos

**Evidência:** A tabela `eventos` é append-only. `salvarEvento()` nunca atualiza registros existentes — apenas cria novos.

**Significado:** O histórico de eventos é confiável e auditável.

**Impacto:** É possível reconstruir o estado do sistema a partir dos eventos, mesmo que modelos de banco mudem.

### 2.8. Composição, não herança

**Evidência:** `CampaignSpecialist` recebe `CampaignExecutor`, `AudienceSelector`, `IScheduler`, `IEventBus` por construtor. `AgentRuntime` recebe `LLMRouter` e `IExecutionStore`. Nada usa herança de classes.

**Significado:** Comportamento é composto por colaboração, não por hierarquia.

**Impacto:** É possível testar o `CampaignSpecialist` com um `MockAudienceSelector` sem instanciar banco ou LLM.

---

## 3. O que NUNCA queremos construir

### 3.1. Agentes que fazem múltiplas coisas

Se um especialista processa leads E campanhas E métricas, ele viola a intenção arquitetural. Cada especialista deve ter exatamente um domínio.

### 3.2. IA avaliando IA em cascata

Um agente avaliando a saída de outro agente para decidir se aquela saída está correta, que por sua vez usou IA para gerar a saída.

**Justificativa:** Não há ground truth. O erro se propaga e amplifica.

### 3.3. Supervisor com lógica de domínio

O Supervisor não deve validar, transformar, filtrar ou enriquecer eventos. Ele roteia. Ponto.

### 3.4. Duplicação de fontes de verdade

Uma mesma informação não deve ser armazenada em dois lugares com ciclos de atualização diferentes.

### 3.5. Dependência circular entre pacotes

`packages/agents` não deve importar `packages/ads`, e vice-versa. A direção das dependências deve ser clara e acíclica.

### 3.6. Prompts monolíticos

Um prompt que descreve o comportamento de múltiplos domínios não deve existir.

### 3.7. EventBus como barramento inteligente

O EventBus não deve filtrar, transformar, rotear ou priorizar eventos. Ele apenas entrega.

---

## 4. Regras para Evolução

Antes de adicionar qualquer funcionalidade, estas perguntas devem ser respondidas:

1. **Esta mudança reutiliza componentes existentes?** Se não, por quê?
2. **Pode ser resolvida com eventos?** Se não, qual a justificativa?
3. **Está criando duplicação?** Se sim, qual fonte de verdade será eliminada?
4. **Existe um componente responsável por isso?** Se sim, por que não está sendo usado?
5. **Está aumentando acoplamento?** Se sim, qual o plano para desacoplar?
6. **A responsabilidade está correta?** Esta mudança pertence a qual especialista? Por quê?
7. **Pode ser revertida?** Se algo der errado, qual o rollback?
8. **Qual o impacto em observabilidade?** A mudança adiciona logs, traces, métricas ou eventos?

---

## 5. Filosofia de Reutilização

### Quando REUTILIZAR
- Um componente existente faz exatamente o que é necessário
- Estender a interface não quebra contratos existentes
- A mudança não adiciona responsabilidade alheia ao componente

### Quando ESTENDER
- O comportamento atual é insuficiente mas a responsabilidade pertence ao mesmo domínio
- A interface suporta a extensão sem breaking changes
- A mudança não viola SRP do componente

### Quando SUBSTITUIR
- O componente atual está no caminho de uma evolução necessária
- A substituição não quebra consumidores (interface permanece)
- O componente antigo pode ser mantido como fallback ou removido após migração

### Quando CRIAR UM NOVO COMPONENTE
- Nenhum componente existente tem a responsabilidade necessária
- A responsabilidade é coesa e tem um único motivo para mudar
- O novo componente não duplica funcionalidade existente
- A criação é justificada por um ADR

---

## 6. Filosofia dos Agentes

### Tamanho ideal
Um agente deve ser pequeno o suficiente para que sua lógica caiba em um arquivo de ~150-200 linhas.

### O que um agente DEVE fazer
- Processar eventos do seu domínio
- Usar `AgentRuntime` para decisões que exigem IA
- Delegar execução determinística para serviços
- Publicar eventos de resultado no EventBus

### O que um agente NUNCA deve fazer
- Chamar `ILLMProvider.generate()` diretamente
- Acessar banco de dados diretamente
- Implementar lógica de outro domínio

---

## 7. Filosofia do Supervisor

### O que pertence ao Supervisor
- Mapeamento de `tipo_de_evento → especialista`
- Idempotência
- Roteamento

### O que nunca deve pertencer ao Supervisor
- Validação de payload
- Transformação de dados
- Decisão de qual ação tomar
- Agregação de resultados
- Lógica de domínio

---

## 8. Filosofia das Skills

Skills são os **prompts dos agentes** (`packages/agents/prompts/`). Cada skill:
- Define a identidade do especialista
- Lista eventos que processa
- Especifica decisões que pode tomar
- Define formato de resposta (JSON schema)
- Contém restrições absolutas

### Quando criar uma nova Skill
- Um novo especialista é criado
- Um especialista existente ganha um novo modo de operação

### Quando NÃO criar
- Substituir lógica determinística que funciona sem IA

---

## 9. Filosofia da Observabilidade

### Por que cada camada existe
- **Logs** (`console.warn`): operador humano entende o que o sistema está fazendo
- **Traces** (`traceStore` + `MonitoredAgent`): timeline de cada execução de agente
- **Eventos** (`salvarEvento()`): auditoria imutável no banco
- **Métricas** (`AgentConfigStore`, `/analytics/dashboard`): tomada de decisão informada

### O que nunca deve acontecer
- Traces não devem afetar lógica de negócio
- Falha em observabilidade não deve quebrar o sistema
- Métricas não devem ser fonte de verdade

---

## 10. Filosofia da Evolução

**Preferimos evoluir os existentes** a criar novos módulos, desde que a mudança respeite o SRP.

### Quando uma refatoração é aceitável
- Componente atual viola SRP de forma comprovada
- Mudança não altera comportamento externo
- Existe cobertura de testes
- Benefício supera risco

### Quando um novo componente é justificável
- Responsabilidade não pertence a nenhum componente existente
- Tentativa de estender violaria SRP
- Decisão documentada em ADR

### Quando dizer NÃO para uma nova feature
- Duplica funcionalidade existente
- Requer violação de princípios fundamentais
- Pode ser resolvida com configuração ou evento

---

## 11. Inteligência Artificial

### Onde a IA agrega valor
- Decisões que exigem julgamento contextual
- Análise de dados não estruturados
- Recomendações baseadas em múltiplos fatores

### Onde regras simples são melhores
- Validação de dados
- Roteamento
- Cálculos financeiros
- Filtros de audiência
- Sequenciamento

### Quando evitar IA
- Regras determinísticas resolvem com menor custo
- Decisão precisa ser 100% consistente
- Custo do erro supera benefício da flexibilidade
- Ground truth é objetivo

---

## 12. Governança

### Decisões arquiteturais
O arquiteto principal, após auditoria (Prompt 0) e documentação em ADR. Mudanças que violam este documento exigem aprovação explícita.

### ADRs
Arquivos em `docs/adr/` com formato `0001-titulo-da-decisao.md`. Cada ADR deve conter: contexto, decisão, consequências, alternativas, data e autor.

### ADR obrigatório para
- Criação de novo pacote
- Mudança na interface do EventBus
- Adição de novo provider LLM
- Mudança na estratégia de persistência
- Alteração no padrão de comunicação entre módulos

### Revisão arquitetural necessária quando
- Altera 3+ arquivos em pacotes diferentes
- Introduz nova dependência externa
- Adiciona novo tipo de comunicação
- Muda estratégia de observabilidade

---

## 13. Princípios para Futuras Implementações

**Checklist obrigatório:**

- ☐ Reutiliza componentes existentes?
- ☐ Mantém baixo acoplamento?
- ☐ Respeita SRP?
- ☐ Evita duplicação?
- ☐ Mantém observabilidade?
- ☐ Pode ser revertida?
- ☐ Possui justificativa arquitetural?
- ☐ Possui impacto documentado?
- ☐ Possui ADR quando necessário?

---

## 14. Anti-patterns

1. **Agente Deus** — Um especialista que processa múltiplos domínios
2. **Gateway centralizado** — Módulo que todos chamam, criando hub-and-spoke
3. **Overflow de eventos** — Publicar eventos que ninguém consome
4. **Dependência transversal** — Especialista importa serviços de outro domínio
5. **Runtime inflado** — Adicionar responsabilidades ao AgentRuntime
6. **Observabilidade intrusiva** — Código de tracing na lógica de negócio

---

## 15. Decisões Conscientes

### EventBus in-process, não RabbitMQ
O sistema roda em um único processo. A interface `IEventBus` permite a troca quando necessário.

### Config de agentes em JSON, não no banco
Configuração de IA muda com frequência. Separar do banco evita migrações e acoplamento.

### InMemoryScheduler como padrão
Tarefas agendadas são recriáveis. Complexidade do Redis não se justifica para tarefas não-críticas.

### Placeholders para especialistas futuros
Registrar o especialista antes da implementação completa garante que API e dashboard estejam prontos.

### traceStore em memória
Traces são de debug/operação. Eventos no banco são a fonte de verdade para auditoria.

---

## 16. Limites da Arquitetura

### Este documento NÃO define
- Tecnologias específicas
- Padrões de código
- Processo de CI/CD
- Estratégia de deploy

### Decisões que pertencem aos módulos
- Como um especialista implementa sua lógica
- Estrutura de dados interna
- Testes

### Decisões que pertencem aos ADRs
- Criação de novos pacotes
- Mudança de interface do EventBus
- Adição de novos provedores LLM

### Decisões que pertencem às implementações
- Versão de biblioteca
- Otimização de query
- Detalhes de tratamento de erro

---

## 17. Conclusão — Carta para Futuros Desenvolvedores

Você acabou de encontrar este documento. Antes de fazer qualquer mudança estrutural, leia-o.

**Por que esta arquitetura foi construída dessa forma:**

Porque marketing é um domínio onde decisões têm consequências financeiras imediatas, mas também precisam de flexibilidade criativa. O sistema precisava equilibrar:

- **Determinismo** para o que é previsível (validação, agendamento, cálculo)
- **IA** para o que exige julgamento (qual lead priorizar, como otimizar campanha)
- **Eventos** para que tudo fique registrado e auditável
- **Simplicidade** para que um único desenvolvedor possa entender o sistema inteiro

**O que deve ser preservado:**

1. **Eventos como cola entre módulos** — eles são o que mantém o sistema desacoplado
2. **Supervisor como roteador burro** — inteligência nos especialistas, não no carteiro
3. **Especialistas pequenos e focados** — um arquivo, uma responsabilidade
4. **Observabilidade por decoração** — não poluir lógica de negócio com tracing
5. **Determinismo como regra, IA como exceção** — LLM é caro e imprevisível

**O que pode evoluir:**

- A implementação do EventBus (in-process → RabbitMQ → Kafka)
- A implementação do Scheduler (in-memory → Redis → banco)
- A estratégia de deploy (single process → múltiplos workers)
- Os provedores LLM (OpenCode → OpenAI → Anthropic → self-hosted)
- Os tipos de evento (novos canais, novas automações)

**O que nunca deve ser sacrificado:**

- **Direção das dependências** — api → agents → ai. Nunca ao contrário.
- **Imutabilidade dos eventos** — uma vez salvo, o evento não muda.
- **Responsabilidade única dos especialistas** — nenhum especialista deve fazer o trabalho de outro.
- **Separação entre roteamento e execução** — o Supervisor não executa; o especialista não roteia.

---

## Princípios em Aberto

Estes princípios **não foram comprovados pela auditoria** e permanecem como decisões pendentes:

1. **Tolerância a falhas de agentes** — Não há evidência de como o sistema deve se comportar quando um especialista falha repetidamente.
2. **Versionamento de prompts** — O `PromptManager` calcula hash SHA256, mas não há estratégia definida para rollback de prompt em produção.
3. **Escala horizontal** — A arquitetura atual é single-process. A troca para RabbitMQ é mencionada, mas não há princípio definido.
4. **Política de retenção de eventos** — Eventos crescem indefinidamente. Não há princípio sobre quando arquivar.
5. **Testes de qualidade de IA** — Não há evidência de como validar se uma decisão do LLM está correta antes de executá-la.

Estes tópicos aguardam decisão arquitetural formal via ADR.
