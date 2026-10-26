import BsideSeo from "@/components/bside/Seo";
import s from "@/styles/bside-salao-modelo.module.scss";
import { wa } from "@/lib/bside";

/**
 * /bside/salao/servicos — modelo de página de salão SEM agendamento online.
 *
 * Por que existe (26/10): a Juliana, do Salão Juliana Biagio & Patrícia Moura
 * (Cambé), disse na conversa que não gosta de agendamento online e mesmo assim
 * pediu para ver o modelo. O modelo anterior (`/bside/salao/modelo`) é centrado
 * em agenda, então não servia: mostrava exatamente o que ela recusou.
 *
 * Este aqui é o oposto: organiza o salão por área de serviço, mostra a equipe e
 * o horário, e todo caminho termina no WhatsApp. Nada de reserva, nada de login.
 *
 * Regras: noindex, fora do sitemap, sem link vindo de /bside, salão fictício
 * ("Studio Aurora"), nenhuma foto de pessoa. Dados são de exemplo.
 */

const SALAO = "Studio Aurora";
const CIDADE = "Cambé";

/** Áreas do salão, cada uma com seus serviços — é o que ela tem de verdade. */
const AREAS = [
  {
    id: "cabelo",
    nome: "Cabelo",
    resumo: "Corte, cor e tratamento, com avaliação do fio antes de começar.",
    itens: [
      { nome: "Corte feminino", desc: "Com lavagem e finalização", preco: "R$ 70", dur: "50 min" },
      { nome: "Escova modelada", desc: "Lisa ou com movimento", preco: "R$ 60", dur: "40 min" },
      { nome: "Coloração", desc: "Com avaliação do fio antes", preco: "R$ 180", dur: "1h40" },
      { nome: "Hidratação", desc: "Reconstrução para cabelo castigado", preco: "R$ 90", dur: "50 min" },
    ],
  },
  {
    id: "estetica-facial",
    nome: "Estética facial",
    resumo: "Limpeza, hidratação e protocolos de pele com avaliação na hora.",
    itens: [
      { nome: "Limpeza de pele", desc: "Com extração e máscara calmante", preco: "R$ 120", dur: "1h" },
      { nome: "Hidratação facial", desc: "Para pele seca ou desidratada", preco: "R$ 90", dur: "50 min" },
    ],
  },
  {
    id: "estetica-corporal",
    nome: "Estética corporal",
    resumo: "Protocolos por sessão ou pacote, combinados na avaliação.",
    itens: [
      { nome: "Drenagem linfática", desc: "Sessão de 50 minutos", preco: "R$ 100", dur: "50 min" },
      { nome: "Massagem relaxante", desc: "Com óleo morno", preco: "R$ 110", dur: "1h" },
    ],
  },
  {
    id: "unhas",
    nome: "Manicure e pedicure",
    resumo: "Com esmaltação em gel ou alongamento, se quiser.",
    itens: [
      { nome: "Manicure", desc: "Com esmaltação comum", preco: "R$ 35", dur: "40 min" },
      { nome: "Pedicure", desc: "Com esmaltação em gel", preco: "R$ 45", dur: "50 min" },
      { nome: "Alongamento em gel", desc: "Com manutenção a cada 3 semanas", preco: "R$ 150", dur: "2h" },
    ],
  },
  {
    id: "cilios",
    nome: "Cílios e sobrancelha",
    resumo: "Volume brasileiro, fio a fio e design de sobrancelha.",
    itens: [
      { nome: "Extensão de cílios", desc: "Volume brasileiro", preco: "R$ 160", dur: "2h" },
      { nome: "Design de sobrancelha", desc: "Com pinça e henna, se quiser", preco: "R$ 45", dur: "30 min" },
    ],
  },
  {
    id: "head-spa",
    nome: "Head spa",
    resumo: "Ritual de couro cabeludo com lavagem, massagem e finalização.",
    itens: [
      { nome: "Head spa completo", desc: "Lavagem, massagem e finalização", preco: "R$ 180", dur: "1h20" },
    ],
  },
] as const;

const EQUIPE = [
  { id: "juliana", nome: "Juliana", area: "Cabelo, cor e estética facial", inicial: "J" },
  { id: "patricia", nome: "Patrícia", area: "Unhas, cílios e head spa", inicial: "P" },
] as const;

const MENSAGEM = `Oi, Márcia! Vi o modelo de página de salão (${SALAO}) e queria uma assim pro meu salão.`;

export default function ModeloSalaoServicos() {
  return (
    <div className={s.page}>
      <BsideSeo
        title="Modelo de página para salão, sem agendamento · Bside Digital Studio"
        description="Exemplo de página para salão organizada por área de serviço, com equipe, preços e botão direto para o WhatsApp. Sem agendamento online. Feito pela Bside Digital Studio."
        path="/bside/salao/servicos"
        noindex
        siteName="Bside Digital Studio"
      />

      <div className={s.selo}>
        <span className={s.seloPonto} />
        Página de exemplo · dados fictícios
      </div>

      <header className={s.header}>
        <div className={`${s.wrap} ${s.headerIn}`}>
          <a className={s.marca} href="#topo">
            {SALAO.split(" ")[0]} <em>{SALAO.split(" ")[1]}</em>
          </a>
          <nav className={s.nav}>
            <a href="#servicos">Serviços</a>
            <a href="#equipe">Equipe</a>
            <a href="#local">Onde fica</a>
          </nav>
          <a className={s.botaoClaro} href={wa(MENSAGEM)} target="_blank" rel="noopener noreferrer">
            Falar no WhatsApp
          </a>
        </div>
      </header>

      <main id="topo">
        <div className={s.wrap}>
          <section className={s.hero}>
            <div>
              <span className={s.olho}>{CIDADE} · cabelo, estética e unhas</span>
              <h1 className={s.titulo}>
                Seis áreas de cuidado, <em>um só endereço</em>
              </h1>
              <p className={s.texto}>
                Cabelo, estética facial e corporal, unhas, cílios e head spa com
                preço na tabela antes de você sentar. Quem atende é sempre a mesma
                pessoa, e o horário você combina direto no WhatsApp.
              </p>
              <div className={s.acoes}>
                <a className={s.botao} href={wa(MENSAGEM)} target="_blank" rel="noopener noreferrer">
                  Chamar no WhatsApp
                </a>
                <a className={s.botaoClaro} href="#servicos">
                  Ver serviços e preços
                </a>
              </div>
              <div className={s.fichas}>
                <div>
                  <strong>6 áreas</strong>
                  <span>Cabelo, estética, unhas, cílios e spa</span>
                </div>
                <div>
                  <strong>Seg a Sáb</strong>
                  <span>9h às 19h</span>
                </div>
                <div>
                  <strong>Sem agendamento online</strong>
                  <span>Você fala direto com a gente</span>
                </div>
              </div>
            </div>

            <div className={s.foto}>
              <img src="/bside/salao/hero.webp" alt={`Interior do ${SALAO}`} />
              <span className={s.fotoTag}>Centro de {CIDADE}</span>
            </div>
          </section>
        </div>

        <div className={s.faixa}>
          <div className={`${s.wrap} ${s.faixaIn}`}>
            <div className={s.faixaItem}>
              <strong>6</strong>
              <span>áreas de serviço</span>
            </div>
            <div className={s.faixaItem}>
              <strong>2</strong>
              <span>profissionais</span>
            </div>
            <div className={s.faixaItem}>
              <strong>Tabela aberta</strong>
              <span>preço antes de começar</span>
            </div>
            <div className={s.faixaItem}>
              <strong>Pix e cartão</strong>
              <span>em até 3x sem juros</span>
            </div>
          </div>
        </div>

        <div className={s.wrap}>
          <section className={s.secao} id="servicos">
            <div className={s.secaoTopo}>
              <h2 className={s.secaoTitulo}>Serviços por área</h2>
              <p className={s.secaoSub}>
                Cada área com sua seção, para quem procura cílio não cair na página
                de cabelo. Cabelo muito longo ou química recente pode mudar o valor,
                e a gente avisa antes.
              </p>
            </div>

            {AREAS.map((area) => (
              <div key={area.id} id={area.id} style={{ marginBottom: 40 }}>
                <h3 className={s.secaoTitulo} style={{ fontSize: 22, marginBottom: 6 }}>
                  {area.nome}
                </h3>
                <p className={s.secaoSub} style={{ marginBottom: 14 }}>
                  {area.resumo}
                </p>
                <div className={s.servicos}>
                  {area.itens.map((item) => (
                    <div key={item.nome} className={s.servico}>
                      <div className={s.servicoInfo}>
                        <span className={s.servicoNome}>{item.nome}</span>
                        <span className={s.servicoDesc}>
                          {item.desc} · {item.dur}
                        </span>
                      </div>
                      <span className={s.servicoPreco}>{item.preco}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        </div>

        <div className={s.wrap}>
          <section className={s.secao} id="equipe">
            <div className={s.secaoTopo}>
              <h2 className={s.secaoTitulo}>Quem atende</h2>
              <p className={s.secaoSub}>
                Duas profissionais, cada uma com sua especialidade. Você já sabe com
                quem vai falar antes de chegar.
              </p>
            </div>
            <div className={s.equipe}>
              {EQUIPE.map((p) => (
                <div key={p.id} className={s.pessoa}>
                  <span className={s.inicial}>{p.inicial}</span>
                  <span className={s.pessoaNome}>{p.nome}</span>
                  <span className={s.pessoaArea}>{p.area}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className={s.wrap}>
          <section className={s.secao} id="local">
            <div className={s.secaoTopo}>
              <h2 className={s.secaoTitulo}>Onde fica e quando abre</h2>
            </div>
            <div className={s.local}>
              <div className={s.localBloco}>
                <span className={s.pessoaNome}>Endereço</span>
                <p className={s.texto}>Rua das Acácias, 521 · Centro, {CIDADE}</p>
              </div>
              <div className={s.localBloco}>
                <span className={s.pessoaNome}>Horário</span>
                <p className={s.texto}>Segunda a sábado, das 9h às 19h</p>
              </div>
              <div className={s.localBloco}>
                <span className={s.pessoaNome}>Pagamento</span>
                <p className={s.texto}>Pix, dinheiro e cartão em até 3x sem juros</p>
              </div>
            </div>
          </section>
        </div>

        <div className={s.wrap}>
          <section className={s.fecho}>
            <h2 className={s.fechoTitulo}>Quer uma página assim para o seu salão?</h2>
            <p className={s.fechoTexto}>
              Serviços por área, equipe, preço na tabela e o botão que leva direto
              para o seu WhatsApp. Sem agendamento online obrigatório.
            </p>
            <a className={s.botao} href={wa(MENSAGEM)} target="_blank" rel="noopener noreferrer">
              Chamar no WhatsApp
            </a>
          </section>
        </div>
      </main>

      <footer className={s.rodape}>
        <div className={`${s.wrap} ${s.rodapeIn}`}>
          <span>Bside Digital Studio · Maringá e região</span>
          <span>Página de exemplo, dados fictícios</span>
        </div>
      </footer>
    </div>
  );
}
