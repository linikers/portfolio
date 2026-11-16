/* ============================================================================
   CONFIG.JS — É AQUI QUE VOCÊ TROCA TEXTOS E FOTOS. Nada mais precisa ser mexido.
   ============================================================================

   COMO USAR
   1. Abra este arquivo em qualquer editor de texto (Bloco de Notas serve).
   2. Troque só o que está entre as aspas. Não apague vírgulas, chaves { } nem
      colchetes [ ].
   3. Salve e abra o index.html no navegador (duplo clique).

   CAMPOS QUE VOCÊ PRECISA PREENCHER (os demais já vêm prontos):

   POUSADA
   - nome ............... nome completo, como aparece na fachada
   - nomeCurto .......... nome curto, usado no topo do site e no rodapé
   - frase ............... uma frase curta de desejo (máx. 2 linhas)
   - cidade / estado .... cidade e UF
   - regiao .............. como você chama a região ("Serra do Cadeado", "Vale do Ivaí")

   CONTATO
   - whatsapp ............ SÓ NÚMEROS, com 55 + DDD. Ex.: 5544999998888
   - whatsappExibicao ... como o número aparece na tela. Ex.: (44) 99999-8888
   - instagram ........... @ sem o arroba. Ex.: refugioterraalta
   - email ............... e-mail que você realmente lê

   FOTOS (a imagem principal de cada bloco)
   - Troque o arquivo em assets/ mantendo o MESMO NOME (ex.: hero.svg →
     hero.jpg) e atualize a extensão no campo "imagem".
   - Tamanho recomendado: 1600 px no lado maior, formato .jpg, até 400 KB.
   - SEMPRE preencha o campo "alt": é o que o Google e o leitor de tela leem.

   ACOMODAÇÕES
   - Pode ter de 1 a 4 itens. Para tirar uma, apague o bloco inteiro { ... },
     inclusive a vírgula que sobra.
   - "capacidade" e "area" são texto livre ("2 hóspedes", "38 m²").
   - Nos títulos, você pode colocar uma parte em itálico assim: <em>trecho</em>.

   GALERIA
   - De 6 a 9 fotos. Acima de 9 o layout quebra.

   FAQ
   - São 9 perguntas. Pode editar as respostas e trocar as perguntas, mas
     mantenha as 9: é a seção que mais economiza atendimento no WhatsApp.

   MAPA
   - endereco ........... endereço completo. É ele que posiciona o mapa.
   - linkRota ........... abra o Google Maps, ache sua pousada, clique em
                          "Compartilhar" → "Copiar link" e cole aqui.

   SOBRE
   - paragrafos ......... dois parágrafos com a história de vocês.

   Enquanto for modelo de apresentação, deixe demo.ativo = true. Ao publicar
   o site de um cliente, mude para false (some a faixa de "modelo").
   ========================================================================= */

const SITE_CONFIG = {
  demo: {
    ativo: true,
    texto: "Modelo de site · textos e fotos são exemplos",
    assinatura: "Bside Digital"
  },

  pousada: {
    nome: "Refúgio Terra Alta",
    nomeCurto: "Terra Alta",
    frase: "Quatro chalés no alto da serra, para dois dias em que o único compromisso é o nascer do sol.",
    cidade: "Mauá da Serra",
    estado: "PR",
    regiao: "Serra do Cadeado"
  },

  contato: {
    // Quando demo.ativo = true, TODO clique no WhatsApp cai no número de vendas
    // da Bside com a mensagem de atribuição abaixo. Ao publicar o site de um
    // cliente, troque pelo número dele e ponha demo.ativo = false.
    whatsapp: "5544991528386",
    whatsappExibicao: "(44) 99152-8386",
    instagram: "refugioterraalta",
    email: "contato@refugioterraalta.com.br",
    mensagemPadrao: "Olá! Vi o site do Refúgio Terra Alta e queria consultar disponibilidade.",
    mensagemModelo: "Oi, Márcia! Vi o modelo de site para pousada (Refúgio Terra Alta) e queria uma página assim para a minha."
  },

  hero: {
    imagem: "assets/hero.jpg",
    alt: "Vista do vale ao amanhecer a partir do deck do Refúgio Terra Alta",
    eyebrow: "Mauá da Serra · Serra do Cadeado · Paraná",
    // Use \n para quebrar o título em duas linhas no site
    titulo: "Refúgio\nTerra Alta",
    frase: "A estrada termina aqui. O silêncio começa no portão.",
    ctaTexto: "Consultar disponibilidade",
    ctaSecundario: "Conhecer os chalés",
    itens: [
      "96 km de Maringá",
      "4 chalés independentes",
      "Café da manhã incluso",
      "Aceita pets"
    ]
  },

  acomodacoes: {
    eyebrow: "Acomodações",
    titulo: "Quatro chalés, <em>nenhum vizinho de parede.</em>",
    intro: "Cada chalé foi construído num ponto diferente do terreno, com entrada, deck e vista próprios. Escolha o seu pelo jeito que você quer acordar.",
    itens: [
      {
        nome: "Chalé Mirante",
        capacidade: "2 hóspedes",
        area: "38 m²",
        descricao: "O mais alto do terreno. Deck de madeira virado para o vale, com ofurô e lareira a lenha para as noites frias.",
        itens: ["Cama king", "Ofurô no deck", "Lareira a lenha", "Vista para o vale"],
        imagem: "assets/chale-mirante.jpg",
        alt: "Fachada do Chalé Mirante com deck de madeira e ofurô",
        mensagem: "No exemplo eu escolhi o Chalé Mirante."
      },
      {
        nome: "Chalé Araucária",
        capacidade: "4 hóspedes",
        area: "52 m²",
        descricao: "Pensado para família ou dois casais. Duas suítes, cozinha completa e varanda com rede entre as araucárias.",
        itens: ["2 suítes", "Cozinha completa", "Churrasqueira", "Aceita pets"],
        imagem: "assets/chale-araucaria.jpg",
        alt: "Varanda do Chalé Araucária com rede entre as árvores",
        mensagem: "No exemplo eu escolhi o Chalé Araucária."
      },
      {
        nome: "Cabana Rio Claro",
        capacidade: "2 hóspedes",
        area: "28 m²",
        descricao: "A menor e a mais silenciosa. Banheira de imersão colada na janela panorâmica, de frente para o nascer do sol.",
        itens: ["Cama queen", "Banheira panorâmica", "Café na varanda", "Sem TV"],
        imagem: "assets/cabana-rio-claro.jpg",
        alt: "Banheira de imersão da Cabana Rio Claro diante da janela panorâmica",
        mensagem: "No exemplo eu escolhi a Cabana Rio Claro."
      },
      {
        nome: "Suíte Figueira",
        capacidade: "3 hóspedes",
        area: "34 m²",
        descricao: "Entrada pelo jardim, sem escada. Cama queen e uma de solteiro, varanda privativa e sombra da figueira o dia inteiro.",
        itens: ["Cama queen + solteiro", "Acesso sem escada", "Varanda privativa", "Aceita pets"],
        imagem: "assets/suite-figueira.jpg",
        alt: "Entrada da Suíte Figueira pelo jardim, com varanda privativa",
        mensagem: "No exemplo eu escolhi a Suíte Figueira."
      }
    ]
  },

  diferenciais: {
    eyebrow: "Por que aqui",
    titulo: "O que faz o fim de semana <em>valer a viagem.</em>",
    itens: [
      {
        titulo: "Localização",
        texto: "A 96 km de Maringá, no alto da Serra do Cadeado. Asfalto até o distrito; os últimos 4 km são de chão batido, tranquilos para carro de passeio."
      },
      {
        titulo: "Experiências",
        texto: "Trilha até a cachoeira, fogueira sob o céu estrelado, banho de ofurô no fim da tarde e café da manhã servido no deck, se você pedir."
      },
      {
        titulo: "Design",
        texto: "Madeira de demolição, ferro e vidro. Nada de decoração de hotel: cada peça foi escolhida para o lugar onde está."
      },
      {
        titulo: "Natureza",
        texto: "Doze hectares de mata preservada, três nascentes e nenhum vizinho à vista. Todos os chalés recebem o sol da manhã."
      }
    ]
  },

  galeria: {
    eyebrow: "Galeria",
    titulo: "O que você vai ver <em>da janela.</em>",
    intro: "Fotos do terreno, dos chalés e do que dá para fazer sem sair daqui.",
    fotos: [
      { src: "assets/galeria-01.jpg", alt: "Deck do Chalé Mirante no fim da tarde", legenda: "Deck do Mirante, fim da tarde" },
      { src: "assets/galeria-02.jpg", alt: "Café da manhã servido na varanda do chalé", legenda: "Café da manhã na varanda" },
      { src: "assets/galeria-03.jpg", alt: "Ofurô com vista para o vale", legenda: "Ofurô com vista para o vale" },
      { src: "assets/galeria-04.jpg", alt: "Trilha que leva à cachoeira", legenda: "Trilha da cachoeira" },
      { src: "assets/galeria-05.jpg", alt: "Fogueira acesa à noite", legenda: "Fogueira e céu estrelado" },
      { src: "assets/galeria-06.jpg", alt: "Detalhe da madeira de demolição", legenda: "Madeira de demolição" },
      { src: "assets/galeria-07.jpg", alt: "Cama do Chalé Araucária ao entardecer", legenda: "Chalé Araucária" },
      { src: "assets/galeria-08.jpg", alt: "Nascer do sol visto da cama", legenda: "Nascer do sol da cama" },
      { src: "assets/galeria-09.jpg", alt: "Estrada de acesso no outono", legenda: "Estrada de acesso" }
    ]
  },

  faq: {
    eyebrow: "Dúvidas",
    titulo: "Antes de você <em>perguntar.</em>",
    intro: "As respostas para o que mais chega no nosso WhatsApp. Se ficar qualquer coisa, é só chamar.",
    itens: [
      {
        pergunta: "Qual é a diária mínima?",
        resposta: "Depende da data. De domingo a quinta, aceitamos uma noite; de sexta a domingo e em feriados, o mínimo é de duas. Mande as datas que você quer e confirmamos na hora."
      },
      {
        pergunta: "O café da manhã está incluso?",
        resposta: "Sim. Uma cesta com pães, bolo, frutas, queijos e café da roça é deixada na porta do chalé entre 7h30 e 9h. Todos os chalés têm cozinha equipada para as outras refeições."
      },
      {
        pergunta: "Vocês aceitam animais de estimação?",
        resposta: "O Chalé Araucária e a Suíte Figueira são pet friendly, para cães de até 20 kg, um por acomodação. Avise na reserva para deixarmos cama e tigelas prontas."
      },
      {
        pergunta: "Quantas pessoas cabem em cada chalé?",
        resposta: "Mirante e Rio Claro acomodam 2 pessoas, a Figueira acomoda 3 e o Araucária, 4. Não trabalhamos com cama extra nem colchão no chão."
      },
      {
        pergunta: "A estrada de acesso é boa?",
        resposta: "Sim, para carro de passeio. São 4 km de chão batido depois do asfalto, com subida suave. Em dia de chuva forte recomendamos carro alto — avisamos na véspera se for o caso."
      },
      {
        pergunta: "Tem comércio ou restaurante perto?",
        resposta: "O mercado e as padarias ficam no distrito, a 12 minutos. Para jantar, há duas opções a 20 minutos de carro. Muitos hóspedes trazem comida e aproveitam a cozinha do chalé."
      },
      {
        pergunta: "Tem trilha ou atrativo para fazer?",
        resposta: "A trilha da cachoeira sai do estacionamento e leva 40 minutos, ida e volta, com banho no poço no final. Também indicamos o mirante do Cadeado, a 15 minutos de carro, e a estrada da serra no fim da tarde."
      },
      {
        pergunta: "Vocês fazem decoração romântica ou serviços extras?",
        resposta: "Fazemos arranjo de flores, espumante, tábua de frios, fogueira preparada e café da manhã no deck. Os valores são combinados no WhatsApp, junto com a reserva."
      },
      {
        pergunta: "Como pego a chave e faço o check-in?",
        resposta: "O check-in é das 14h às 20h. Você avisa a hora prevista de chegada e nós recebemos na portaria. Se for chegar depois das 20h, deixamos a chave no cofre e enviamos o código."
      }
    ]
  },

  mapa: {
    eyebrow: "Como chegar",
    titulo: "A estrada também <em>faz parte.</em>",
    endereco: "Estrada do Cadeado, km 4 — Zona Rural, Mauá da Serra – PR, 86828-000",
    linkRota: "https://www.google.com/maps/search/?api=1&query=Estrada+do+Cadeado+Mau%C3%A1+da+Serra+PR",
    referencias: [
      "96 km de Maringá, cerca de 1h40 pela BR-376.",
      "Últimos 4 km de chão batido, sem buraco, tranquilos para carro de passeio.",
      "No distrito, siga pela estrada do Cadeado até a placa do Refúgio, à direita."
    ],
    aviso: "O sinal de celular é fraco no último trecho. Baixe o mapa antes de sair."
  },

  sobre: {
    eyebrow: "Quem recebe",
    titulo: "A gente morava na cidade e vinha <em>passar o fim de semana aqui.</em>",
    paragrafos: [
      "O Terra Alta começou com um terreno da família da Ana que ninguém sabia o que fazer. Em 2019 plantamos as primeiras mudas, levantamos um galpão para guardar ferramenta e passamos a dormir lá nos fins de semana. O primeiro chalé nasceu da madeira que sobrou desse galpão.",
      "Hoje somos quatro chalés, dois cachorros e uma horta que cresce mais do que deveria. A ideia continua a mesma: receber pouca gente, com atenção de verdade. Quem chega costuma voltar — e a gente faz questão de lembrar do nome."
    ],
    foto: "assets/sobre.jpg",
    alt: "Porta do chalé do Refúgio Terra Alta, com a horta ao lado",
    assinatura: "Ana e Rafael · anfitriões"
  },

  rodape: {
    enderecoLinhas: [
      "Estrada do Cadeado, km 4 — Zona Rural",
      "Mauá da Serra – PR · 86828-000"
    ],
    politicas: [
      "Check-in das 14h às 20h · Check-out até 11h",
      "Pets de até 20 kg, sob consulta",
      "Cancelamento gratuito até 7 dias antes da entrada"
    ],
    cnpj: "CNPJ 00.000.000/0001-00 (exemplo)"
  }
};

/* Não apague esta linha: é ela que entrega os dados para o site. */
window.SITE_CONFIG = SITE_CONFIG;
