import BsideSeo from "@/components/bside/Seo";
import s from "@/styles/bside-salao-modelo.module.scss";
import { wa } from "@/lib/bside";

/**
 * Página de salão SEM agendamento online, em duas versões:
 *
 * - `/bside/salao/servicos`  modelo público de exemplo (dados fictícios);
 * - `/bside/previa/<nome>`   prévia com o nome e os dados do lead, noindex,
 *                            fora do sitemap e sem link vindo de lugar nenhum.
 *
 * O que era antes: a página inteira vivia dentro de `pages/bside/salao/servicos.tsx`
 * com as constantes no topo. Para montar a prévia de um lead era preciso copiar
 * 289 linhas — e cópia divergindo é como o preço de uma peça fica diferente do
 * preço da outra. Agora o desenho é um componente e o dado é prop.
 *
 * Regras que valem para as DUAS versões: noindex, sem link no sitemap, nenhuma
 * foto de pessoa, todo caminho termina no WhatsApp do 8386.
 */

export interface ItemServico {
  nome: string;
  desc: string;
  preco: string;
  dur: string;
}

export interface AreaServico {
  id: string;
  nome: string;
  resumo: string;
  itens: ItemServico[];
}

export interface Profissional {
  id: string;
  nome: string;
  area: string;
  inicial: string;
}

export interface DadosSalaoServicos {
  /** Marca em duas partes: a segunda entra em itálico. */
  marca: [string, string];
  cidade: string;
  olho: string;
  /** Título em duas partes: a segunda entra em itálico. */
  titulo: [string, string];
  texto: string;
  /** Resumo curto das áreas para a ficha do hero. Sem isso, usa os nomes. */
  resumoAreas?: string;
  fotoTag: string;
  foto: string;
  areas: AreaServico[];
  equipe: Profissional[];
  endereco: string;
  horario: string;
  pagamento: string;
  /** Mensagem que abre o WhatsApp quando o lead clica. */
  mensagem: string;
  /** Selo do topo. Ex.: "Página de exemplo · dados fictícios". */
  selo: string;
  rodapeNota: string;
  fecho: { titulo: string; texto: string };
  seo: { title: string; description: string; path: string };
}

const plural = (n: number) => (n === 1 ? "1 área" : `${n} áreas`);

export default function SalaoServicos({ dados }: { dados: DadosSalaoServicos }) {
  const { areas, equipe } = dados;

  return (
    <div className={s.page}>
      <BsideSeo
        title={dados.seo.title}
        description={dados.seo.description}
        path={dados.seo.path}
        noindex
        siteName="Bside Digital Studio"
      />

      <div className={s.selo}>
        <span className={s.seloPonto} />
        {dados.selo}
      </div>

      <header className={s.header}>
        <div className={`${s.wrap} ${s.headerIn}`}>
          <a className={s.marca} href="#topo">
            {dados.marca[0]} <em>{dados.marca[1]}</em>
          </a>
          <nav className={s.nav}>
            <a href="#servicos">Serviços</a>
            <a href="#equipe">Equipe</a>
            <a href="#local">Onde fica</a>
          </nav>
          <a className={s.botaoClaro} href={wa(dados.mensagem)} target="_blank" rel="noopener noreferrer">
            Falar no WhatsApp
          </a>
        </div>
      </header>

      <main id="topo">
        <div className={s.wrap}>
          <section className={s.hero}>
            <div>
              <span className={s.olho}>{dados.olho}</span>
              <h1 className={s.titulo}>
                {dados.titulo[0]} <em>{dados.titulo[1]}</em>
              </h1>
              <p className={s.texto}>{dados.texto}</p>
              <div className={s.acoes}>
                <a className={s.botao} href={wa(dados.mensagem)} target="_blank" rel="noopener noreferrer">
                  Chamar no WhatsApp
                </a>
                <a className={s.botaoClaro} href="#servicos">
                  Ver serviços e preços
                </a>
              </div>
              <div className={s.fichas}>
                <div>
                  <strong>{plural(areas.length)}</strong>
                  <span>{dados.resumoAreas || areas.map((a) => a.nome).join(", ")}</span>
                </div>
                <div>
                  <strong>Seg a Sáb</strong>
                  <span>{dados.horario}</span>
                </div>
                <div>
                  <strong>Sem agendamento online</strong>
                  <span>Você fala direto com a gente</span>
                </div>
              </div>
            </div>

            <div className={s.foto}>
              <img src={dados.foto} alt={`Interior do ${dados.marca.join(" ")}`} />
              <span className={s.fotoTag}>{dados.fotoTag}</span>
            </div>
          </section>
        </div>

        <div className={s.faixa}>
          <div className={`${s.wrap} ${s.faixaIn}`}>
            <div className={s.faixaItem}>
              <strong>{areas.length}</strong>
              <span>áreas de serviço</span>
            </div>
            <div className={s.faixaItem}>
              <strong>{equipe.length}</strong>
              <span>{equipe.length === 1 ? "profissional" : "profissionais"}</span>
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

            {areas.map((area) => (
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
                {equipe.length === 1
                  ? "Uma profissional, com a especialidade dela na página. Você já sabe com quem vai falar antes de chegar."
                  : "Duas profissionais, cada uma com sua especialidade. Você já sabe com quem vai falar antes de chegar."}
              </p>
            </div>
            <div className={s.equipe}>
              {equipe.map((p) => (
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
                <p className={s.texto}>{dados.endereco}</p>
              </div>
              <div className={s.localBloco}>
                <span className={s.pessoaNome}>Horário</span>
                <p className={s.texto}>{dados.horario}</p>
              </div>
              <div className={s.localBloco}>
                <span className={s.pessoaNome}>Pagamento</span>
                <p className={s.texto}>{dados.pagamento}</p>
              </div>
            </div>
          </section>
        </div>

        <div className={s.wrap}>
          <section className={s.fecho}>
            <h2 className={s.fechoTitulo}>{dados.fecho.titulo}</h2>
            <p className={s.fechoTexto}>{dados.fecho.texto}</p>
            <a className={s.botao} href={wa(dados.mensagem)} target="_blank" rel="noopener noreferrer">
              Chamar no WhatsApp
            </a>
          </section>
        </div>
      </main>

      <footer className={s.rodape}>
        <div className={`${s.wrap} ${s.rodapeIn}`}>
          <span>Bside Digital Studio · Maringá e região</span>
          <span>{dados.rodapeNota}</span>
        </div>
      </footer>
    </div>
  );
}
