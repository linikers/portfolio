import BsideSeo from "@/components/bside/Seo";
import s from "@/styles/bside-hot-modelo.module.scss";

/**
 * /bside/hot/modelo — página de exemplo da carteira Bside Hot.
 *
 * Existe para a cliente ver, antes de fechar, como a página dela fica: retrato,
 * galeria, valores e botão de WhatsApp. É vitrine de venda, não página de cliente.
 *
 * Regras:
 * - noindex, fora do sitemap e sem link vindo de /bside ou /bside/hot.
 * - Nenhuma foto explícita: o que está aqui é retrato de rosto e bastidor de roupa.
 *   A galeria tem espaços marcados como reservados, que são as fotos da cliente.
 * - Contato aponta para o WhatsApp de vendas (a Márcia), nunca para terceiro.
 */

const NOME = "Lívia";
const CIDADE = "Cianorte";
const IDADE = "26 anos";
const WHATSAPP = "5544991528386";

const GALERIA = [
  { tipo: "foto", src: "/bside/hot/modelo/bastidor.webp", alt: "Ensaio em estúdio, bastidor de escolha de roupa" },
  { tipo: "reservado", label: "Foto da cliente" },
  { tipo: "reservado", label: "Foto da cliente" },
  { tipo: "reservado", label: "Foto da cliente" },
] as const;

const VALORES = [
  { titulo: "1 hora", valor: "R$ 300", obs: "Atendimento com hora marcada, local discreto." },
  { titulo: "2 horas", valor: "R$ 500", obs: "Inclui tempo para conversa e jantar, se quiser." },
  { titulo: "Pernoite", valor: "a combinar", obs: "Valor e disponibilidade direto no WhatsApp." },
];

export default function ModeloHot() {
  const link = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    `Oi, vi a página da ${NOME} e queria saber sobre horários.`
  )}`;

  return (
    <main className={s.root}>
      <BsideSeo
        title={`${NOME} · ${CIDADE}`}
        description={`Página de exemplo da Bside Hot. ${NOME}, ${IDADE}, ${CIDADE}.`}
        path="/bside/hot/modelo"
        noindex
        siteName="Bside Hot"
        themeColor="#08090c"
      />

      <div className={s.faixa}>
        <span>
          Página de <strong>exemplo</strong> · feita pela Bside Hot
        </span>
      </div>

      <section className={s.hero}>
        <div className={s.heroTexto}>
          <span className={s.olho}>{CIDADE} · atendimento com hora marcada</span>
          <h1 className={s.titulo}>
            {NOME}, <em>{IDADE}</em>
          </h1>
          <p className={s.sub}>
            Discreta, sem pressa e com local reservado. Aqui você vê meus horários, meus valores e
            fala comigo direto no WhatsApp, sem passar por anúncio de terceiro.
          </p>
          <a className={s.cta} href={link} target="_blank" rel="noopener noreferrer">
            Chamar no WhatsApp
          </a>
          <p className={s.ctaSecundario}>
            Resposta no mesmo dia, das 10h às 22h. Sigilo garantido.
          </p>
        </div>

        <div className={s.heroFoto}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/bside/hot/modelo/retrato.webp" alt={`Retrato de ${NOME}`} width={1200} height={609} />
          <span className={s.seloFoto}>Foto de exemplo</span>
        </div>
      </section>

      <section className={s.secao}>
        <h2 className={s.secaoTitulo}>Sobre mim</h2>
        <p className={s.secaoTexto}>
          Sou de {CIDADE} e atendo na região com hora marcada. Gosto de conversa boa, ambiente
          tranquilo e de deixar tudo combinado antes, sem surpresa. Se for a primeira vez, me chama
          no WhatsApp que eu explico como funciona.
        </p>
        <div className={s.dados}>
          <div className={s.dado}>
            <span>Cidade</span>
            <strong>{CIDADE}</strong>
          </div>
          <div className={s.dado}>
            <span>Idade</span>
            <strong>{IDADE}</strong>
          </div>
          <div className={s.dado}>
            <span>Atendimento</span>
            <strong>10h às 22h</strong>
          </div>
          <div className={s.dado}>
            <span>Local</span>
            <strong>Privado</strong>
          </div>
        </div>
      </section>

      <section className={s.secao}>
        <h2 className={s.secaoTitulo}>Fotos</h2>
        <p className={s.secaoTexto}>
          As fotos são da própria cliente, trocadas por ela quando a página é publicada. Os espaços
          marcados abaixo mostram onde elas entram.
        </p>
        <div className={s.galeria}>
          {GALERIA.map((item, i) =>
            item.tipo === "foto" ? (
              <figure key={`f-${i}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.src} alt={item.alt} loading="lazy" />
              </figure>
            ) : (
              <figure key={`r-${i}`}>
                <div className={s.reservado}>
                  <strong>{item.label}</strong>
                  <span>reservado</span>
                </div>
              </figure>
            )
          )}
        </div>
      </section>

      <section className={s.secao}>
        <h2 className={s.secaoTitulo}>Valores</h2>
        <p className={s.secaoTexto}>
          Valores de exemplo. Na página da cliente entram os valores dela, e ela muda quando quiser,
          sem depender de ninguém.
        </p>
        <div className={s.valores}>
          {VALORES.map(v => (
            <div key={v.titulo} className={s.valor}>
              <h3>{v.titulo}</h3>
              <p>{v.valor}</p>
              <small>{v.obs}</small>
            </div>
          ))}
        </div>
      </section>

      <section className={s.secao}>
        <h2 className={s.secaoTitulo}>Como funciona</h2>
        <p className={s.secaoTexto}>
          Você chama no WhatsApp, combina horário e local, e recebe a confirmação. Nada de cadastro,
          nada de intermediário, nada de pagamento antecipado. O combinado é direto comigo.
        </p>
      </section>

      <footer className={s.rodape}>
        <p>
          <strong>Página de exemplo da Bside Hot.</strong> Este endereço existe só para apresentação
          do serviço. A cliente recebe a página dela em endereço próprio, com as fotos e os valores
          dela. Conteúdo para maiores de 18 anos.
        </p>
      </footer>

      <div className={s.barra}>
        <a className={s.cta} href={link} target="_blank" rel="noopener noreferrer">
          Chamar no WhatsApp
        </a>
      </div>
    </main>
  );
}
