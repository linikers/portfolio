import SalaoServicos, { type DadosSalaoServicos } from "@/components/bside/SalaoServicos";

/**
 * /bside/salao/servicos — modelo de página de salão SEM agendamento online.
 *
 * Por que existe (26/10): a Juliana, do Salão Juliana Biagio & Patrícia Moura
 * (Cambé), disse na conversa que não gosta de agendamento online e mesmo assim
 * pediu para ver o modelo. O modelo anterior (`/bside/salao/modelo`) é centrado
 * em agenda, então não servia: mostrava exatamente o que ela recusou.
 *
 * Este aqui é o oposto: organiza o salão por área de serviço, mostra a equipe e
 * o horário, e todo caminho termina no WhatsApp. Nada de reserva, nada de login.
 *
 * Regras: noindex, fora do sitemap, sem link vindo de /bside, salão fictício
 * ("Studio Aurora"), nenhuma foto de pessoa. Dados são de exemplo.
 */

const EXEMPLO: DadosSalaoServicos = {
  marca: ["Studio", "Aurora"],
  cidade: "Cambé",
  olho: "Cambé · seis áreas de cuidado",
  titulo: ["Seis áreas de cuidado,", "um só endereço"],
  texto:
    "Cabelo, estética facial e corporal, unhas, cílios e head spa com preço na tabela antes de você sentar. Quem atende é sempre a mesma pessoa, e o horário você combina direto no WhatsApp.",
  resumoAreas: "Cabelo, estética, unhas, cílios e spa",
  fotoTag: "Centro de Cambé",
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
      id: "estetica-facial",
      nome: "Estética facial",
      resumo: "Limpeza, hidratação e protocolos de pele com avaliação na hora.",
      itens: [
        { nome: "Limpeza de pele", desc: "Com extração e máscara calmante", preco: "R$ 120", dur: "1h" },
        { nome: "Hidratação facial", desc: "Para pele seca ou desidratada", preco: "R$ 90", dur: "50 min" },
      ],
    },
    {
      id: "estetica-corporal",
      nome: "Estética corporal",
      resumo: "Protocolos por sessão ou pacote, combinados na avaliação.",
      itens: [
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
      nome: "Cílios e sobrancelha",
      resumo: "Volume brasileiro, fio a fio e design de sobrancelha.",
      itens: [
        { nome: "Extensão de cílios", desc: "Volume brasileiro", preco: "R$ 160", dur: "2h" },
        { nome: "Design de sobrancelha", desc: "Com pinça e henna, se quiser", preco: "R$ 45", dur: "30 min" },
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
    { id: "juliana", nome: "Juliana", area: "Cabelo, cor e estética facial", inicial: "J" },
    { id: "patricia", nome: "Patrícia", area: "Unhas, cílios e head spa", inicial: "P" },
  ],
  endereco: "Rua das Acácias, 521 · Centro, Cambé",
  horario: "Segunda a sábado, das 9h às 19h",
  pagamento: "Pix, dinheiro e cartão em até 3x sem juros",
  mensagem: "Oi, Márcia! Vi o modelo de página de salão (Studio Aurora) e queria uma assim pro meu salão.",
  selo: "Página de exemplo · dados fictícios",
  rodapeNota: "Página de exemplo, dados fictícios",
  fecho: {
    titulo: "Quer uma página assim para o seu salão?",
    texto:
      "Serviços por área, equipe, preço na tabela e o botão que leva direto para o seu WhatsApp. Sem agendamento online obrigatório.",
  },
  seo: {
    title: "Modelo de página para salão, sem agendamento · Bside Digital Studio",
    description:
      "Exemplo de página para salão organizada por área de serviço, com equipe, preços e botão direto para o WhatsApp. Sem agendamento online. Feito pela Bside Digital Studio.",
    path: "/bside/salao/servicos",
  },
};

export default function ModeloSalaoServicos() {
  return <SalaoServicos dados={EXEMPLO} />;
}
