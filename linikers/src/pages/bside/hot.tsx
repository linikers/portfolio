import { useState } from "react";
import BsideSeo from "@/components/bside/Seo";
import { wa } from "@/lib/bside";
import s from "@/styles/bside-hot.module.scss";

/**
 * /bside/hot — planos de ensaio, vídeo e página própria (Bside Hot).
 *
 * Regras desta rota:
 * - Carteira invisível: noindex, fora do sitemap e sem NENHUM link vindo da
 *   LP pública (/bside) ou de qualquer outra página do domínio.
 * - Contato único: WhatsApp de vendas (a Márcia), via `wa()` de lib/bside.
 * - Sem link para outras rotas: o único destino de clique é o wa.me.
 * - Copy sem travessão, sem emoji, sem CNPJ e sem nome pessoal.
 * - Nada de conteúdo explícito: sensual sim, explícito não (regra do contrato).
 */

const CIDADES = [
  "Maringá",
  "Sarandi",
  "Marialva",
  "Paiçandu",
  "Mandaguaçu",
  "Mandaguari",
  "Astorga",
  "Colorado",
  "Cianorte",
  "Arapongas",
  "Apucarana",
  "Campo Mourão",
];

interface Plano {
  id: string;
  selo?: string;
  nome: string;
  valor: string;
  unidade: string;
  itens: string[];
  cta: string;
  destaque?: boolean;
}

const PLANOS: Plano[] = [
  {
    id: "fotos",
    nome: "Fotos",
    valor: "R$ 300",
    unidade: "uma vez",
    itens: [
      "1 hora de ensaio no seu local",
      "20 fotos tratadas, todas na vertical",
      "3 imagens extras para story",
      "Entrega em 48 horas",
    ],
    cta: "Quero o plano de fotos",
  },
  {
    id: "video",
    nome: "Vídeo",
    valor: "R$ 300",
    unidade: "uma vez",
    itens: [
      "4 vídeos curtos de 15 a 30 segundos",
      "Formato vertical, pronto para story e anúncio",
      "6 capas para usar no perfil",
      "Entrega em 48 horas",
    ],
    cta: "Quero o plano de vídeo",
  },
  {
    id: "pagina",
    selo: "Já tem fotos",
    nome: "Página anual",
    valor: "R$ 300",
    unidade: "por ano",
    itens: [
      "Página só sua, com as fotos que você já tem",
      "Serviços, valores a partir de e bairro",
      "Botão de WhatsApp e link curto",
      "No ar por 12 meses, sem mensalidade",
    ],
    cta: "Quero só a página",
  },
  {
    id: "combo",
    nome: "Fotos + vídeo",
    valor: "R$ 497",
    unidade: "uma vez",
    itens: [
      "Tudo do plano de fotos",
      "Tudo do plano de vídeo",
      "Gravado na mesma visita",
      "Entrega em 48 horas",
    ],
    cta: "Quero fotos e vídeo",
  },
  {
    id: "completo",
    selo: "Mais completo",
    nome: "Completo",
    valor: "R$ 797",
    unidade: "uma vez",
    itens: [
      "Ensaio com 20 fotos tratadas",
      "4 vídeos verticais com capas",
      "Página no ar com link curto e QR",
      "1 ano de página incluído",
    ],
    cta: "Quero o completo",
    destaque: true,
  },
  {
    id: "mensal",
    nome: "Manutenção",
    valor: "R$ 49",
    unidade: "por mês",
    itens: [
      "Hospedagem e domínio da página",
      "3 fotos novas por mês",
      "Ajustes de texto e de valores",
      "Cancele quando quiser",
    ],
    cta: "Quero a manutenção",
  },
];

const DORES = [
  {
    titulo: "Foto de celular no anúncio que você paga para aparecer",
    texto: "Quem procura compara foto. A primeira imagem decide o clique.",
  },
  {
    titulo: "Anúncio sem vídeo",
    texto: "Os sites grandes já empurram vídeo. Quem só tem foto fica atrás.",
  },
  {
    titulo: "Nenhum lugar para mandar quem quer ver mais",
    texto: "Sem página própria, o interessado só tem o telefone para decidir.",
  },
  {
    titulo: "Cidade pequena sem espaço no site de anúncio",
    texto: "Quem atende em Sarandi ou Marialva aparece escondido dentro de Maringá.",
  },
];

const PASSOS = [
  {
    titulo: "Conversa rápida",
    texto: "Cinco minutos no WhatsApp para saber sua cidade, o que você quer mostrar e o melhor dia.",
  },
  {
    titulo: "Agenda no seu local",
    texto: "A gente vai até você, no horário combinado. Sem estúdio, sem plateia, sem identificação.",
  },
  {
    titulo: "Ensaio de 1 hora",
    texto: "Nosso fotógrafo conduz as poses. Você não precisa saber posar, a direção é nossa.",
  },
  {
    titulo: "Entrega em 48 horas",
    texto: "Fotos e vídeos prontos no seu WhatsApp. A página entra no ar em até 3 dias úteis.",
  },
];

const REGRAS = [
  {
    titulo: "Só para maiores de 18 anos",
    texto: "Documento com foto conferido na hora do ensaio, sem exceção.",
  },
  {
    titulo: "Contrato e autorização de imagem",
    texto: "Você assina o que pode ser usado. Nada vai para portfólio público sem a sua autorização por escrito.",
  },
  {
    titulo: "Página sem endereço e sem nome civil",
    texto: "A página mostra bairro e o nome de trabalho que você escolher. O endereço nunca aparece.",
  },
  {
    titulo: "Sem cena explícita",
    texto: "Foto e vídeo sensual, sem conteúdo explícito. Isso mantém a página no ar e o pagamento funcionando.",
  },
  {
    titulo: "Página fora da busca do Google",
    texto: "Só vê quem receber o seu link. A página não aparece em pesquisa e não é listada em nenhum lugar.",
  },
  {
    titulo: "Serviço de mídia, sem comissão",
    texto: "Você paga o pacote e pronto. A gente não cobra nada por atendimento e não intermedeia cliente.",
  },
];

const FAQ = [
  {
    q: "Preciso ter fotos para contratar a página?",
    a: "Não. Se você já tem fotos boas, a página anual de R$ 300 resolve. Se não tem, o plano de fotos de R$ 300 inclui o ensaio e aí a página entra como parte do pacote completo.",
  },
  {
    q: "Vocês atendem a minha cidade?",
    a: "Atendemos Maringá e as cidades da região listadas acima, incluindo as que não têm espaço próprio nos sites de anúncio. Se a sua não estiver na lista, manda mensagem que a gente combina o deslocamento.",
  },
  {
    q: "Meu nome ou meu endereço aparecem?",
    a: "Não. A página usa o nome de trabalho que você escolher e mostra só o bairro. Endereço, nome civil e documento ficam apenas no contrato.",
  },
  {
    q: "A página aparece no Google?",
    a: "Não. Ela é fechada para busca: só abre para quem tem o link ou o QR. É uma página de apoio ao seu anúncio, não um site público.",
  },
  {
    q: "Como funciona o pagamento?",
    a: "Metade para agendar o ensaio, metade na entrega, por Pix. No plano de página anual, o valor é pago uma vez para os 12 meses.",
  },
  {
    q: "Vocês sobem o material no meu anúncio?",
    a: "Não. A gente entrega as fotos e os vídeos tratados, prontos para você subir onde quiser. A conta do site de anúncio é sua e continua sendo só sua.",
  },
  {
    q: "E se eu quiser trocar as fotos depois?",
    a: "A manutenção de R$ 49 por mês inclui 3 fotos novas por mês e os ajustes de texto. Sem fidelidade, cancela quando quiser.",
  },
];

function IconeCheck({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 12.5 9.5 18 20 6.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function BsideHotPage() {
  const [cidade, setCidade] = useState<string>("");

  /** Toda mensagem sai daqui: a cidade escolhida viaja junto para a Márcia saber de onde veio. */
  const mensagem = (plano?: string) => {
    const cidadeTxt = cidade ? ` Atendo em ${cidade}.` : "";
    const planoTxt = plano ? ` Quero o ${plano}.` : "";
    return `Oi, Márcia! Vi a página dos planos da Bside Hot.${planoTxt}${cidadeTxt} Meu nome de trabalho é: `;
  };

  const linkGeral = wa(mensagem());

  return (
    <>
      <BsideSeo
        title="Planos · fotos, vídeo e página para quem atende em Maringá e região"
        description="Ensaio fotográfico, vídeo curto e página própria com discrição total. Planos a partir de R$ 300, feitos no seu local, em Maringá e cidades da região."
        path="/bside/hot"
        noindex
        siteName="Bside Hot"
        themeColor="#0B0D10"
      />
      <div className={s.root}>
        <header className={s.header}>
          <div className={`${s.shell} ${s.headerInner}`}>
            <span className={s.wordmark}>
              Bside <span>Hot</span>
            </span>
            <a className={s.headerCta} href={linkGeral}>
              Falar com a Márcia
            </a>
          </div>
        </header>

        <main>
          {/* HERO */}
          <section className={s.hero}>
            <div className={s.shell}>
              <span className={s.eyebrow}>Maringá e região · maiores de 18</span>
              <h1>
                Sua foto é a primeira impressão.
                <br />
                Deixe ela <em>profissional</em>.
              </h1>
              <p className={s.lead}>
                Ensaio fotográfico, vídeo curto e uma página só sua para quem atende em Maringá e
                nas cidades da região. Feito no seu local, com discrição total. A partir de R$ 300.
              </p>
              <div className={s.heroActions}>
                <a className={s.btnPrimary} href={linkGeral}>
                  Ver planos no WhatsApp
                </a>
                <a className={s.btnGhost} href="#planos">
                  Ver os planos aqui
                </a>
              </div>
              <p className={s.micro}>Quem te responde no WhatsApp é a Márcia, do nosso time.</p>
              <ul className={s.provas}>
                <li>Ensaio no seu local</li>
                <li>Entrega em 48 horas</li>
                <li>Página fora da busca do Google</li>
              </ul>
            </div>
          </section>

          {/* PLANOS */}
          <section className={s.section} id="planos">
            <div className={s.shell}>
              <div className={s.sectionHead}>
                <h2>Planos</h2>
                <p>
                  Preço fechado, sem surpresa. Dá para começar só com as fotos e depois somar vídeo
                  e página, pagando a diferença.
                </p>
              </div>
              <div className={s.planos}>
                {PLANOS.map((plano) => (
                  <article
                    key={plano.id}
                    className={`${s.plano} ${plano.destaque ? s.planoDestaque : ""}`}
                  >
                    {plano.selo ? <span className={s.selo}>{plano.selo}</span> : <span className={s.seloVazio} aria-hidden="true" />}
                    <h3 className={s.planoNome}>{plano.nome}</h3>
                    <p className={s.planoValor}>
                      {plano.valor} <small>{plano.unidade}</small>
                    </p>
                    <ul className={s.planoLista}>
                      {plano.itens.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <a className={s.planoCta} href={wa(mensagem(plano.nome))}>
                      {plano.cta}
                    </a>
                  </article>
                ))}
              </div>
              <p className={s.notaPlanos}>
                Ensaio e vídeo podem ser feitos pelo nosso fotógrafo no mesmo dia. Para cidades da
                região, o deslocamento é combinado junto no WhatsApp.
              </p>
            </div>
          </section>

          {/* DORES */}
          <section className={s.section}>
            <div className={s.shell}>
              <div className={s.sectionHead}>
                <h2>O que muda no seu anúncio</h2>
                <p>Não é sobre aparecer mais. É sobre quem clica em você, clicar por um motivo melhor.</p>
              </div>
              <div className={s.dores}>
                {DORES.map((dor) => (
                  <div key={dor.titulo} className={s.dor}>
                    <IconeCheck className={s.dorIcon} />
                    <p>
                      <b>{dor.titulo}.</b> {dor.texto}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* PASSOS */}
          <section className={s.section}>
            <div className={s.shell}>
              <div className={s.sectionHead}>
                <h2>Como funciona</h2>
                <p>Do primeiro contato até o material pronto, em uma semana.</p>
              </div>
              <div className={s.passos}>
                {PASSOS.map((passo) => (
                  <article key={passo.titulo} className={s.passo}>
                    <h3>{passo.titulo}</h3>
                    <p>{passo.texto}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* CIDADES */}
          <section className={s.section} id="cidades">
            <div className={s.shell}>
              <div className={s.sectionHead}>
                <h2>Onde a gente atende</h2>
                <p>
                  Maringá e as cidades da região, inclusive as que não têm espaço próprio nos sites
                  de anúncio. Toque na sua cidade e a mensagem já vai pronta com ela.
                </p>
              </div>
              <div className={s.cidades}>
                {CIDADES.map((nome) => (
                  <button
                    key={nome}
                    type="button"
                    className={`${s.cidade} ${cidade === nome ? s.cidadeAtiva : ""}`}
                    aria-pressed={cidade === nome}
                    onClick={() => setCidade(cidade === nome ? "" : nome)}
                  >
                    {nome}
                  </button>
                ))}
              </div>
              {cidade ? (
                <p className={s.cidadeAviso}>
                  Anotado: {cidade}. A mensagem já vai com a sua cidade.
                </p>
              ) : null}
              <p className={s.cidadeHint}>
                Não achou a sua? Manda mensagem de qualquer forma, a gente combina o deslocamento.
              </p>
              <p className={s.cidadeHint}>
                <a className={s.headerCta} href={wa(mensagem())}>
                  Falar com a Márcia
                </a>
              </p>
            </div>
          </section>

          {/* REGRAS */}
          <section className={s.section}>
            <div className={s.shell}>
              <div className={s.sectionHead}>
                <h2>Discrição e regras do trabalho</h2>
                <p>O que está escrito aqui vale para todo ensaio e toda página.</p>
              </div>
              <div className={s.regras}>
                {REGRAS.map((regra) => (
                  <div key={regra.titulo} className={s.regra}>
                    <IconeCheck className={s.regraIcon} />
                    <p>
                      <b>{regra.titulo}.</b> {regra.texto}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className={s.section}>
            <div className={s.shell}>
              <div className={s.sectionHead}>
                <h2>Perguntas frequentes</h2>
              </div>
              <div className={s.faq}>
                {FAQ.map((item) => (
                  <details key={item.q} className={s.faqItem}>
                    <summary>{item.q}</summary>
                    <p>{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* CTA FINAL */}
          <section className={s.final}>
            <div className={s.shell}>
              <h2>Se o seu anúncio já vende, ele pode vender melhor.</h2>
              <p>
                Manda uma mensagem com a sua cidade e o que você quer. A Márcia responde com o dia
                disponível e o valor fechado.
              </p>
              <div className={s.finalActions}>
                <a className={s.btnPrimary} href={wa(mensagem())}>
                  Chamar a Márcia no WhatsApp
                </a>
              </div>
              <p className={s.micro}>Prévia antes de pagar. Nada é publicado sem a sua autorização.</p>
            </div>
          </section>
        </main>

        <footer className={s.rodape}>
          <div className={`${s.shell} ${s.rodapeInner}`}>
            <span>Bside Hot · Maringá e região</span>
            <span className={s.rodapeAviso}>Conteúdo para maiores de 18 anos</span>
          </div>
        </footer>

        <div className={s.barra}>
          <a className={s.btnPrimary} href={wa(mensagem())}>
            Falar com a Márcia
          </a>
        </div>
      </div>
    </>
  );
}
