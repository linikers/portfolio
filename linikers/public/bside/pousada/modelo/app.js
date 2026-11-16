/* ==========================================================================
   app.js — monta a página a partir do config.js.
   Não precisa editar este arquivo para trocar textos ou fotos.
   ========================================================================== */
(function () {
  "use strict";

  var C = (typeof SITE_CONFIG !== "undefined") ? SITE_CONFIG : window.SITE_CONFIG;
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var root = document.documentElement;

  if (!C) {
    console.error("config.js não carregou.");
    return;
  }

  /* ---------- WhatsApp --------------------------------------------------- */
  var BASE = window.SITE_BASE || "";
  function assetSrc(p) {
    if (!p) return "";
    if (/^(https?:)?\/\//.test(p) || p.charAt(0) === "/" || p.indexOf("data:") === 0) return p;
    return BASE + p;
  }

  var waNumber = String(C.contato.whatsapp).replace(/\D/g, "");
  var modoModelo = Boolean(C.demo && C.demo.ativo && C.contato.mensagemModelo);
  function waLink(msg) {
    var texto;
    if (modoModelo) {
      texto = C.contato.mensagemModelo + (msg ? "\n\n" + msg : "");
    } else {
      texto = msg || C.contato.mensagemPadrao;
    }
    return "https://wa.me/" + waNumber + "?text=" + encodeURIComponent(texto);
  }
  function setWa(el, msg) {
    if (!el) return;
    el.href = waLink(msg);
    el.target = "_blank";
    el.rel = "noopener";
  }

  /* ---------- Cabeçalho / marca ----------------------------------------- */
  var nomeCurto = C.pousada.nomeCurto || C.pousada.nome;
  $("#brand-name").textContent = nomeCurto;
  $("#brand-sub").textContent = "pousada";
  $("#footer-brand-name").textContent = nomeCurto;
  $("#footer-tagline").textContent = C.pousada.frase;
  $("#footer-copy-name").textContent = C.pousada.nome;
  $("#footer-cnpj").textContent = C.rodape.cnpj || "";
  $("#year").textContent = new Date().getFullYear();

  document.title = C.pousada.nome + " — chalés em " + C.pousada.cidade + ", " + C.pousada.estado;
  var metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", C.pousada.frase + " " + C.pousada.cidade + " – " + C.pousada.estado + ".");

  setWa($("#header-cta"), C.contato.mensagemPadrao);
  setWa($("#header-wa"), C.contato.mensagemPadrao);
  setWa($("#wa-bar-btn"), C.contato.mensagemPadrao);
  setWa($("#wa-float"), C.contato.mensagemPadrao);
  setWa($("#faq-wa"), C.contato.mensagemPadrao);
  setWa($("#footer-wa"), C.contato.mensagemPadrao);
  $("#footer-wa").textContent = "WhatsApp " + C.contato.whatsappExibicao;

  setWa($("#footer-bside"), "Quero um site assim para a minha pousada.");

  var ig = String(C.contato.instagram || "").replace(/^@/, "");
  $("#footer-ig").href = "https://instagram.com/" + ig;
  $("#footer-ig").textContent = "@" + ig;
  $("#footer-ig").target = "_blank";
  $("#footer-ig").rel = "noopener";
  $("#footer-email").href = "mailto:" + C.contato.email;
  $("#footer-email").textContent = C.contato.email;

  /* ---------- Faixa de modelo ------------------------------------------- */
  if (C.demo && C.demo.ativo) {
    var bar = $("#demo-bar");
    bar.hidden = false;
    bar.innerHTML = C.demo.texto + " · <b>" + C.demo.assinatura + "</b>";
    $("#footer-demo").hidden = false;
  }

  /* ---------- 1. Hero --------------------------------------------------- */
  var hero = C.hero;
  $("#hero-img").src = assetSrc(hero.imagem);
  $("#hero-img").alt = hero.alt || "";
  $("#hero-eyebrow").textContent = hero.eyebrow;
  $("#hero-title").innerHTML = String(hero.titulo)
    .split("\n")
    .map(function (linha) {
      return linha.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    })
    .join("<br>");
  $("#hero-frase").textContent = hero.frase;
  $("#hero-cta-text").textContent = hero.ctaTexto;
  $("#hero-cta-sec").textContent = hero.ctaSecundario;
  setWa($("#hero-cta"), C.contato.mensagemPadrao);

  var meta = $("#hero-meta");
  (hero.itens || []).forEach(function (item) {
    var li = document.createElement("li");
    li.textContent = item;
    meta.appendChild(li);
  });

  /* ---------- 2. Acomodações -------------------------------------------- */
  $("#aco-eyebrow").textContent = C.acomodacoes.eyebrow;
  $("#aco-title").innerHTML = C.acomodacoes.titulo;
  $("#aco-intro").textContent = C.acomodacoes.intro;

  var cards = $("#cards");
  if (C.acomodacoes.itens.length < 4) cards.classList.add("cards--few");
  C.acomodacoes.itens.forEach(function (a) {
    var card = document.createElement("article");
    card.className = "card reveal";
    card.innerHTML =
      '<div class="card-media">' +
        '<img src="' + assetSrc(a.imagem) + '" alt="' + (a.alt || a.nome) + '" loading="lazy" width="1200" height="1500">' +
      "</div>" +
      '<div class="card-body">' +
        '<p class="card-meta"><span>' + a.capacidade + "</span><span>" + a.area + "</span></p>" +
        '<h3 class="card-title">' + a.nome + "</h3>" +
        '<p class="card-desc">' + a.descricao + "</p>" +
        '<ul class="card-list">' + (a.itens || []).map(function (i) { return "<li>" + i + "</li>"; }).join("") + "</ul>" +
        '<div class="card-foot">' +
          '<a class="link-arrow" href="' + waLink(a.mensagem || C.contato.mensagemPadrao) + '" target="_blank" rel="noopener">' +
            "Consultar este chalé" +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>' +
          "</a>" +
        "</div>" +
      "</div>";
    cards.appendChild(card);
  });

  /* ---------- 3. Diferenciais ------------------------------------------- */
  $("#dif-eyebrow").textContent = C.diferenciais.eyebrow;
  $("#dif-title").innerHTML = C.diferenciais.titulo;

  var diffGrid = $("#diff-grid");
  C.diferenciais.itens.forEach(function (d, i) {
    var item = document.createElement("div");
    item.className = "diff-item reveal";
    item.innerHTML =
      '<span class="diff-num">' + ("0" + (i + 1)).slice(-2) + "</span>" +
      '<h3 class="diff-title">' + d.titulo + "</h3>" +
      '<p class="diff-text">' + d.texto + "</p>";
    diffGrid.appendChild(item);
  });

  /* ---------- 4. Galeria + lightbox ------------------------------------- */
  $("#gal-eyebrow").textContent = C.galeria.eyebrow;
  $("#gal-title").innerHTML = C.galeria.titulo;
  $("#gal-intro").textContent = C.galeria.intro;

  var hint = document.querySelector(".gallery-hint");
  if (hint && window.matchMedia("(hover: hover)").matches) {
    hint.textContent = "Clique em uma foto para ver em tela cheia";
  }

  var fotos = C.galeria.fotos;
  var gallery = $("#gallery");

  fotos.forEach(function (f, i) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "gallery-item";
    btn.setAttribute("aria-label", "Ampliar foto: " + (f.legenda || f.alt || "foto " + (i + 1)));
    btn.innerHTML = '<img src="' + assetSrc(f.src) + '" alt="' + (f.alt || "") + '" loading="lazy" width="1200" height="1200">';
    btn.addEventListener("click", function () { openLb(i); });
    gallery.appendChild(btn);
  });

  var lb = $("#lightbox");
  var lbImg = $("#lb-img");
  var lbCount = $("#lb-count");
  var lbCaption = $("#lb-caption");
  var current = 0;
  var lastFocus = null;

  function renderLb() {
    var f = fotos[current];
    lbImg.src = assetSrc(f.src);
    lbImg.alt = f.alt || f.legenda || "";
    lbCount.textContent = ("0" + (current + 1)).slice(-2) + " / " + ("0" + fotos.length).slice(-2);
    lbCaption.textContent = f.legenda || "";
    ["#lb-prev", "#lb-next"].forEach(function (s) { $(s).disabled = fotos.length < 2; });
  }

  function openLb(i) {
    current = i;
    lastFocus = document.activeElement;
    renderLb();
    lb.classList.add("is-open");
    document.body.classList.add("is-locked");
    $("#lb-close").focus();
  }

  function closeLb() {
    lb.classList.remove("is-open");
    document.body.classList.remove("is-locked");
    if (lastFocus) lastFocus.focus();
  }

  function step(n) {
    current = (current + n + fotos.length) % fotos.length;
    renderLb();
  }

  $("#lb-close").addEventListener("click", closeLb);
  $("#lb-prev").addEventListener("click", function () { step(-1); });
  $("#lb-next").addEventListener("click", function () { step(1); });
  lb.addEventListener("click", function (e) {
    if (e.target === lb || e.target.classList.contains("lb-stage")) closeLb();
  });

  document.addEventListener("keydown", function (e) {
    if (!lb.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
    if (e.key === "Tab") {
      var focusables = lb.querySelectorAll("button:not([disabled])");
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  var touchX = null;
  $("#lightbox .lb-stage").addEventListener("touchstart", function (e) {
    touchX = e.changedTouches[0].clientX;
  }, { passive: true });
  $("#lightbox .lb-stage").addEventListener("touchend", function (e) {
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) step(dx > 0 ? -1 : 1);
    touchX = null;
  }, { passive: true });

  /* ---------- 5. FAQ ---------------------------------------------------- */
  $("#faq-eyebrow").textContent = C.faq.eyebrow;
  $("#faq-title").innerHTML = C.faq.titulo;
  $("#faq-intro").textContent = C.faq.intro;

  var acc = $("#acc");
  C.faq.itens.forEach(function (q, i) {
    var item = document.createElement("div");
    item.className = "acc-item";
    item.innerHTML =
      '<h3 style="margin:0">' +
        '<button class="acc-trigger" type="button" aria-expanded="false" aria-controls="faq-p-' + i + '" id="faq-b-' + i + '">' +
          "<span>" + q.pergunta + "</span>" +
          '<span class="acc-icon" aria-hidden="true"></span>' +
        "</button>" +
      "</h3>" +
      '<div class="acc-panel" id="faq-p-' + i + '" role="region" aria-labelledby="faq-b-' + i + '" aria-hidden="true">' +
        "<div><p>" + q.resposta + "</p></div>" +
      "</div>";

    var trigger = item.querySelector(".acc-trigger");
    var panel = item.querySelector(".acc-panel");

    trigger.addEventListener("click", function () {
      var isOpen = item.classList.contains("is-open");
      acc.querySelectorAll(".acc-item.is-open").forEach(function (other) {
        other.classList.remove("is-open");
        other.querySelector(".acc-trigger").setAttribute("aria-expanded", "false");
        other.querySelector(".acc-panel").setAttribute("aria-hidden", "true");
      });
      if (!isOpen) {
        item.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
        panel.setAttribute("aria-hidden", "false");
      }
    });

    acc.appendChild(item);
  });

  /* ---------- 6. Como chegar -------------------------------------------- */
  $("#map-eyebrow").textContent = C.mapa.eyebrow;
  $("#map-title").innerHTML = C.mapa.titulo;
  $("#map-endereco").textContent = C.mapa.endereco;

  var refs = $("#map-refs");
  C.mapa.referencias.forEach(function (r) {
    var li = document.createElement("li");
    li.textContent = r;
    refs.appendChild(li);
  });

  $("#map-iframe").src = "https://www.google.com/maps?q=" + encodeURIComponent(C.mapa.endereco) + "&output=embed&hl=pt-BR&z=13";
  $("#map-rota").href = C.mapa.linkRota;
  $("#map-rota").target = "_blank";
  $("#map-rota").rel = "noopener";

  var aviso = $("#map-aviso");
  if (C.mapa.aviso) {
    aviso.textContent = C.mapa.aviso;
  } else {
    aviso.remove();
  }

  /* ---------- 7. Sobre -------------------------------------------------- */
  $("#about-eyebrow").textContent = C.sobre.eyebrow;
  $("#about-title").innerHTML = C.sobre.titulo;
  $("#about-img").src = assetSrc(C.sobre.foto);
  $("#about-img").alt = C.sobre.alt || "";
  $("#about-sign").textContent = C.sobre.assinatura;

  var paras = $("#about-paragraphs");
  C.sobre.paragrafos.forEach(function (p) {
    var el = document.createElement("p");
    el.textContent = p;
    paras.appendChild(el);
  });

  /* ---------- 8. Rodapé ------------------------------------------------- */
  var addr = $("#footer-address");
  C.rodape.enderecoLinhas.forEach(function (l) {
    var li = document.createElement("li");
    li.textContent = l;
    addr.appendChild(li);
  });

  var pol = $("#footer-policies");
  C.rodape.politicas.forEach(function (p) {
    var li = document.createElement("li");
    li.textContent = p;
    pol.appendChild(li);
  });

  $("#footer-rota").href = C.mapa.linkRota;

  /* ---------- Cabeçalho ao rolar ---------------------------------------- */
  var header = $("#topo");
  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Revelação suave ------------------------------------------- */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealItems = document.querySelectorAll(".reveal");

  if (!reduce && "IntersectionObserver" in window) {
    root.classList.add("js-reveal");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealItems.forEach(function (el) { io.observe(el); });
  }
})();
