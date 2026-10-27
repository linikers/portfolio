import Link from "next/link";
import BsideSeo from "@/components/bside/Seo";
import { wa } from "@/lib/bside";
import s from "@/styles/bside-servico.module.scss";

/**
 * /bside/cardapio-digital — página de SERVIÇO indexável.
 *
 * Por que existe: as demos (/bside/cardapio-demo) são noindex de propósito, então a
 * Bside não tinha nenhuma página disputando a busca "cardápio digital Maringá" — que é
 * exatamente o termo que o dono de restaurante digita. Esta página é a porta de entrada
 * orgânica: texto de serviço, sem promessa de resultado, com CTA para o WhatsApp de vendas.
 *
 * Diferente das demos: indexável, entra no sitemap, sem selo DEMO e sem dado de exemplo.
 */

const PERGUNTAS = [
  {
    q: "Preciso baixar aplicativo para o cliente pedir?",
    r: "Não. O cardápio abre no navegador do celular, pelo link que você manda. O cliente escolhe os itens e o pedido chega no seu WhatsApp já escrito.",
  },
  {
    q: "O pedido cai no meu WhatsApp normal?",
    r: "Sim, no mesmo número que você já usa. Chega com item, quantidade, endereço e total. Você confere e responde por lá, do jeito que já faz hoje.",
  },
  {
    q: "Consigo mudar preço e marcar item esgotado sozinho?",
    r: "Sim. O painel é seu: você edita preço, descrição e disponibilidade sem depender da gente.",
  },
  {
    q: "Serve para lanchonete, pizzaria e doceria?",
    r: "Serve para qualquer negócio que vende por cardápio: restaurante, lanchonete, pizzaria, doceria, açaí, marmita e buffet.",
  },
  {
    q: "Quanto tempo leva para ficar no ar?",
    r: "Até 5 dias úteis depois que você manda as fotos e os itens. Você recebe a prévia antes de pagar.",
  },
  {
    q: "Vocês cobram comissão sobre as vendas?",
    r: "Não. O pedido vai direto para o seu WhatsApp. Não existe taxa por pedido nem intermediário entre você e o cliente.",
  },
];

const OUTROS = [
  { href: "/bside/agendamento-online", texto: "Agendamento online" },
  { href: "/bside", texto: "Todos os serviços" },
];

export default function CardapioDigitalPage() {
  const link = wa(
    "Oi, Márcia! Vi a página do cardápio digital e quero um para o meu negócio. Meu negócio é: "
  );

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PERGUNTAS.map((p) => ({
      "@type": "Question",
      name: p.q,
      acceptedAnswer: { "@type": "Answer", text: p.r },
    })),
  };

  return (
    <div className={s.root}>
      <BsideSeo
        title="Cardápio digital para restaurante e delivery | BS Studio"
        description="Cardápio digital que manda o pedido pronto no WhatsApp: item, quantidade, endereço e total. Sem aplicativo, sem comissão por pedido. BS Studio, na área desde 2008."
        path="/bside/cardapio-digital"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className={s.wrap}>
        <header className={s.topo}>
          <Link className={s.marca} href="/bside">
            BS Studio
          </Link>
          <Link className={s.voltar} href="/bside">
            ← voltar para a Bside
          </Link>
        </header>

        <section className={s.hero}>
          <p className={s.kicker}>Cardápio digital</p>
          <h1 className={s.h1}>O pedido chega montado no seu WhatsApp.</h1>
          <p className={s.lead}>
            O cliente escolhe no cardápio do celular e o pedido cai escrito na sua conversa:
            item, quantidade, endereço e total. Sem aplicativo para baixar, sem comissão por
            pedido e sem três mensagens soltas para montar o que ele queria.
          </p>
          <a className={s.cta} href={link} rel="noopener">
            Quero um cardápio assim →
          </a>
        </section>

        <section className={s.secao}>
          <h2 className={s.h2}>Por que o pedido se perde hoje</h2>
          <p className={s.texto}>
            Quase todo negócio que vende por WhatsApp recebe o mesmo tipo de mensagem: &quot;tem
            isso?&quot;, &quot;quanto é?&quot;, &quot;fecha com entrega?&quot;. Cada pergunta é uma
            ida e volta, e cada ida e volta é tempo seu no meio do serviço.
          </p>
          <p className={s.texto}>
            No horário de pico isso vira fila. Quem responde primeiro fecha. Não é o preço que
            perde a venda: é o tempo entre a pergunta e a resposta.
          </p>
          <p className={s.texto}>
            O cardápio digital não muda o seu WhatsApp. Muda a mensagem que chega nele: em vez de
            uma dúvida, chega um pedido fechado.
          </p>
        </section>

        <section className={s.secao}>
          <h2 className={s.h2}>Como funciona</h2>
          <ol className={s.passos}>
            <li className={s.passo}>
              <div className={s.passoNum}>01</div>
              <h3 className={s.passoTitulo}>O cliente abre o link</h3>
              <p className={s.passoTexto}>
                Você manda o link na bio, no status e nas conversas. Abre no navegador, sem
                instalar nada.
              </p>
            </li>
            <li className={s.passo}>
              <div className={s.passoNum}>02</div>
              <h3 className={s.passoTitulo}>Ele monta o pedido</h3>
              <p className={s.passoTexto}>
                Escolhe os itens, a quantidade e o endereço. Vê o total antes de confirmar.
              </p>
            </li>
            <li className={s.passo}>
              <div className={s.passoNum}>03</div>
              <h3 className={s.passoTitulo}>Chega no seu WhatsApp</h3>
              <p className={s.passoTexto}>
                A mensagem chega pronta, com o pedido inteiro. Você confere, responde e produz.
              </p>
            </li>
          </ol>
        </section>

        <section className={s.secao}>
          <h2 className={s.h2}>O que você recebe</h2>
          <ul className={s.lista}>
            <li>Cardápio organizado por categoria, com foto e descrição de cada item</li>
            <li>Preço e disponibilidade que você mesmo edita, sem depender de ninguém</li>
            <li>Pedido fechado chegando no WhatsApp, com total calculado</li>
            <li>Uma página sua, com endereço, horário e formas de pagamento</li>
            <li>Link curto para colar na bio e no status</li>
          </ul>
        </section>

        <section className={s.secao}>
          <h2 className={s.h2}>Para quem serve</h2>
          <p className={s.texto}>
            Restaurante, lanchonete, pizzaria, doceria, açaí, marmita, buffet e food truck. Se o
            seu negócio vende por cardápio e atende por WhatsApp, o cardápio digital encaixa.
          </p>
        </section>

        <section className={s.secao}>
          <h2 className={s.h2}>Perguntas frequentes</h2>
          <div className={s.faq}>
            {PERGUNTAS.map((p) => (
              <details className={s.pergunta} key={p.q}>
                <summary>{p.q}</summary>
                <p>{p.r}</p>
              </details>
            ))}
          </div>
        </section>

        <section className={s.fechamento}>
          <h2 className={s.h2}>Quer ver como fica no seu negócio?</h2>
          <p className={s.texto}>
            Você recebe a prévia antes de pagar e não precisa passar senha nem código em nenhum
            momento. A BS Studio está na área desde 2008.
          </p>
          <a className={s.cta} href={link} rel="noopener">
            Chamar no WhatsApp →
          </a>
          <div className={s.outros}>
            {OUTROS.map((o) => (
              <Link className={s.outroLink} href={o.href} key={o.href}>
                {o.texto}
              </Link>
            ))}
          </div>
        </section>

        <footer className={s.rodape}>
          BS Studio · sites, cardápios digitais, agendamento online e automação de WhatsApp.
          Atendimento para negócio local, na área desde 2008.
        </footer>
      </div>
    </div>
  );
}
