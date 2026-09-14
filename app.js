// Template page club : tout le contenu vient de config.js (window.CLUB). Rien à modifier ici.
(function () {
  const C = window.CLUB || {};
  const $ = (id) => document.getElementById(id);
  const esc = (t) => String(t == null ? "" : t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // Couleur d'accent
  if (C.accent) document.documentElement.style.setProperty("--accent", C.accent);

  // Qui a envoyé la page (?r=prenom) : uniquement des liens publics déclarés dans config.js
  const ref = (new URLSearchParams(location.search).get("r") || "").toLowerCase().replace(/[^a-z0-9_-]/g, "");
  const contacts = C.contacts || {};
  const contact = contacts[ref] || contacts[C.contactParDefaut] || Object.values(contacts)[0] || { prenom: "nous", lien: "#" };
  const avecPrenom = (t) => String(t || "").replace(/\{prenom\}/g, contact.prenom);

  // Marque
  const marque = $("marque");
  marque.innerHTML = C.logo ? `<img src="${esc(C.logo)}" alt="${esc(C.nom)}">` : `<span class="dot"></span><span>${esc(C.nom)}</span>`;
  document.title = C.nom || document.title;

  // Hero
  if (contacts[ref]) $("badgeTexte").textContent = `Page envoyée par ${contact.prenom}`;
  $("h1").innerHTML = `${esc(C.titre)}<br><em>${esc(C.titreAccent)}</em>`;
  $("sousTitre").textContent = C.sousTitre || "";

  // Vidéo : façade cliquable, le lecteur YouTube ne se charge qu'au clic
  const facade = (el, id, duree) => {
    if (!el) return;
    if (!id) { el.remove(); return; }
    el.innerHTML = `<img src="https://i.ytimg.com/vi/${encodeURIComponent(id)}/maxresdefault.jpg" alt="Aperçu vidéo" onerror="this.onerror=null;this.src='https://i.ytimg.com/vi/${encodeURIComponent(id)}/hqdefault.jpg'"><button class="play" aria-label="Lire la vidéo"></button>${duree ? `<span class="duree">${esc(duree)}</span>` : ""}`;
    el.addEventListener("click", () => {
      if (el.querySelector("iframe")) return;
      el.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0&modestbranding=1" title="Vidéo" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
      mesure("video-" + (el.id || "faq"));
    });
  };
  $("titreVideo").textContent = contacts[ref] ? `Regarde cette vidéo avant d'écrire à ${contact.prenom}.` : "Regarde cette vidéo avant d'aller plus loin.";
  facade($("videoHero"), (C.video || {}).youtube, (C.video || {}).duree);

  // Étape 2 : accès
  $("acces").innerHTML = (C.acces || []).map((a, i) => `<div class="carte reveal"><i>${String(i + 1).padStart(2, "0")}</i><h3>${esc(a.titre)}</h3><p>${esc(a.texte)}</p></div>`).join("");

  // Étape 3 : déroulé
  $("deroule").innerHTML = (C.deroule || []).map((d, i) => `<li class="reveal"><span class="num">${i + 1}</span><div><h3>${esc(avecPrenom(d.titre))}</h3><p>${esc(avecPrenom(d.texte))}</p></div></li>`).join("");

  // Chiffres : compteur qui monte de 0 ; null = "..." (à remplir)
  const chiffres = (C.chiffres || []).filter(Boolean);
  if (!chiffres.length) $("chiffresSection").remove();
  else $("chiffres").innerHTML = chiffres.map((c) => `<div class="chiffre reveal"><b data-cible="${c.valeur == null ? "" : Number(c.valeur)}" data-suffixe="${esc(c.suffixe || "")}">${c.valeur == null ? "..." : "0" + esc(c.suffixe || "")}</b><span>${esc(c.label)}</span></div>`).join("");
  const compte = (el) => {
    if (el.dataset.cible === "") return;
    const cible = Number(el.dataset.cible), suf = el.dataset.suffixe || "", debut = performance.now(), duree = 1300;
    const pas = (t) => { const p = Math.min(1, (t - debut) / duree), e = 1 - Math.pow(1 - p, 3); el.textContent = Math.round(cible * e).toLocaleString("fr-FR") + suf; if (p < 1) requestAnimationFrame(pas); };
    requestAnimationFrame(pas);
  };

  // Témoignages façon Kéo : captures 4:5, défilement, zoom au clic
  const placeholder = (n) => "data:image/svg+xml;utf8," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="440" height="550" viewBox="0 0 440 550"><rect width="440" height="550" fill="#161616"/><rect x="24" y="24" width="392" height="502" rx="14" fill="#1d1d1d" stroke="#2a2a2a"/><circle cx="72" cy="80" r="20" fill="#2a2a2a"/><rect x="104" y="66" width="140" height="12" rx="6" fill="#2e2e2e"/><rect x="104" y="86" width="90" height="10" rx="5" fill="#262626"/><rect x="52" y="130" width="336" height="14" rx="7" fill="#2a2a2a"/><rect x="52" y="156" width="300" height="14" rx="7" fill="#2a2a2a"/><rect x="52" y="182" width="320" height="14" rx="7" fill="#2a2a2a"/><rect x="52" y="208" width="200" height="14" rx="7" fill="#2a2a2a"/><text x="220" y="330" text-anchor="middle" font-family="Inter,Helvetica,Arial" font-size="22" fill="#6b6b6b">Capture témoignage ${n}</text><text x="220" y="362" text-anchor="middle" font-family="Inter,Helvetica,Arial" font-size="14" fill="#4a4a4a">à remplacer dans config.js</text></svg>`);
  const temoins = (C.temoignages || []).map((t, i) => (t === "placeholder" ? placeholder(i + 1) : t));
  if (!temoins.length) $("temoignages").remove();
  else {
    $("temoignagesTitre").textContent = C.temoignagesTitre || "Ce que disent les membres.";
    $("temoignagesSous").textContent = C.temoignagesSous || "";
    const carte = (src, i) => `<figure class="capture" data-src="${esc(src)}"><img src="${esc(src)}" alt="Témoignage ${i + 1}" loading="lazy"></figure>`;
    const liste = temoins.map(carte).join("");
    $("track").innerHTML = liste + liste;
    const lb = $("lightbox"), lbImg = $("lightboxImg");
    $("track").addEventListener("click", (e) => { const f = e.target.closest(".capture"); if (!f) return; lbImg.src = f.dataset.src; lb.hidden = false; mesure("zoom-temoignage"); });
    const ferme = () => { lb.hidden = true; lbImg.src = ""; };
    $("fermer").addEventListener("click", ferme);
    lb.addEventListener("click", (e) => { if (e.target === lb) ferme(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") ferme(); });
  }

  // FAQ : accordéon natif, réponse écrite, vidéo facultative
  $("faq").innerHTML = (C.faq || []).map((f, i) => `<details class="reveal"${i === 0 ? " open" : ""}><summary>${esc(avecPrenom(f.q))}<span class="chev"></span></summary><div class="rep"><p>${esc(avecPrenom(f.r))}</p>${f.video ? `<div class="video" id="faqVideo${i}"></div>` : ""}</div></details>`).join("");
  (C.faq || []).forEach((f, i) => { if (f.video) facade($("faqVideo" + i), f.video, ""); });

  // Bloc final
  $("finalTitre").textContent = C.finalTitre || "";
  $("finalTexte").textContent = C.finalTexte || "";
  $("finalLignes").innerHTML = (C.finalLignes || []).map((l) => `<li><span class="case"></span>${esc(avecPrenom(l))}</li>`).join("");
  const cta = $("cta");
  cta.textContent = avecPrenom(C.boutonTexte || "J'écris à {prenom}");
  cta.href = contact.lien || "#";
  cta.addEventListener("click", () => mesure("clic-cta-" + (contacts[ref] ? ref : "defaut")));
  $("antiUrgence").textContent = C.antiUrgence || "";

  // Footer
  $("legal1").textContent = C.legal1 || "";
  $("legal2").textContent = C.legal2 || "";
  $("editeur").textContent = C.editeur ? "Éditeur : " + C.editeur : "";
  $("copy").textContent = `© ${new Date().getFullYear()} ${C.nom || ""}. Tous droits réservés.`;

  // Apparition au scroll (cascade 80 ms entre voisins) + compteurs
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target, freres = [...el.parentElement.children].filter((x) => x.classList.contains("reveal"));
      el.style.transitionDelay = Math.min(freres.indexOf(el), 6) * 80 + "ms";
      el.classList.add("in");
      el.querySelectorAll("b[data-cible]").forEach(compte);
      obs.unobserve(el);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));

  // Mesure facultative (GoatCounter) : un événement par action, aucune donnée personnelle
  function mesure(nom) {
    if (!C.goatcounter) return;
    try { const i = new Image(); i.src = C.goatcounter + "?p=" + encodeURIComponent("/" + nom) + "&e=true&t=" + encodeURIComponent(nom) + "&rnd=" + Math.random(); } catch (e) {}
  }
  if (C.goatcounter) mesure("vue-" + (contacts[ref] ? ref : "defaut"));
})();
