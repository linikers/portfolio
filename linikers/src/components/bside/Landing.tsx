import Link from "next/link";
import s from "@/styles/bside.module.scss";
import { wa, WA_MSG } from "@/lib/bside";
import {
  BsLogo,
  CellIcon,
  CheckIcon,
  GrainOverlay,
  MobileWhatsAppBar,
  PixelCorner,
  PixelDivider,
  PixelTrail,
  WhatsAppIcon,
  type IconeNome,
} from "./Ui";

/**
 * LP one-page da Bside Digital Studio (/bside).
 * Wireframe e copy: RESPOSTA-SERVICOS-v3.md (11 seções) + textos literais de
 * RESPOSTA-CONVERSA-v3.md. Nenhum link daqui aponta para fora de /bside e demos
 * (as outras rotas do domínio têm outra oferta e outros preços).
 */

/* ------------------------------------------------------------------ */
/* Faixa "O QUE A GENTE FAZ" (9 serviços + célula de saída)             */
/* ------------------------------------------------------------------ */

interface Celula {
  icone: IconeNome;
  nome: string;
  linha: string;
  href: string;
  externo?: boolean;
  demo?: boolean;
  larga?: boolean;
  cta?: boolean;
  /** Linha de apoio extra (ex.: condição da verba de anúncios). */
  nota?: string;
}

const CELULAS: Celula[] = [
  {
    icone: "pagina",
    nome: "Página profissional",
    linha: "Sua presença no Google com botão de WhatsApp",
    href: "#precos",
  },
  {
    icone: "site",
    nome: "Site completo",
    linha: "Até 5 páginas, com a ficha do Google otimizada",
    href: "#precos",
  },
  {
    icone: "cardapio",
    nome: "Cardápio digital",
    linha: "Seu menu num link, pedido caindo no WhatsApp",
    href: "#modelos",
    demo: true,
  },
  {
    icone: "agenda",
    nome: "Agendamento online",
    linha: "O cliente marca sozinho, no horário que está livre",
    href: "#modelos",
    demo: true,
  },
  {
    icone: "automacao",
    nome: "Automação de WhatsApp",
    linha: "Respostas e lembretes no automático, pelo WhatsApp oficial",
    href: "#precos",
  },
  {
    icone: "sistema",
    nome: "Sistemas com painel",
    linha: "Clientes, produtos e relatórios num lugar só",
    href: "#precos",
  },
  {
    icone: "hospedagem",
    nome: "Hospedagem e manutenção",
    linha: "A gente cuida do site no ar, você cuida do negócio",
    href: "#precos",
  },
  // Célula nova desta rodada: tráfego pago entrou no escopo.
  // PREÇO A DEFINIR pelo dono: não exibir valor para anúncios até ratificação.
  // CTA literal: "quero saber sobre os anúncios".
  {
    icone: "anuncios",
    nome: "Anúncios no Google e Facebook",
    linha: "Tráfego pago para alcançar quem já está procurando",
    nota: "A verba é paga por você direto ao Google e ao Facebook; a gente cuida da campanha.",
    href: wa(WA_MSG.anuncios),
    externo: true,
  },
  // Célula nova desta rodada: painel de marketing com IA vendido como serviço.
  // PREÇO A DEFINIR pelo dono: não exibir valor para o painel até ratificação.
  // CTA literal: "quero conhecer o painel".
  {
    icone: "painel",
    nome: "Painel de marketing com IA",
    linha: "Campanhas, clientes e resultados num painel só",
    href: wa(WA_MSG.painelIa),
    externo: true,
    larga: true,
  },
  // Célula nova (adendo do dono): emissão de notas fiscais para negócios.
  // PREÇO A DEFINIR pelo dono: não exibir valor para emissão de notas até ratificação.
  // CTA literal do dono, roteando para o WhatsApp como as demais.
  {
    icone: "notas",
    nome: "Emissão de notas fiscais",
    linha: "Nota fiscal de serviço para o seu negócio, quando você precisar",
    href: wa(WA_MSG.notasFiscais),
    externo: true,
  },
  {
    icone: "mais",
    nome: "Não achou?",
    linha: "Me conta o que o seu negócio precisa. A gente monta.",
    href: wa(WA_MSG.naoAchou),
    externo: true,
    cta: true,
  },
];

const CONFIANCA = [
  { num: "7 dias", linha: "é o prazo máximo até o seu site estar no ar" },
  {
    num: "12 meses",
    linha: "de hospedagem e manutenção inclusos na página e nos combos",
  },
  { num: "Desde 2008", linha: "mais de 15 anos fazendo sites e sistemas" },
  {
    num: "Maringá e região",
    linha: "atendemos Rolândia, Londrina, Cambé e Mandaguari também",
  },
];

const PASSOS = [
  {
    num: "01",
    titulo: "Você chama no WhatsApp",
    linha: "Me conta o seu negócio e o que precisa. Sem formulário.",
  },
  {
    num: "02",
    titulo: "Eu monto e você vê a prévia",
    linha: "Você aprova como vai ficar antes de pagar qualquer coisa.",
  },
  {
    num: "03",
    titulo: "No ar em poucos dias",
    linha: "Aprova, paga e o site entra no ar com endereço próprio.",
  },
];

const SERVICOS_RODAPE = [
  { nome: "Página profissional", href: "#precos" },
  { nome: "Site completo", href: "#precos" },
  { nome: "Cardápio digital", href: "#modelos" },
  { nome: "Agendamento online", href: "#modelos" },
  { nome: "Automação de WhatsApp", href: "#precos" },
  { nome: "Sistemas com painel", href: "#precos" },
  { nome: "Anúncios no Google e Facebook", href: "#o-que-fazemos" },
  { nome: "Painel de marketing com IA", href: "#o-que-fazemos" },
  { nome: "Emissão de notas fiscais", href: "#o-que-fazemos" },
  { nome: "Hospedagem e manutenção", href: "#precos" },
];

/* ------------------------------------------------------------------ */
/* Seções                                                              */
/* ------------------------------------------------------------------ */

function Header() {
  return (
    <header className={s.header}>
      <div className={`${s.container} ${s.headerInner}`}>
        <Link href="/bside" className={s.logoLink} aria-label="Bside Digital Studio">
          <BsLogo size={176} variant="mark" />
        </Link>
        <span className={s.headerLinha}>
          Sites e sistemas · Maringá/PR · desde 2008
        </span>
        <a
          className={`${s.btn} ${s.btnPrimary} ${s.btnSmall}`}
          href={wa(WA_MSG.geral)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon />
          Falar no WhatsApp
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className={s.hero} id="topo">
      <PixelCorner />
      <div className={s.scanlines} aria-hidden="true" />
      <div className={`${s.container} ${s.heroInner} ${s.heroGrade}`}>
        <div className={s.heroTexto}>
          <p className={s.kicker}>Sites, cardápio e agenda · Maringá e região</p>
          <h1 className={s.h1}>
            Seu site no ar
            <br />
            em <span className={s.destaque}>7 dias</span>.
            <br />
            O pedido cai
            <br />
            no <span className={s.ciano}>WhatsApp</span>.
          </h1>
          <p className={s.heroSub}>
            Cardápio, agendamento e automação no mesmo pacote. Você conta o que
            o negócio precisa, eu monto, você aprova a prévia e publica.
          </p>
          <div className={s.heroAcoes}>
            <div>
              <a
                className={`${s.btn} ${s.btnPrimary} ${s.btnGrande}`}
                href={wa(WA_MSG.geral)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon />
                Falar no WhatsApp
              </a>
              <p className={s.btnMicro}>
                <strong>Resposta no mesmo dia</strong>, de segunda a sexta. Sem
                compromisso.
              </p>
              <p className={s.btnMicro}>
                Quem te responde no WhatsApp é a Márcia, do nosso time.
              </p>
            </div>
          </div>
          <a className={s.heroLink} href="#modelos">
            Ver modelos por segmento ↓
          </a>
        </div>

        {/* Prova visual: o que a promessa significa na prática. Sem isso a
            dobra afirma resultado e não mostra nada. */}
        <aside className={s.heroProva} aria-label="Exemplo de pedido chegando no WhatsApp">
          <div className={s.chatTopo}>
            <span className={s.chatAvatar} aria-hidden="true">
              M
            </span>
            <span>
              <span className={s.chatNome}>Padaria Pão Quente</span>
              <span className={s.chatStatus}>online agora</span>
            </span>
          </div>
          <p className={`${s.chatMsg} ${s.chatIn}`}>
            Boa tarde! Queria encomendar 2 pães de mel e um bolo de cenoura
          </p>
          <p className={s.chatHora}>11:42</p>
          <p className={`${s.chatMsg} ${s.chatOut}`}>
            Boa tarde! Anotei: 2 pães de mel + bolo de cenoura. Retirada hoje às
            17h, pode ser?
          </p>
          <p className={s.chatHora}>11:43</p>
          <p className={`${s.chatMsg} ${s.chatIn}`}>Perfeito, obrigado!</p>
          <p className={s.chatHora}>11:43</p>
        </aside>
      </div>
    </section>
  );
}

function Confianca() {
  return (
    <section className={s.confianca} id="confianca">
      <div className={s.container}>
        <p className={s.kicker}>Por que dá pra confiar</p>
        <div className={s.confiancaGrade}>
          {CONFIANCA.map((item) => (
            <div className={s.confiancaItem} key={item.num}>
              <span className={s.confiancaNum}>{item.num}</span>
              <span className={s.confiancaLinha}>{item.linha}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={s.container}>
        <PixelDivider />
      </div>
    </section>
  );
}

function OQueFazemos() {
  return (
    <section className={s.fazemos} id="o-que-fazemos">
      <div className={s.container}>
        <p className={s.kicker}>O que a gente faz</p>
        <h2 className={s.h2}>Do site à automação: tudo na mesma casa.</h2>
        <p className={s.sub}>Dez serviços, uma conversa só.</p>
        <div className={s.celulas}>
          {CELULAS.map((celula) => (
            <a
              key={celula.nome}
              className={`${s.celula} ${celula.larga ? s.celulaLarga : ""} ${
                celula.cta ? s.celulaCta : ""
              }`}
              href={celula.href}
              {...(celula.externo
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              <span className={s.celulaTopo}>
                <CellIcon nome={celula.icone} />
                {celula.demo ? <span className={s.tagDemo}>Demo</span> : null}
              </span>
              <span className={s.celulaNome}>{celula.nome}</span>
              <span className={s.celulaLinha}>{celula.linha}</span>
              {celula.nota ? (
                <span className={s.celulaNota}>{celula.nota}</span>
              ) : null}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Modelos() {
  return (
    <section className={s.modelos} id="modelos">
      <div className={s.container}>
        <p className={s.kicker}>Modelos</p>
        <h2 className={s.h2}>Toque no modelo. É assim que o seu vai funcionar.</h2>
        <p className={s.sub}>
          As duas demos são feitas por nós, com dados de exemplo. Abre no seu
          celular, sem baixar nada.
        </p>
        <div className={s.modelosGrade}>
          <article className={s.modeloCard}>
            <div className={s.phone} aria-hidden="true">
              <div className={s.phoneTopo}>
                <span>Navalha &amp; Cia</span>
                <span className={s.phonePonto} />
              </div>
              <div className={s.phoneLinha}>
                <span>Corte</span>
                <span>R$ 45</span>
              </div>
              <div className={s.phoneLinha}>
                <span>Barba</span>
                <span>R$ 35</span>
              </div>
              <div className={s.phoneHoras}>
                <span className={s.phoneHora}>09:00</span>
                <span className={`${s.phoneHora} ${s.phoneHoraOn}`}>15:00</span>
                <span className={s.phoneHora}>16:30</span>
              </div>
              <div className={s.phoneBotao}>Agendar</div>
            </div>
            <h3 className={s.h3}>Agenda de barbearia</h3>
            <p className={s.modeloTexto}>
              Marcação em 20 segundos, com lembrete no WhatsApp de quem ia
              esquecer.
            </p>
            <div className={s.modeloAcoes}>
              <Link
                className={`${s.btn} ${s.btnPrimary} ${s.btnSmall}`}
                href="/bside/agenda-demo"
              >
                Testar a agenda
              </Link>
              <a
                className={`${s.btn} ${s.btnContorno} ${s.btnSmall}`}
                href={wa(WA_MSG.cardAgenda)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Quero uma assim
              </a>
            </div>
          </article>

          <article className={s.modeloCard}>
            <div className={s.phone} aria-hidden="true">
              <div className={s.phoneTopo}>
                <span>Pizzaria Meia Lua</span>
                <span className={s.phoneAberto}>Aberto</span>
              </div>
              <div className={s.phoneLinha}>
                <span>Margherita</span>
                <span>R$ 42</span>
              </div>
              <div className={s.phoneLinha}>
                <span>Calabresa</span>
                <span>R$ 45</span>
              </div>
              <div className={s.phoneLinha}>
                <span>Quatro queijos</span>
                <span>R$ 49</span>
              </div>
              <div className={s.phoneBotao}>Pedir no WhatsApp</div>
            </div>
            <h3 className={s.h3}>Cardápio de restaurante</h3>
            <p className={s.modeloTexto}>
              Menu completo em um toque, com o pedido chegando formatado no
              WhatsApp.
            </p>
            <div className={s.modeloAcoes}>
              <Link
                className={`${s.btn} ${s.btnPrimary} ${s.btnSmall}`}
                href="/bside/cardapio-demo"
              >
                Abrir o cardápio
              </Link>
              <a
                className={`${s.btn} ${s.btnContorno} ${s.btnSmall}`}
                href={wa(WA_MSG.cardCardapio)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Quero um assim
              </a>
            </div>
          </article>

          <article className={s.modeloCard}>
            <div className={s.segmentos} aria-hidden="true">
              <span className={s.segmentoChip}>Pet shop</span>
              <span className={s.segmentoChip}>Clínica</span>
              <span className={s.segmentoChip}>Oficina</span>
              <span className={`${s.segmentoChip} ${s.segmentoChipVazio}`}>Loja</span>
            </div>
            <h3 className={s.h3}>Seu segmento</h3>
            <p className={s.modeloTexto}>
              Pet shop, clínica, oficina, loja: o modelo muda, o padrão é o
              mesmo. Me conta o seu caso que eu mostro o que faz sentido.
            </p>
            <div className={s.modeloAcoes}>
              <a
                className={`${s.btn} ${s.btnPrimary} ${s.btnSmall}`}
                href={wa(WA_MSG.cardSegmento)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Falar no WhatsApp
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function Precos() {
  return (
    <section className={s.precos} id="precos">
      <div className={s.container}>
        <p className={s.kicker}>Preços</p>
        <h2 className={s.h2}>Preço na tela, sem enrolação.</h2>
        <p className={s.sub}>
          Três formas de começar, do primeiro passo ao automático. Em todas,
          você aprova como vai ficar antes de pagar.
        </p>

        <div className={s.precosGrade}>
          <article className={s.precoCard}>
            <div className={s.precoTopo}>
              <p className={s.precoLabel}>Para começar</p>
            </div>
            <h3 className={s.h3}>Página profissional</h3>
            <p className={s.precoSub}>
              Uma página no ar, no Google, com botão para o seu WhatsApp.
            </p>
            <p className={s.precoValor}>R$ 397</p>
            <p className={s.precoPagamento}>em até 2x, sem juros</p>
            <ul className={s.precoLista}>
              <li>
                <CheckIcon />
                1 página no ar com fotos, serviços, horários, endereço e mapa
              </li>
              <li>
                <CheckIcon />
                Botão de WhatsApp fixo na página
              </li>
              <li>
                <CheckIcon />
                Domínio próprio e ficha do Google atualizada
              </li>
              <li>
                <CheckIcon />
                Hospedagem e manutenção do 1º ano inclusas
              </li>
            </ul>
            {/* Recorrência visível de propósito; R$ 39/mês aguarda ratificação final do dono. */}
            <p className={s.precoRecorrencia}>Do 13º mês: R$ 39/mês</p>
            <p className={s.precoPrazo}>Prazo: 3 a 5 dias úteis</p>
            <a
              className={`${s.btn} ${s.btnPrimary} ${s.btnBloco}`}
              href={wa(WA_MSG.card1)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Começar com essa
            </a>
          </article>

          <article className={`${s.precoCard} ${s.precoDestaque}`}>
            <span className={s.selo}>Recomendado</span>
            <p className={s.precoLabel}>Para o dia a dia</p>
            <h3 className={s.h3}>Vitrine que Vende</h3>
            <p className={s.precoSub}>
              Site completo com cardápio digital ou agenda online, e 1 ano de
              manutenção.
            </p>
            <p className={s.precoValor}>R$ 997</p>
            <p className={s.precoPagamento}>em até 2x, sem juros</p>
            <ul className={s.precoLista}>
              <li>
                <CheckIcon />
                Site completo, até 5 páginas
              </li>
              <li>
                <CheckIcon />
                Cardápio digital OU agendamento online: você escolhe
              </li>
              <li>
                <CheckIcon />
                Ficha do Google otimizada
              </li>
              <li>
                <CheckIcon />
                12 meses de hospedagem e manutenção inclusos
              </li>
              <li>
                <CheckIcon />
                1 rodada de ajustes depois de publicado
              </li>
            </ul>
            <p className={s.precoRecorrencia}>Do 13º mês: R$ 49/mês</p>
            <p className={s.precoPrazo}>Prazo: 5 a 7 dias úteis</p>
            <p className={s.btnMicro}>
              Você confirma tudo no WhatsApp, sem compromisso.
            </p>
            <a
              className={`${s.btn} ${s.btnPrimary} ${s.btnBloco}`}
              href={wa(WA_MSG.card2)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Quero esse combo
            </a>
          </article>

          <article className={s.precoCard}>
            <div className={s.precoTopo}>
              <p className={s.precoLabel}>Para crescer</p>
            </div>
            <h3 className={s.h3}>Operação no Automático</h3>
            <p className={s.precoSub}>
              Sistema com painel, agenda, cardápio e WhatsApp automático em um
              lugar só.
            </p>
            <p className={s.precoValor}>
              <span className={s.precoDe}>a partir de</span>
              R$ 2.497
            </p>
            <p className={s.precoPagamento}>em até 6x, sem juros</p>
            <ul className={s.precoLista}>
              <li>
                <CheckIcon />
                Sistema com painel: clientes, produtos e relatórios
              </li>
              <li>
                <CheckIcon />
                Agendamento, cardápio e automação no WhatsApp oficial
              </li>
              <li>
                <CheckIcon />
                Treinamento de 1 hora
              </li>
              <li>
                <CheckIcon />
                12 meses de manutenção com prioridade
              </li>
            </ul>
            <p className={s.precoRecorrencia}>
              Do 13º mês: R$ 79/mês. Mensagens automáticas cobradas à parte, a
              preço de custo.
            </p>
            <p className={s.precoPrazo}>Prazo: combinado por escrito na proposta</p>
            <a
              className={`${s.btn} ${s.btnPrimary} ${s.btnBloco}`}
              href={wa(WA_MSG.card3)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Pedir uma proposta
            </a>
          </article>
        </div>

        <div className={s.precoLinhas}>
          <PixelDivider />
          <p className={s.precoLinha}>
            Só precisa de um sistema sob medida, com painel e cadastros? A
            partir de R$ 1.997, com escopo fechado em proposta.{" "}
            <a
              href={wa(WA_MSG.linhaSistema)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Falar no WhatsApp
            </a>
          </p>
          <p className={s.precoLinha}>
            Ou é só um módulo: página, cardápio ou agenda avulsos? Também
            fazemos.{" "}
            <a
              href={wa(WA_MSG.linhaModulos)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Falar no WhatsApp
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

function ComoFunciona() {
  return (
    <section className={s.como} id="como-funciona">
      <div className={s.container}>
        <p className={s.kicker}>Como funciona</p>
        <ol className={s.passos}>
          {PASSOS.map((passo, indice) => (
            <li className={s.passo} key={passo.num}>
              <span className={s.passoNum}>{passo.num}</span>
              <h3 className={s.h3}>{passo.titulo}</h3>
              <p className={s.passoLinha}>{passo.linha}</p>
              {indice < PASSOS.length - 1 ? (
                <svg
                  className={s.passoSeta}
                  width="44"
                  height="12"
                  viewBox="0 0 44 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <line
                    x1="0"
                    y1="6"
                    x2="34"
                    y2="6"
                    stroke="#00B8E6"
                    strokeOpacity=".45"
                  />
                  <path d="M34 1.5 44 6l-10 4.5z" fill="#00B8E6" />
                </svg>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Compromissos() {
  return (
    <section className={s.compromissos} id="compromissos">
      <div className={s.container}>
        <p className={s.kicker}>Nosso compromisso</p>
        <ul className={s.compromissosLista}>
          <li>
            <CheckIcon />
            Escopo escrito antes de qualquer pagamento: você sabe exatamente o
            que recebe.
          </li>
          <li>
            <CheckIcon />
            Prévia mostrada antes de fechar qualquer coisa.
          </li>
          <li className={s.compromissoAlta}>
            <CheckIcon />
            Nunca pedimos senha nem código de WhatsApp, Instagram ou banco.
          </li>
          <li>
            <CheckIcon />
            No WhatsApp quem responde é gente: no mesmo dia, de segunda a
            sexta.
          </li>
        </ul>
      </div>
    </section>
  );
}

const FAQ = [
  {
    q: "Quanto custa?",
    a: (
      <>
        Está logo acima: R$ 397 a página profissional (com o primeiro ano de
        hospedagem e manutenção), R$ 997 o combo com site + cardápio ou agenda,
        e a partir de R$ 2.497 os sistemas com automação. Página e combo em 2x
        sem juros; sistema em até 6x. E você aprova como vai ficar antes de
        pagar.
      </>
    ),
  },
  {
    q: "Em quanto tempo fica pronto?",
    a: (
      <>
        Página profissional em 3 a 5 dias úteis. Site com cardápio ou
        agendamento em 5 a 7 dias úteis. Sistemas sob medida: prazo combinado
        por escrito na proposta, antes de começar.
      </>
    ),
  },
  {
    q: "Já tenho site. Faz sentido falar com vocês?",
    a: (
      <>
        Manda o link que eu olho de graça e te falo o que dá pra melhorar, sem
        compromisso. Se o seu já estiver redondo, eu falo na hora e não te
        incomodo mais.
      </>
    ),
  },
  {
    q: "Como sei que não é golpe?",
    a: (
      <>
        Pergunta justa. A gente é o Bside Digital Studio, de Maringá, na ativa
        desde 2008. Você não precisa acreditar na gente por conta própria: as
        duas demos desta página são feitas por nós (
        <Link className={s.linkInline} href="/bside/agenda-demo">
          abrir a agenda
        </Link>{" "}
        ·{" "}
        <Link className={s.linkInline} href="/bside/cardapio-demo">
          abrir o cardápio
        </Link>
        ), e no seu projeto você vê uma prévia de como vai ficar antes de pagar
        qualquer coisa. E um combinado importante: a gente nunca pede senha nem
        código de WhatsApp, Instagram ou banco. Se alguém pedir em nosso nome,
        não somos nós.
      </>
    ),
  },
  {
    q: "Preciso entender de tecnologia?",
    a: (
      <>
        Nada. Você me conta o que o seu negócio precisa pelo WhatsApp e a gente
        cuida da parte técnica, da publicação e da manutenção.
      </>
    ),
  },
  {
    q: "E depois que ficar pronto, vocês somem?",
    a: (
      <>
        A página e os combos incluem os 12 primeiros meses de hospedagem e
        manutenção. Do 13º mês em diante continua a partir de R$ 39/mês, com
        atendimento no WhatsApp. A gente avisa antes de qualquer cobrança nova.
      </>
    ),
  },
];

function Faq() {
  return (
    <section className={s.faq} id="faq">
      <div className={s.container}>
        <p className={s.kicker}>Perguntas frequentes</p>
        <div className={s.faqLista}>
          {FAQ.map((item) => (
            <details className={s.faqItem} key={item.q}>
              <summary className={s.faqPergunta}>
                <span>{item.q}</span>
                <span className={s.faqMarcador} aria-hidden="true" />
              </summary>
              <p className={s.faqResposta}>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaFinal() {
  return (
    <section className={s.cta} id="orcamento">
      <div className={s.scanlinesEscuro} aria-hidden="true" />
      <div className={`${s.container} ${s.ctaInterno}`}>
        <h2 className={s.ctaTitulo}>Me chama no WhatsApp e tira a ideia do papel.</h2>
        <p className={s.ctaSub}>
          Sem compromisso: você diz o que precisa, eu passo o valor e mostro a
          prévia.
        </p>
        <a
          className={`${s.btn} ${s.btnNavy} ${s.btnGrande}`}
          href={wa(WA_MSG.ctaFinal)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon />
          Falar no WhatsApp
        </a>
        <p className={s.ctaMicro}>Resposta no mesmo dia, de segunda a sexta.</p>
      </div>
      <div className={s.ctaSaida} aria-hidden="true">
        <PixelTrail variant="white" />
      </div>
    </section>
  );
}

function Rodape() {
  return (
    <footer className={s.rodape} id="contato">
      <div className={s.container}>
        <PixelDivider />
      </div>
      <div className={`${s.container} ${s.rodapeGrade}`}>
        <div>
          <BsLogo size={168} />
          <p className={s.rodapeNota}>© 2026 Bside Digital Studio · Maringá/PR</p>
          <p className={s.rodapeNota2}>Na ativa desde 2008</p>
        </div>
        <nav aria-label="Serviços da Bside">
          <p className={s.rodapeTitulo}>Serviços</p>
          <ul className={s.rodapeLista}>
            {SERVICOS_RODAPE.map((servico) => (
              <li key={servico.nome}>
                <a href={servico.href}>{servico.nome}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className={s.rodapeTitulo}>Contato</p>
          <a
            className={`${s.btn} ${s.btnPrimary} ${s.btnSmall}`}
            href={wa(WA_MSG.geral)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon />
            Falar no WhatsApp
          </a>
          <p className={s.rodapeNota}>Seg a sex, 9h às 18h</p>
          <p className={s.rodapeNota2}>
            Atendemos Maringá, Rolândia, Londrina, Cambé e Mandaguari.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Página                                                              */
/* ------------------------------------------------------------------ */

export default function BsideLanding() {
  return (
    <div className={s.root}>
      <GrainOverlay />
      <Header />
      <main>
        <Hero />
        <Confianca />
        <OQueFazemos />
        <Modelos />
        <Precos />
        <ComoFunciona />
        <Compromissos />
        <Faq />
        <CtaFinal />
      </main>
      <Rodape />
      <MobileWhatsAppBar />
    </div>
  );
}
