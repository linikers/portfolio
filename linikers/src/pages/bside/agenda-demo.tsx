import { useState } from "react";
import Link from "next/link";
import BsideSeo from "@/components/bside/Seo";
import { GrainOverlay } from "@/components/bside/Ui";
import s from "@/styles/bside.module.scss";
import { wa, waAgendaEscolha, WA_MSG } from "@/lib/bside";

/**
 * /bside/agenda-demo — demo de prova (barbearia fictícia "Navalha & Cia").
 * Draft v1: fluxo serviços → profissional → dia/horário → fecho em wa.me.
 * Sem backend, sem dado real, noindex; toda interação termina no WhatsApp.
 */

const SERVICOS = [
  { id: "corte", nome: "Corte", preco: "R$ 45", dur: "40 min" },
  { id: "degrade", nome: "Degradê navalhado", preco: "R$ 55", dur: "50 min" },
  { id: "corte-barba", nome: "Corte + barba", preco: "R$ 70", dur: "1h" },
  { id: "barba", nome: "Barba", preco: "R$ 35", dur: "30 min" },
];

const PROFISSIONAIS = [
  { id: "rafael", nome: "Rafael", iniciais: "R" },
  { id: "bruno", nome: "Bruno", iniciais: "B" },
];

const DIAS = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

const HORARIOS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
];

/** Horários cheios de exemplo, só para mostrar o estado "ocupado". */
const OCUPADOS = ["09:00", "11:00", "14:30", "16:00", "18:00"];

export default function AgendaDemoPage() {
  const [servicoId, setServicoId] = useState<string | null>(null);
  const [profissionalId, setProfissionalId] = useState<string | null>(null);
  const [dia, setDia] = useState<string | null>(null);
  const [hora, setHora] = useState<string | null>(null);

  const servico = SERVICOS.find((item) => item.id === servicoId) || null;
  const profissional =
    PROFISSIONAIS.find((item) => item.id === profissionalId) || null;
  const completo = Boolean(servico && profissional && dia && hora);

  return (
    <div className={`${s.root} ${s.demoRoot}`}>
      <GrainOverlay />
      <BsideSeo
        title="Agenda de barbearia · demonstração do Bside Digital Studio"
        description="Demonstração de agenda online feita pelo Bside Digital Studio. Dados de exemplo, sem reserva real, com saída direta para o WhatsApp."
        path="/bside/agenda-demo"
        ogImage="/bside/og-agenda.png"
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
            <h1 className={s.demoMarca}>Navalha &amp; Cia</h1>
            <p className={s.demoTaglinha}>Agende seu horário em 20 segundos</p>
            <p className={s.demoSublinha}>
              Seg a sáb, 9h às 20h · dados de exemplo, sem reserva real
            </p>
          </header>

          <section className={s.demoBloco}>
            <p className={s.demoRotulo}>1. Escolha o serviço</p>
            <div className={s.demoOpcoes}>
              {SERVICOS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`${s.demoOpcao} ${
                    servicoId === item.id ? s.demoOpcaoOn : ""
                  }`}
                  aria-pressed={servicoId === item.id}
                  onClick={() => setServicoId(item.id)}
                >
                  <span>
                    {item.nome}
                    <span className={s.demoOpcaoInfo}>{item.dur}</span>
                  </span>
                  <span className={s.demoOpcaoPreco}>{item.preco}</span>
                </button>
              ))}
            </div>
          </section>

          <section
            className={`${s.demoBloco} ${servicoId ? "" : s.demoBloqueado}`}
          >
            <p className={s.demoRotulo}>2. Escolha o profissional</p>
            <div className={s.demoOpcoes}>
              {PROFISSIONAIS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  disabled={!servicoId}
                  className={`${s.demoOpcao} ${
                    profissionalId === item.id ? s.demoOpcaoOn : ""
                  }`}
                  aria-pressed={profissionalId === item.id}
                  onClick={() => setProfissionalId(item.id)}
                >
                  <span className={s.demoProf}>
                    <span className={s.demoAvatar}>{item.iniciais}</span>
                    {item.nome}
                  </span>
                  <span className={s.demoOpcaoPreco}>Agenda</span>
                </button>
              ))}
            </div>
          </section>

          <section
            className={`${s.demoBloco} ${profissionalId ? "" : s.demoBloqueado}`}
          >
            <p className={s.demoRotulo}>3. Escolha o dia e o horário</p>
            <div className={s.demoDias}>
              {DIAS.map((item) => (
                <button
                  key={item}
                  type="button"
                  disabled={!profissionalId}
                  className={`${s.demoDia} ${dia === item ? s.demoDiaOn : ""}`}
                  aria-pressed={dia === item}
                  onClick={() => {
                    setDia(item);
                    setHora(null);
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className={s.demoHoras}>
              {HORARIOS.map((item) => {
                const ocupado = OCUPADOS.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    disabled={!dia || ocupado}
                    className={`${s.demoHora} ${
                      hora === item ? s.demoHoraOn : ""
                    } ${ocupado ? s.demoHoraOcupada : ""}`}
                    aria-pressed={hora === item}
                    aria-label={ocupado ? `${item} ocupado` : item}
                    onClick={() => setHora(item)}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </section>

          <section className={s.demoBloco}>
            <p className={s.demoRotulo}>4. Confirme</p>
            {completo && servico && profissional && dia && hora ? (
              <>
                <div className={s.demoResumo}>
                  <p className={s.demoResumoTitulo}>Seu horário de exemplo</p>
                  <p className={s.demoResumoLinha}>
                    {dia}, {hora} · {servico.nome} com {profissional.nome}
                  </p>
                  <p className={s.demoResumoLinha}>
                    {servico.preco} · {servico.dur} (valores de exemplo)
                  </p>
                </div>
                <div className={s.demoBolha}>
                  <span className={s.demoBolhaRotulo}>
                    Lembrete automático (exemplo)
                  </span>
                  Lembrete: amanhã às {hora} você tem{" "}
                  {servico.nome.toLowerCase()} na Navalha &amp; Cia.
                </div>
                <div className={s.demoAcoes}>
                  <a
                    className={`${s.btn} ${s.btnPrimary} ${s.btnBloco}`}
                    href={waAgendaEscolha(
                      servico.nome,
                      profissional.nome,
                      dia,
                      hora
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Confirmar no WhatsApp
                  </a>
                  <p className={s.demoDica}>
                    Isto é uma demonstração: nenhum horário fica reservado de
                    verdade e nada é enviado para a barbearia de exemplo.
                  </p>
                </div>
              </>
            ) : (
              <p className={s.demoDica}>
                Escolha serviço, profissional, dia e horário para ver o resumo
                e a confirmação.
              </p>
            )}
          </section>

          <footer className={s.demoRodape}>
            <p>Exemplo feito pelo Bside Digital Studio. Quer uma agenda assim?</p>
            <div className={s.demoAcoes}>
              <a
                className={`${s.btn} ${s.btnPrimary} ${s.btnBloco}`}
                href={wa(WA_MSG.demoAgenda)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Quero uma agenda assim
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
    </div>
  );
}
