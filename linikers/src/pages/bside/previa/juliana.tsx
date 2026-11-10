import SalaoServicos, { type DadosSalaoServicos } from "@/components/bside/SalaoServicos";

/**
 * /bside/previa/juliana — prévia do salão da Juliana (Cambé), feita para ela.
 *
 * Regras desta rota:
 * - noindex e fora do sitemap: é material de venda, não página pública;
 * - nada aqui vem de outro lugar (nenhum link de /bside aponta para cá);
 * - preços, horário e fotos são de EXEMPLO e a página diz isso: o que ela decide
 *   é o formato (serviço por área, sem agendamento, botão no WhatsApp);
 * - endereço e nomes são os de verdade (Google, nota 4.9), porque é isso que
 *   faz ela reconhecer o salão na hora.
 *
 * As cinco áreas são as que ela mesma listou em 24/10: cabelo, estética facial e
 * corporal, manicure e pedicure, extensão de cílios e head spa.
 */

const JULIANA: DadosSalaoServicos = {
  marca: ["Biagio", "& Moura"],
  cidade: "Cambé",
  olho: "Cambé · cinco áreas de cuidado",
  titulo: ["Cinco áreas de cuidado,", "um só endereço"],
  texto:
    "Cabelo, estética facial e corporal, unhas, cílios e head spa com preço na tabela antes de você sentar. Quem atende é sempre a mesma pessoa, e o horário você combina direto no WhatsApp.",
  resumoAreas: "Cabelo, estética, unhas, cílios e head spa",
  fotoTag: "Parque Residencial Cambé",
  foto: "/bside/salao/hero.webp",
  areas: [
    {
      id: "cabelo",
      nome: "Cabelo",
      resumo: "Corte, cor e tratamento, com avaliação do fio antes de começar.",
      itens: [
        { nome: "Corte feminino", desc: "Com lavagem e finalização", preco: "R$ 70", dur: "50 min" },
        { nome: "Escova modelada", desc: "Lisa ou com movimento", preco: "R$ 60", dur: "40 min" },
        { nome: "Coloração", desc: "Com avaliação do fio antes", preco: "R$ 180", dur: "1h40" },
        { nome: "Hidratação", desc: "Reconstrução para cabelo castigado", preco: "R$ 90", dur: "50 min" },
      ],
    },
    {
      id: "estetica",
      nome: "Estética facial e corporal",
      resumo: "Limpeza, hidratação e protocolos de pele e corpo, com avaliação na hora.",
      itens: [
        { nome: "Limpeza de pele", desc: "Com extração e máscara calmante", preco: "R$ 120", dur: "1h" },
        { nome: "Hidratação facial", desc: "Para pele seca ou desidratada", preco: "R$ 90", dur: "50 min" },
        { nome: "Drenagem linfática", desc: "Sessão de 50 minutos", preco: "R$ 100", dur: "50 min" },
        { nome: "Massagem relaxante", desc: "Com óleo morno", preco: "R$ 110", dur: "1h" },
      ],
    },
    {
      id: "unhas",
      nome: "Manicure e pedicure",
      resumo: "Com esmaltação em gel ou alongamento, se quiser.",
      itens: [
        { nome: "Manicure", desc: "Com esmaltação comum", preco: "R$ 35", dur: "40 min" },
        { nome: "Pedicure", desc: "Com esmaltação em gel", preco: "R$ 45", dur: "50 min" },
        { nome: "Alongamento em gel", desc: "Com manutenção a cada 3 semanas", preco: "R$ 150", dur: "2h" },
      ],
    },
    {
      id: "cilios",
      nome: "Extensão de cílios",
      resumo: "Volume brasileiro e fio a fio, com manutenção a cada 3 semanas.",
      itens: [
        { nome: "Extensão volume brasileiro", desc: "Aplicação completa", preco: "R$ 160", dur: "2h" },
        { nome: "Manutenção de cílios", desc: "A cada 3 semanas", preco: "R$ 80", dur: "1h" },
      ],
    },
    {
      id: "head-spa",
      nome: "Head spa",
      resumo: "Ritual de couro cabeludo com lavagem, massagem e finalização.",
      itens: [
        { nome: "Head spa completo", desc: "Lavagem, massagem e finalização", preco: "R$ 180", dur: "1h20" },
      ],
    },
  ],
  equipe: [
    { id: "juliana", nome: "Juliana", area: "Cabelo, cor e estética", inicial: "J" },
    { id: "patricia", nome: "Patrícia", area: "Unhas, cílios e head spa", inicial: "P" },
  ],
  endereco: "R. Planalto, 521 · Parque Residencial Cambé, Cambé",
  horario: "Segunda a sábado, das 9h às 19h (horário de exemplo)",
  pagamento: "Pix, dinheiro e cartão em até 3x sem juros",
  mensagem: "Oi, Márcia! Vi a prévia do salão da Juliana e queria seguir com a página do meu salão.",
  selo: "Prévia feita para o salão de vocês · valores de exemplo",
  rodapeNota: "Prévia · imagens, horários e valores de exemplo",
  fecho: {
    titulo: "Essa é a página de vocês.",
    texto:
      "Entram as fotos de vocês, os preços de verdade e o horário certinho. Do jeito que vocês pediram: sem agendamento online, com o cliente falando direto no WhatsApp.",
  },
  seo: {
    title: "Prévia · Salão Biagio & Moura, Cambé",
    description:
      "Prévia da página do salão Biagio & Moura, em Cambé: serviços por área, equipe, preços na tabela e botão direto para o WhatsApp, sem agendamento online.",
    path: "/bside/previa/juliana",
  },
};

export default function PreviaJuliana() {
  return <SalaoServicos dados={JULIANA} />;
}
