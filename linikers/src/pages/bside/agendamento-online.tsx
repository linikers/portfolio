import Link from "next/link";
import BsideSeo from "@/components/bside/Seo";
import { wa } from "@/lib/bside";
import s from "@/styles/bside-servico.module.scss";

/**
 * /bside/agendamento-online — página de SERVIÇO indexável.
 *
 * Par da /bside/cardapio-digital: cobre o outro termo que negócio local digita no Google
 * ("agendamento online", "agenda para barbearia", "marcar horário pelo WhatsApp").
 * Indexável e no sitemap. Sem promessa de resultado, sem preço no corpo do texto.
 */

const PERGUNTAS = [
  {
    q: "O cliente precisa criar conta para marcar?",
    r: "Não. Ele escolhe o serviço, vê os horários livres e confirma. Um código curto na tela serve de comprovante.",
  },
  {
    q: "Funciona fora do horário comercial?",
    r: "Sim, e é aí que rende mais. Boa parte das marcações acontece à noite, quando o cliente lembra. A agenda responde sozinha.",
  },
  {
    q: "Dá para bloquear horário e cadastrar folga?",
    r: "Sim. Você define os dias e horários de atendimento, bloqueia intervalos e tira folga pelo painel.",
  },
  {
    q: "Serve para salão, clínica e pet shop?",
    r: "Serve para qualquer negócio que trabalha com horário marcado: barbearia, salão, clínica, estética, pet shop, consultoria e aula.",
  },
  {
    q: "O cliente recebe lembrete?",
    r: "O lembrete no WhatsApp pode ser incluído na automação: confirmação na hora da marcação e aviso antes do horário.",
  },
  {
    q: "Quanto tempo leva para ficar no ar?",
    r: "Até 5 dias úteis depois do seu ok na prévia. Você vê como fica antes de pagar.",
  },
];

const OUTROS = [
  { href: "/bside/cardapio-digital", texto: "Cardápio digital" },
  { href: "/bside", texto: "Todos os serviços" },
];

export default function AgendamentoOnlinePage() {
  const link = wa(
    "Oi, Márcia! Vi a página do agendamento online e quero uma agenda para o meu negócio. Meu negócio é: "
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
        title="Agendamento online para barbearia, salão e clínica | BS Studio"
        description="Agenda online que deixa o cliente marcar sozinho, 24 horas por dia, com confirmação no WhatsApp. Serve para barbearia, salão, clínica, estética e pet shop. BS Studio, na área desde 2008."
        path="/bside/agendamento-online"
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
          <p className={s.kicker}>Agendamento online</p>
          <h1 className={s.h1}>O cliente marca sozinho, até às 23h.</h1>
          <p className={s.lead}>
            A agenda mostra os horários livres e o cliente escolhe. Você recebe a marcação com
            nome, serviço e telefone, e a confirmação sai no WhatsApp. Sem trocar mensagem para
            descobrir se terça às 15h está livre.
          </p>
          <a className={s.cta} href={link} rel="noopener">
            Quero uma agenda assim →
          </a>
        </section>

        <section className={s.secao}>
          <h2 className={s.h2}>O horário que se perde no silêncio</h2>
          <p className={s.texto}>
            Quem decide marcar um corte, uma limpeza de pele ou uma consulta costuma decidir fora
            do expediente: depois do trabalho, à noite, no fim de semana. É nesse momento que a
            mensagem chega.
          </p>
          <p className={s.texto}>
            Se a resposta só vem no dia seguinte, o cliente já marcou em outro lugar. A agenda
            online resolve esse intervalo sem você ficar de plantão no celular.
          </p>
        </section>

        <section className={s.secao}>
          <h2 className={s.h2}>Como funciona</h2>
          <ol className={s.passos}>
            <li className={s.passo}>
              <div className={s.passoNum}>01</div>
              <h3 className={s.passoTitulo}>Ele escolhe o serviço</h3>
              <p className={s.passoTexto}>
                Cada serviço tem duração e valor. O cliente vê o que existe antes de escolher.
              </p>
            </li>
            <li className={s.passo}>
              <div className={s.passoNum}>02</div>
              <h3 className={s.passoTitulo}>Vê os horários livres</h3>
              <p className={s.passoTexto}>
                A agenda mostra apenas o que está aberto de verdade, no seu horário de
                atendimento.
              </p>
            </li>
            <li className={s.passo}>
              <div className={s.passoNum}>03</div>
              <h3 className={s.passoTitulo}>Confirma e recebe o aviso</h3>
              <p className={s.passoTexto}>
                A marcação entra no seu painel e a confirmação chega no WhatsApp do cliente.
              </p>
            </li>
          </ol>
        </section>

        <section className={s.secao}>
          <h2 className={s.h2}>O que você recebe</h2>
          <ul className={s.lista}>
            <li>Agenda aberta 24 horas, com os horários livres atualizados sozinhos</li>
            <li>Painel para cadastrar serviços, duração, preço e bloqueio de horário</li>
            <li>Marcação com nome, telefone e serviço escolhido</li>
            <li>Confirmação automática e lembrete antes do horário, opcional</li>
            <li>Link curto para colar na bio e mandar nas conversas</li>
          </ul>
        </section>

        <section className={s.secao}>
          <h2 className={s.h2}>Para quem serve</h2>
          <p className={s.texto}>
            Barbearia, salão de beleza, clínica, estética, pet shop, estúdio de tatuagem,
            consultoria e aula particular. Se o seu atendimento depende de horário marcado, a
            agenda encaixa.
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
          <h2 className={s.h2}>Quer ver a sua agenda funcionando?</h2>
          <p className={s.texto}>
            Você vê a prévia antes de pagar e não precisa passar senha nem código. A BS Studio
            está na área desde 2008.
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
