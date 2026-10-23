import { useState } from "react";
import BsideSeo from "@/components/bside/Seo";
import s from "@/styles/bside-salao-modelo.module.scss";
import { wa } from "@/lib/bside";

/**
 * /bside/salao/modelo — página de exemplo para salão de beleza.
 *
 * Serve para mostrar, na conversa, como fica o site de um salão: serviços com
 * preço, equipe, agenda online e saída para o WhatsApp. O salão ("Studio
 * Aurora") é fictício, de propósito: é vitrine de venda, não página de cliente.
 *
 * Regras:
 * - noindex, fora do sitemap e sem link vindo de /bside.
 * - Nenhum nome de cliente real e nenhuma foto de pessoa: a foto do hero é
 *   ambiente, sem gente.
 * - Todo clique termina no WhatsApp de vendas (a Márcia). Não existe reserva
 *   de verdade: o widget é demonstração e diz isso.
 */

const SALAO = "Studio Aurora";
const CIDADE = "Cambé";

const SERVICOS = [
  { id: "corte", nome: "Corte", desc: "Corte feminino com lavagem e finalização", preco: "R$ 70", dur: "50 min" },
  { id: "escova", nome: "Escova", desc: "Escova modelada, lisa ou com movimento", preco: "R$ 60", dur: "40 min" },
  { id: "coloracao", nome: "Coloração", desc: "Coloração completa, com avaliação do fio antes", preco: "R$ 180", dur: "1h40" },
  { id: "hidratacao", nome: "Hidratação", desc: "Tratamento de reconstrução para cabelo castigado", preco: "R$ 90", dur: "50 min" },
  { id: "manicure", nome: "Manicure e pedicure", desc: "Com esmaltação em gel, se quiser", preco: "R$ 45", dur: "50 min" },
  { id: "maquiagem", nome: "Maquiagem", desc: "Social, com cílios e fixação para o dia todo", preco: "R$ 140", dur: "1h" },
] as const;

const PROFISSIONAIS = [
  { id: "rafa", nome: "Rafa", area: "Corte, escova e coloração", inicial: "R" },
  { id: "bia", nome: "Bia", area: "Manicure, pedicure e alongamento", inicial: "B" },
  { id: "lu", nome: "Lu", area: "Maquiagem e penteado", inicial: "L" },
] as const;

const DIAS = (() => {
  const nomes = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const hoje = new Date();
  const dias: { rotulo: string; data: string; chave: string }[] = [];
  for (let d = 0; dias.length < 6 && d < 8; d++) {
    const dia = new Date(hoje);
    dia.setDate(dia.getDate() + d);
    const w = dia.getDay();
    if (w === 0) continue; // domingo o salão fecha
    const data = `${String(dia.getDate()).padStart(2, "0")}/${String(dia.getMonth() + 1).padStart(2, "0")}`;
    dias.push({ rotulo: nomes[w], data, chave: `${nomes[w]} ${data}` });
  }
  return dias;
})();

const HORARIOS = ["09:00", "09:30", "10:00", "10:30", "11:00", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00"];

/** Horários cheios de exemplo, só para o estado "ocupado" existir na tela. */
const OCUPADOS = ["09:00", "11:00", "14:30", "16:00"];

export default function ModeloSalao() {
  const [servicoId, setServicoId] = useState<string | null>(null);
  const [profissionalId, setProfissionalId] = useState<string | null>(null);
  const [dia, setDia] = useState<string | null>(null);
  const [hora, setHora] = useState<string | null>(null);

  const servico = SERVICOS.find((x) => x.id === servicoId) ?? null;
  const profissional = PROFISSIONAIS.find((x) => x.id === profissionalId) ?? null;

  const pronto = Boolean(servico && profissional && dia && hora);

  const mensagem = `Oi, Márcia! Vi o modelo de salão (${SALAO}) e queria uma página assim pro meu salão.`
    + (servico ? `\n\nNo exemplo eu escolhi: ${servico.nome}, com ${profissional?.nome ?? "uma profissional"}, ${dia} às ${hora}.` : "");

  return (
    <div className={s.page}>
      <BsideSeo
        title="Modelo de página para salão de beleza · Bside Digital Studio"
        description="Exemplo de página para salão: serviços com preço, equipe, agenda online e WhatsApp. Feito pela Bside Digital Studio. Dados fictícios."
        path="/bside/salao/modelo"
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
            <a href="#agenda">Agenda</a>
            <a href="#equipe">Equipe</a>
            <a href="#local">Onde fica</a>
          </nav>
          <a className={s.botaoClaro} href={wa(mensagem)} target="_blank" rel="noopener noreferrer">
            Agendar
          </a>
        </div>
      </header>

      <main id="topo">
        {/* ── hero ─────────────────────────────────────── */}
        <div className={s.wrap}>
          <section className={s.hero}>
            <div>
              <span className={s.olho}>{CIDADE} · desde 2014</span>
              <h1 className={s.titulo}>
                Cabelo, cor e unhas <em>com hora marcada</em>
              </h1>
              <p className={s.texto}>
                Quatro profissionais, agenda aberta de segunda a sábado e preço
                na tabela antes de você sentar na cadeira. Sem espera e sem
                surpresa no caixa.
              </p>
              <div className={s.acoes}>
                <a className={s.botao} href="#agenda">Ver horários livres</a>
                <a className={s.botaoClaro} href={wa(mensagem)} target="_blank" rel="noopener noreferrer">
                  Falar no WhatsApp
                </a>
              </div>
              <div className={s.fichas}>
                <div>
                  <strong>4 profissionais</strong>
                  <span>Corte, cor, unhas e make</span>
                </div>
                <div>
                  <strong>Seg a Sáb</strong>
                  <span>9h às 19h</span>
                </div>
                <div>
                  <strong>Agenda online</strong>
                  <span>Você escolhe o horário</span>
                </div>
              </div>
            </div>

            <div className={s.foto}>
              {/* Foto de ambiente, sem pessoas: vale para qualquer salão. */}
              <img src="/bside/salao/hero.webp" alt={`Interior do ${SALAO}, com cadeiras e espelho`} />
              <span className={s.fotoTag}>Centro de {CIDADE}</span>
            </div>
          </section>
        </div>

        {/* ── faixa ────────────────────────────────────── */}
        <div className={s.faixa}>
          <div className={`${s.wrap} ${s.faixaIn}`}>
            <div className={s.faixaItem}><strong>9 anos</strong><span>de casa aberta</span></div>
            <div className={s.faixaItem}><strong>4</strong><span>profissionais</span></div>
            <div className={s.faixaItem}><strong>6</strong><span>serviços na tabela</span></div>
            <div className={s.faixaItem}><strong>Pix e cartão</strong><span>em até 3x sem juros</span></div>
          </div>
        </div>

        {/* ── serviços ─────────────────────────────────── */}
        <div className={s.wrap}>
          <section className={s.secao} id="servicos">
            <div className={s.secaoTopo}>
              <h2 className={s.secaoTitulo}>Serviços e preços</h2>
              <p className={s.secaoSub}>
                Preço fechado por serviço. Cabelo muito longo ou química recente
                pode mudar o valor, e a gente avisa antes de começar.
              </p>
            </div>
            <div className={s.servicos}>
              {SERVICOS.map((item) => (
                <div key={item.id} className={s.servico}>
                  <div className={s.servicoInfo}>
                    <span className={s.servicoNome}>{item.nome}</span>
                    <span className={s.servicoDesc}>{item.desc} · {item.dur}</span>
                  </div>
                  <span className={s.servicoPreco}>{item.preco}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ── agenda ───────────────────────────────────── */}
        <div className={s.agenda} id="agenda">
          <div className={s.wrap}>
            <section className={s.secao}>
              <div className={s.secaoTopo}>
                <h2 className={s.secaoTitulo}>Escolha seu horário</h2>
                <p className={s.secaoSub}>
                  Três passos e pronto. O horário fica reservado no nome de quem
                  confirmar no WhatsApp.
                </p>
              </div>

              <div className={s.agendaGrade}>
                <div className={s.painel}>
                  <div className={s.passo}>
                    <p className={s.passoRotulo}><span className={s.passoNum}>1</span> Serviço</p>
                    <div className={s.opcoes}>
                      {SERVICOS.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          className={`${s.opcao} ${servicoId === item.id ? s.opcaoAtiva : ""}`}
                          onClick={() => { setServicoId(item.id); setHora(null); }}
                        >
                          {item.nome}
                          <span className={s.opcaoObs}>{item.preco}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className={s.passo}>
                    <p className={s.passoRotulo}><span className={s.passoNum}>2</span> Profissional</p>
                    <div className={s.opcoes}>
                      {PROFISSIONAIS.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          className={`${s.opcao} ${profissionalId === p.id ? s.opcaoAtiva : ""}`}
                          onClick={() => { setProfissionalId(p.id); setHora(null); }}
                        >
                          {p.nome}
                          <span className={s.opcaoObs}>{p.area.split(",")[0]}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className={s.passo}>
                    <p className={s.passoRotulo}><span className={s.passoNum}>3</span> Dia e horário</p>
                    <div className={s.opcoes} style={{ marginBottom: 12 }}>
                      {DIAS.map((d) => (
                        <button
                          key={d.chave}
                          type="button"
                          className={`${s.opcao} ${dia === d.chave ? s.opcaoAtiva : ""}`}
                          onClick={() => { setDia(d.chave); setHora(null); }}
                        >
                          {d.rotulo} <span className={s.opcaoObs}>{d.data}</span>
                        </button>
                      ))}
                    </div>
                    <div className={s.gradeHorarios}>
                      {HORARIOS.map((h) => {
                        const cheio = OCUPADOS.includes(h);
                        return (
                          <button
                            key={h}
                            type="button"
                            disabled={cheio}
                            className={`${s.opcao} ${hora === h ? s.opcaoAtiva : ""}`}
                            onClick={() => setHora(h)}
                          >
                            {h}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <aside className={s.resumo}>
                  <h3 className={s.resumoTitulo}>Seu horário</h3>
                  <div className={s.resumoLinha}><span>Serviço</span><span>{servico ? servico.nome : "—"}</span></div>
                  <div className={s.resumoLinha}><span>Profissional</span><span>{profissional ? profissional.nome : "—"}</span></div>
                  <div className={s.resumoLinha}><span>Dia</span><span>{dia ?? "—"}</span></div>
                  <div className={s.resumoLinha}><span>Horário</span><span>{hora ?? "—"}</span></div>
                  <div className={s.resumoLinha}><span>Valor</span><span>{servico ? servico.preco : "—"}</span></div>
                  <p className={s.resumoAviso}>
                    Demonstração: nada é reservado de verdade. No site do salão, o
                    botão confirma o horário e cai no WhatsApp da recepção.
                  </p>
                  {pronto ? (
                    <a className={s.botao} href={wa(mensagem)} target="_blank" rel="noopener noreferrer">
                      Confirmar no WhatsApp
                    </a>
                  ) : (
                    <span className={s.botaoClaro} style={{ opacity: 0.65, cursor: "default", justifyContent: "center" }}>
                      Escolha serviço, dia e horário
                    </span>
                  )}
                </aside>
              </div>
            </section>
          </div>
        </div>

        {/* ── equipe ───────────────────────────────────── */}
        <div className={s.wrap}>
          <section className={s.secao} id="equipe">
            <div className={s.secaoTopo}>
              <h2 className={s.secaoTitulo}>Quem atende</h2>
              <p className={s.secaoSub}>
                Cada profissional tem a própria agenda, então você marca direto
                com quem vai te atender.
              </p>
            </div>
            <div className={s.equipe}>
              {PROFISSIONAIS.map((p) => (
                <div key={p.id} className={s.pessoa}>
                  <span className={s.inicial}>{p.inicial}</span>
                  <h3 className={s.pessoaNome}>{p.nome}</h3>
                  <p className={s.pessoaArea}>{p.area}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ── local ────────────────────────────────────── */}
        <div className={s.wrap}>
          <section className={s.secao} id="local">
            <div className={s.local}>
              <div>
                <h2 className={s.secaoTitulo} style={{ marginBottom: 18 }}>Onde fica</h2>
                <p className={s.secaoSub} style={{ maxWidth: "42ch" }}>
                  No centro de {CIDADE}, com estacionamento na rua de trás. Se
                  estiver chovendo, ligue que a gente segura o horário.
                </p>
              </div>
              <div className={s.localBloco}>
                <div className={s.localItem}>
                  <strong>Endereço</strong>
                  <span>R. Paraná, 1240 · Centro · {CIDADE} – PR</span>
                </div>
                <div className={s.localItem}>
                  <strong>Horário</strong>
                  <span>Segunda a sexta, 9h às 19h · Sábado, 8h às 17h</span>
                </div>
                <div className={s.localItem}>
                  <strong>Contato</strong>
                  <span>WhatsApp e telefone no mesmo número</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ── fecho ────────────────────────────────────── */}
        <div className={s.fecho}>
          <div className={s.wrap}>
            <h2 className={s.fechoTitulo}>A página do seu salão pode ser assim</h2>
            <p className={s.fechoTexto}>
              Serviços com preço, agenda que o cliente escolhe sozinho e WhatsApp
              em todo canto. A BS Studio monta, publica e mantém por 12 meses.
            </p>
            <a className={s.botaoClaro} href={wa(mensagem)} target="_blank" rel="noopener noreferrer" style={{ borderColor: "#4a423b", color: "#faf7f3" }}>
              Quero uma página assim
            </a>
          </div>
        </div>
      </main>

      <footer className={s.rodape}>
        <div className={`${s.wrap} ${s.rodapeIn}`}>
          <span>Página de exemplo feita pela BS Studio · dados fictícios, sem reserva real</span>
          <span>Bside Digital Studio · Maringá e região</span>
        </div>
      </footer>
    </div>
  );
}
