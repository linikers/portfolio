// src/lib/servicosAdmin.ts
/**
 * Validação e normalização de serviço vindo do painel /admin/servicos.
 * Só regras — sem Firestore, sem React: é usada pela API e pelo script de seed.
 */
import {
  CATEGORIAS,
  MARCAS,
  STATUS_SERVICO,
  type CategoriaServico,
  type MarcaServico,
  type RecorrenciaServico,
  type Servico,
  type StatusServico,
  type TipoCobranca,
} from "@/data/servicos";

export const ID_SERVICO = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const COBRANCAS: TipoCobranca[] = ["unico", "mensal", "anual"];

export interface ResultadoValidacao {
  ok: boolean;
  erros: string[];
  servico?: Servico;
}

function texto(valor: unknown, campo: string, erros: string[]): string {
  if (typeof valor !== "string" || !valor.trim()) {
    erros.push(`${campo} é obrigatório`);
    return "";
  }
  return valor.trim();
}

function numero(valor: unknown, campo: string, erros: string[]): number {
  const n = typeof valor === "string" ? Number(valor.replace(",", ".")) : Number(valor);
  if (!Number.isFinite(n) || n < 0) {
    erros.push(`${campo} precisa ser um número maior ou igual a zero`);
    return 0;
  }
  return Math.round(n);
}

export function validarServico(entrada: unknown): ResultadoValidacao {
  const erros: string[] = [];
  const bruto = (entrada || {}) as Record<string, unknown>;

  const id = texto(bruto.id, "id", erros).toLowerCase();
  if (id && !ID_SERVICO.test(id)) {
    erros.push("id deve ser um slug (letras minúsculas, números e hífen)");
  }

  const marca = texto(bruto.marca, "marca", erros) as MarcaServico;
  if (marca && !MARCAS.some((m) => m.valor === marca)) {
    erros.push(`marca deve ser ${MARCAS.map((m) => m.valor).join(" ou ")}`);
  }

  const categoria = texto(bruto.categoria, "categoria", erros) as CategoriaServico;
  if (categoria && !CATEGORIAS.some((c) => c.valor === categoria)) {
    erros.push(`categoria inválida: ${categoria}`);
  }

  const status = (texto(bruto.status, "status", erros) || "ativo") as StatusServico;
  if (!STATUS_SERVICO.some((s) => s.valor === status)) {
    erros.push(`status inválido: ${status}`);
  }

  const cobranca = (texto(bruto.cobranca, "cobranca", erros) || "unico") as TipoCobranca;
  if (!COBRANCAS.includes(cobranca)) {
    erros.push(`cobranca deve ser ${COBRANCAS.join(", ")}`);
  }

  const pagina = texto(bruto.pagina, "pagina", erros);
  if (pagina && !pagina.startsWith("/")) {
    erros.push("pagina deve começar com /");
  }

  const entrega = Array.isArray(bruto.entrega)
    ? bruto.entrega.map((item) => String(item).trim()).filter(Boolean)
    : [];
  if (!entrega.length) erros.push("entrega precisa de pelo menos um item");

  let recorrencia: RecorrenciaServico | null = null;
  if (bruto.recorrencia && typeof bruto.recorrencia === "object") {
    const rec = bruto.recorrencia as Record<string, unknown>;
    const valor = numero(rec.valor, "recorrencia.valor", erros);
    const unidade = rec.unidade === "ano" ? "ano" : "mes";
    recorrencia = {
      valor,
      unidade,
      ...(rec.aPartirDe ? { aPartirDe: numero(rec.aPartirDe, "recorrencia.aPartirDe", erros) } : {}),
      ...(typeof rec.observacao === "string" && rec.observacao.trim()
        ? { observacao: rec.observacao.trim() }
        : {}),
    };
  }

  if (erros.length) return { ok: false, erros };

  const servico: Servico = {
    id,
    marca,
    categoria,
    nome: texto(bruto.nome, "nome", erros),
    resumo: texto(bruto.resumo, "resumo", erros),
    preco: numero(bruto.preco, "preco", erros),
    precoAPartirDe: Boolean(bruto.precoAPartirDe),
    cobranca,
    recorrencia,
    pagina,
    prazo: texto(bruto.prazo, "prazo", erros),
    status,
    publico: texto(bruto.publico, "publico", erros),
    entrega,
  };

  if (erros.length) return { ok: false, erros };
  return { ok: true, erros: [], servico };
}

/** Documento salvo no Firestore: o serviço + rastro de quem mexeu. */
export interface ServicoDoc extends Servico {
  atualizadoEm: string;
  atualizadoPor: string;
}

export function docDeServico(servico: Servico, email: string): ServicoDoc {
  return {
    ...servico,
    atualizadoEm: new Date().toISOString(),
    atualizadoPor: email,
  };
}
