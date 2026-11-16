import Link from "next/link";
import BsideSeo from "@/components/bside/Seo";
import { wa } from "@/lib/bside";
import s from "@/styles/bside-servico.module.scss";

/**
 * /bside/nota-fiscal — página de SERVIÇO indexável: conferência e organização de
 * documentos fiscais para escritório de contabilidade.
 *
 * Por que existe: o produto já roda no servidor (consulta de NF-e, NFS-e, CT-e,
 * MDF-e e NFC-e, validação de chave e assinatura, DANFE em PDF, organização de XML,
 * SPED/eSocial) e não tinha nenhuma página disputando a busca. Escritório de
 * contabilidade é o público que mais sofre com XML solto e o que busca o termo todo
 * mês: "consultar NF-e por chave", "conferir nota fiscal", "organizar XML".
 *
 * Regras da casa que valem aqui:
 * - índice da página é indexável (diferente das demos, que são noindex);
 * - NÃO existe preço ratificado para este serviço: a página diz que o valor fecha
 *   pelo volume de notas e devolve a pergunta, nunca inventa mensalidade;
 * - não prometer prazo fiscal nem substituir o sistema emissor do escritório;
 * - nunca pedir senha, código ou certificado digital.
 */

const PERGUNTAS = [
  {
    q: "Isso substitui o sistema que o escritório já usa?",
    r: "Não. A conferência lê o que já foi emitido: valida a chave, confere o XML, gera o DANFE e organiza os arquivos. A emissão continua no sistema e no certificado do escritório.",
  },
  {
    q: "Quais documentos entram?",
    r: "NF-e, NFS-e, CT-e, MDF-e e NFC-e. A consulta é pela chave de acesso ou pelo XML que o cliente já mandou.",
  },
  {
    q: "E a NFS-e da prefeitura?",
    r: "Maringá passou a emitir no padrão nacional em 01/07/2026 (Decreto 2.453/2025), e a consulta acompanha esse padrão. Para município que ainda tem sistema próprio, a gente confere o que a prefeitura devolve.",
  },
  {
    q: "Como funciona no dia a dia do escritório?",
    r: "O escritório manda a chave ou o XML no WhatsApp e recebe a conferência pronta: situação da nota, se a assinatura confere e o PDF do DANFE quando existe.",
  },
  {
    q: "Quanto custa?",
    r: "Depende do volume de notas que o escritório processa por mês. A gente olha o número real de documentos e fecha o valor por escrito, sem mensalidade inventada.",
  },
  {
    q: "Vocês pedem senha ou certificado?",
    r: "Nunca. A conferência usa a chave de acesso, que é pública. A BS Studio não pede senha, código nem certificado digital em nenhum momento.",
  },
];

const OUTROS = [
  { href: "/bside/cardapio-digital", texto: "Cardápio digital" },
  { href: "/bside/agendamento-online", texto: "Agendamento online" },
  { href: "/bside", texto: "Todos os serviços" },
];

export default function NotaFiscalPage() {
  const link = wa(
    "Oi, Márcia! Vi a página de conferência de nota fiscal e quero entender para o meu escritório. O escritório é: "
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
        title="Conferência de NF-e, NFS-e, CT-e e MDF-e para escritório contábil | BS Studio"
        description="Confira chave e XML de nota fiscal, gere DANFE em PDF e organize os arquivos por cliente e por mês. Consulta por chave de acesso, sem pedir senha nem certificado. BS Studio, na área desde 2008."
        path="/bside/nota-fiscal"
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
          <p className={s.kicker}>Conferência de nota fiscal</p>
          <h1 className={s.h1}>A nota chega conferida antes de virar problema.</h1>
          <p className={s.lead}>
            O escritório manda a chave ou o XML no WhatsApp e recebe de volta a situação da nota,
            a conferência da assinatura e o DANFE em PDF. No fim do mês, os arquivos estão
            separados por cliente em vez de espalhados em três pastas de download.
          </p>
          <a className={s.cta} href={link} rel="noopener">
            Quero conferir minhas notas →
          </a>
        </section>

        <section className={s.secao}>
          <h2 className={s.h2}>Onde o XML se perde hoje</h2>
          <p className={s.texto}>
            Escritório com trinta clientes recebe nota por WhatsApp, por e-mail, por pasta
            compartilhada e por download do portal. Quando o cliente pergunta &quot;aquela nota de
            março saiu certa?&quot;, a resposta depende de alguém lembrar em qual lugar o arquivo
            foi parar.
          </p>
          <p className={s.texto}>
            Conferir uma chave no site da Sefaz resolve uma nota. Conferir a carteira inteira, com
            o mesmo critério e no mesmo lugar, é o que muda o mês do escritório.
          </p>
          <p className={s.texto}>
            O serviço não emite e não substitui o seu sistema: ele lê, confere e organiza o que já
            foi emitido, para a conferência deixar de ser trabalho manual.
          </p>
        </section>

        <section className={s.secao}>
          <h2 className={s.h2}>Como funciona</h2>
          <ol className={s.passos}>
            <li className={s.passo}>
              <div className={s.passoNum}>01</div>
              <h3 className={s.passoTitulo}>Você manda a chave ou o XML</h3>
              <p className={s.passoTexto}>
                No WhatsApp do escritório mesmo. Não precisa instalar nada nem abrir portal.
              </p>
            </li>
            <li className={s.passo}>
              <div className={s.passoNum}>02</div>
              <h3 className={s.passoTitulo}>A nota volta conferida</h3>
              <p className={s.passoTexto}>
                Situação na Sefaz, assinatura conferida e o que estiver fora do padrão apontado.
              </p>
            </li>
            <li className={s.passo}>
              <div className={s.passoNum}>03</div>
              <h3 className={s.passoTitulo}>O arquivo é organizado</h3>
              <p className={s.passoTexto}>
                XML guardado por cliente e por mês, com o DANFE em PDF quando você precisar
                mostrar.
              </p>
            </li>
          </ol>
        </section>

        <section className={s.secao}>
          <h2 className={s.h2}>O que o escritório recebe</h2>
          <ul className={s.lista}>
            <li>Consulta por chave de acesso de NF-e, NFS-e, CT-e, MDF-e e NFC-e</li>
            <li>Conferência da assinatura e do XML que chegou do cliente</li>
            <li>DANFE em PDF gerado a partir do arquivo autorizado</li>
            <li>XML organizado por cliente e por competência, sem pasta perdida</li>
            <li>Base para SPED e eSocial sair do mesmo lugar em que a nota foi conferida</li>
          </ul>
        </section>

        <section className={s.secao}>
          <h2 className={s.h2}>Para quem serve</h2>
          <p className={s.texto}>
            Escritório de contabilidade com carteira de clientes, departamento fiscal de empresa
            média e quem cuida de nota de terceiro. Se o mês fecha com XML espalhado e conferência
            manual, o serviço encaixa. Para quem emite duas notas por mês, o ganho é pequeno: a
            gente fala isso antes de vender.
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
          <h2 className={s.h2}>Quer ver com as suas notas?</h2>
          <p className={s.texto}>
            Manda uma chave de acesso no WhatsApp e a gente devolve a conferência dela. Serve como
            teste, sem cadastro e sem pedir senha. O valor do serviço fecha pelo volume de notas do
            escritório, por escrito.
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
          BS Studio · sites, cardápios digitais, agendamento online, automação de WhatsApp e
          conferência de documento fiscal. Atendimento para negócio local, na área desde 2008.
        </footer>
      </div>
    </div>
  );
}
