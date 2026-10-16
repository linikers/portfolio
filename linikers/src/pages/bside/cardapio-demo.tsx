import { useState } from "react";
import Link from "next/link";
import BsideSeo from "@/components/bside/Seo";
import { GrainOverlay } from "@/components/bside/Ui";
import s from "@/styles/bside.module.scss";
import { wa, waCardapioPedido, WA_MSG } from "@/lib/bside";

/**
 * /bside/cardapio-demo — demo de prova (pizzaria fictícia "Pizzaria Meia Lua").
 * Draft v1: categorias → itens → barra fixa de pedido que abre wa.me com o
 * resumo. Sem backend, sem dado real, noindex; nunca gera pedido de verdade.
 */

interface ItemCardapio {
  id: string;
  cat: string;
  nome: string;
  desc: string;
  preco: number;
  esgotado?: boolean;
}

const CATEGORIAS = [
  { id: "pizzas", nome: "Pizzas" },
  { id: "porcoes", nome: "Porções" },
  { id: "bebidas", nome: "Bebidas" },
  { id: "sobremesas", nome: "Sobremesas" },
];

const ITENS: ItemCardapio[] = [
  {
    id: "margherita",
    cat: "pizzas",
    nome: "Pizza Margherita",
    desc: "Molho, muçarela, tomate e manjericão",
    preco: 42,
  },
  {
    id: "calabresa",
    cat: "pizzas",
    nome: "Pizza Calabresa",
    desc: "Calabresa fatiada, cebola e muçarela",
    preco: 45,
  },
  {
    id: "quatro-queijos",
    cat: "pizzas",
    nome: "Pizza Quatro Queijos",
    desc: "Muçarela, provolone, gorgonzola e parmesão",
    preco: 49,
    esgotado: true,
  },
  {
    id: "portuguesa",
    cat: "pizzas",
    nome: "Pizza Portuguesa",
    desc: "Presunto, ovos, cebola, azeitona e muçarela",
    preco: 47,
  },
  {
    id: "batata",
    cat: "porcoes",
    nome: "Batata frita",
    desc: "Porção para dividir, com sal e orégano",
    preco: 28,
  },
  {
    id: "frango",
    cat: "porcoes",
    nome: "Frango a passarinho",
    desc: "Com alho crocante e limão",
    preco: 39,
  },
  {
    id: "refri",
    cat: "bebidas",
    nome: "Refrigerante lata",
    desc: "Cola, guaraná ou laranja",
    preco: 6,
  },
  {
    id: "suco",
    cat: "bebidas",
    nome: "Suco natural 500ml",
    desc: "Laranja, limão ou abacaxi",
    preco: 12,
  },
  {
    id: "petit",
    cat: "sobremesas",
    nome: "Petit gateau",
    desc: "Com sorvete de creme",
    preco: 22,
  },
  {
    id: "acai",
    cat: "sobremesas",
    nome: "Açaí 300ml",
    desc: "Com granola e banana",
    preco: 18,
  },
];

export default function CardapioDemoPage() {
  const [carrinho, setCarrinho] = useState<Record<string, number>>({});

  const itensNoCarrinho = Object.values(carrinho).reduce((a, b) => a + b, 0);
  const total = ITENS.reduce(
    (soma, item) => soma + (carrinho[item.id] || 0) * item.preco,
    0
  );
  const totalFormatado = total.toLocaleString("pt-BR");

  const adicionar = (id: string) =>
    setCarrinho((atual) => ({ ...atual, [id]: (atual[id] || 0) + 1 }));

  return (
    <div className={`${s.root} ${s.demoRoot}`}>
      <GrainOverlay />
      <BsideSeo
        title="Cardápio de restaurante · demonstração do Bside Digital Studio"
        description="Demonstração de cardápio digital feita pelo Bside Digital Studio. Dados de exemplo, sem pedido real, com saída direta para o WhatsApp."
        path="/bside/cardapio-demo"
        ogImage="/bside/og-cardapio.png"
        noindex
      />
      <div className={s.container}>
        <div className={s.demoColuna}>
          <div className={s.demoTopo}>
            <Link className={s.demoVolta} href="/bside#modelos">
              ← Voltar para a Bside
            </Link>
            <span className={s.demoSelo}>Demo · dados de exemplo</span>
          </div>
          <p className={s.demoAviso}>Demonstração. Dados de exemplo.</p>

          <header className={s.demoCabecalho}>
            <h1 className={s.demoMarca}>Pizzaria Meia Lua</h1>
            <p className={s.demoTaglinha}>Aberto agora · 18h às 23h30</p>
            <p className={s.demoSublinha}>
              Peça pelo WhatsApp, sem baixar aplicativo. Dados de exemplo, sem
              pedido real.
            </p>
          </header>

          <nav className={s.demoCategorias} aria-label="Categorias do cardápio">
            {CATEGORIAS.map((cat) => (
              <a
                key={cat.id}
                className={s.demoCategoria}
                href={`#cat-${cat.id}`}
              >
                {cat.nome}
              </a>
            ))}
          </nav>

          {CATEGORIAS.map((cat) => (
            <section className={s.demoGrupo} id={`cat-${cat.id}`} key={cat.id}>
              <h2 className={s.demoGrupoTitulo}>{cat.nome}</h2>
              {ITENS.filter((item) => item.cat === cat.id).map((item) => {
                const quantidade = carrinho[item.id] || 0;
                return (
                  <div
                    key={item.id}
                    className={`${s.demoItem} ${
                      item.esgotado ? s.demoItemEsgotado : ""
                    }`}
                  >
                    <div className={s.demoItemInfo}>
                      <p className={s.demoItemNome}>
                        {item.nome}
                        {item.esgotado ? (
                          <span className={s.demoEsgotadoTag}>
                            Esgotado hoje
                          </span>
                        ) : null}
                      </p>
                      <p className={s.demoItemDesc}>{item.desc}</p>
                    </div>
                    {quantidade > 0 ? (
                      <span className={s.demoQtd}>{quantidade}x</span>
                    ) : null}
                    <span className={s.demoItemPreco}>
                      R$ {item.preco.toLocaleString("pt-BR")}
                    </span>
                    {item.esgotado ? null : (
                      <button
                        type="button"
                        className={s.demoItemAdd}
                        aria-label={`Adicionar ${item.nome} ao pedido de exemplo`}
                        onClick={() => adicionar(item.id)}
                      >
                        +
                      </button>
                    )}
                  </div>
                );
              })}
            </section>
          ))}

          <p className={s.demoFaixa}>
            Para mudar um preço ou pausar um item: um minuto no painel, sem
            refazer o cardápio. O item &quot;Esgotado hoje&quot; acima é o
            exemplo.
          </p>

          <footer className={s.demoRodape}>
            <p>
              Exemplo feito pelo Bside Digital Studio. Quer um cardápio assim?
            </p>
            <div className={s.demoAcoes}>
              <a
                className={`${s.btn} ${s.btnPrimary} ${s.btnBloco}`}
                href={wa(WA_MSG.cardCardapio)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Quero um cardápio assim
              </a>
              <Link
                className={`${s.btn} ${s.btnContorno} ${s.btnBloco}`}
                href="/bside#modelos"
              >
                Voltar para a Bside
              </Link>
            </div>
            <p className={s.demoAviso}>
              Demonstração. Dados de exemplo. Nomes e preços são fictícios.
            </p>
          </footer>
        </div>
      </div>

      {/* Barra fixa do pedido: o resumo vira a mensagem do WhatsApp. */}
      {itensNoCarrinho > 0 ? (
        <a
          className={s.demoBarra}
          href={waCardapioPedido(itensNoCarrinho, totalFormatado)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={s.demoBarraResumo}>
            {itensNoCarrinho} {itensNoCarrinho === 1 ? "item" : "itens"} · R${" "}
            {totalFormatado}
          </span>
          <span className={s.demoBarraCta}>Pedir no WhatsApp</span>
        </a>
      ) : (
        <div className={`${s.demoBarra} ${s.demoBarraEspera}`}>
          <span className={s.demoBarraResumo}>Nenhum item ainda</span>
          <span className={s.demoBarraCta}>Toque no + para escolher</span>
        </div>
      )}
    </div>
  );
}
