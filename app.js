// Template page club : tout le contenu vient de config.js (window.CLUB). Rien à modifier ici.
(function () {
  const C = window.CLUB || {};
  const $ = (id) => document.getElementById(id);
  const esc = (t) => String(t == null ? "" : t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const ytId = (v) => encodeURIComponent(String(v || "").trim());

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
  const facade = (el, id, duree, nom) => {
    if (!el) return;
    if (!id) { el.remove(); return; }
    el.innerHTML = `<img src="https://i.ytimg.com/vi/${ytId(id)}/maxresdefault.jpg" alt="Aperçu vidéo" onerror="this.onerror=null;this.src='https://i.ytimg.com/vi/${ytId(id)}/hqdefault.jpg'"><button class="play" aria-label="Lire la vidéo"></button>${duree ? `<span class="duree">${esc(duree)}</span>` : ""}`;
    el.addEventListener("click", () => {
      if (el.querySelector("iframe")) return;
      el.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${ytId(id)}?autoplay=1&rel=0&modestbranding=1" title="Vidéo" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
      mesure("video-" + (nom || "faq"));
    });
  };
  $("titreVideo").textContent = contacts[ref] ? `Regarde cette vidéo avant d'écrire à ${contact.prenom}.` : "Regarde cette vidéo avant d'aller plus loin.";
  facade($("videoHero"), (C.video || {}).youtube, (C.video || {}).duree, "hero");

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

  // Lightbox : image (capture) ou vidéo (iframe)
  const lb = $("lightbox"), lbContenu = $("lightboxContenu");
  const ouvreImage = (src) => { lbContenu.innerHTML = `<img src="${esc(src)}" alt="Capture">`; lb.hidden = false; };
  const ouvreVideo = (id) => { lbContenu.innerHTML = `<div class="cadre"><iframe src="https://www.youtube-nocookie.com/embed/${ytId(id)}?autoplay=1&rel=0&modestbranding=1" title="Vidéo témoignage" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>`; lb.hidden = false; };
  const ferme = () => { lb.hidden = true; lbContenu.innerHTML = ""; };
  $("fermer").addEventListener("click", ferme);
  lb.addEventListener("click", (e) => { if (e.target === lb) ferme(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") ferme(); });

  // Témoignages façon Hans : carte = qui, capital de départ → résultat, durée, capture, vidéo
  const captureFictive = (depart, arrivee) => "data:image/svg+xml;utf8," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360"><rect width="640" height="360" fill="#0f0f0f"/><rect x="16" y="16" width="608" height="328" rx="10" fill="#151515" stroke="#262626"/><text x="36" y="52" font-family="Inter,Helvetica,Arial" font-size="13" fill="#7a7a7a">Solde du compte (exemple fictif)</text><text x="36" y="86" font-family="Inter,Helvetica,Arial" font-size="26" font-weight="700" fill="#ededed">${esc(arrivee)}</text><polyline points="36,300 120,280 180,292 250,250 320,262 390,214 450,226 520,180 604,150" fill="none" stroke="#00C896" stroke-width="3" stroke-linejoin="round"/><line x1="36" y1="310" x2="604" y2="310" stroke="#262626"/><text x="36" y="332" font-family="Inter,Helvetica,Arial" font-size="12" fill="#5a5a5a">Départ ${esc(depart)}</text><text x="604" y="332" text-anchor="end" font-family="Inter,Helvetica,Arial" font-size="12" fill="#5a5a5a">Exemple fictif</text></svg>`);
  const temoins = C.temoignages || [];
  if (!temoins.length) $("temoignages").remove();
  else {
    $("temoignagesTitre").textContent = C.temoignagesTitre || "Ce que disent les membres.";
    $("temoignagesSous").textContent = C.temoignagesSous || "";
    const note = $("temoignagesNote");
    if (temoins.some((t) => t.fictif) && C.temoignagesNote) note.textContent = C.temoignagesNote; else note.remove();
    const carte = (t, i) => {
      const cap = t.capture === "placeholder" ? captureFictive(t.depart, t.arrivee) : t.capture;
      const ini = (t.prenom || "?").charAt(0).toUpperCase();
      return `<article class="tcard" data-i="${i}">
        <div class="tqui"><div class="tavatar">${t.photo ? `<img src="${esc(t.photo)}" alt="">` : esc(ini)}</div><div><div class="tnom">${esc(t.prenom)} ${esc(t.nom || "")}${t.fictif ? ` <span class="tfictif">Exemple fictif</span>` : ""}</div>${t.handle ? `<div class="thandle">@${esc(t.handle)}</div>` : ""}</div></div>
        <div class="tmetric">${esc(t.depart)} <span class="fleche">→</span> ${esc(t.arrivee)}</div>
        <div class="ttag">${esc(t.duree ? "en " + t.duree : "")}${t.duree && t.profil ? " · " : ""}${esc(t.profil || "")}</div>
        ${cap ? `<button class="tcapture" data-src="${esc(cap)}" aria-label="Voir la capture"><img src="${esc(cap)}" alt="Capture" loading="lazy"></button>` : ""}
        <p class="ttexte">${esc(t.texte || "")}</p>
        ${t.video ? `<button class="tvideo" data-video="${esc(t.video)}"><span class="tplay"></span>Voir la vidéo</button>` : ""}
      </article>`;
    };
    const liste = temoins.map(carte).join("");
    $("track").innerHTML = liste + liste;
    $("track").addEventListener("click", (e) => {
      const v = e.target.closest(".tvideo"); if (v) { ouvreVideo(v.dataset.video); mesure("temoignage-video"); return; }
      const c = e.target.closest(".tcapture"); if (c) { ouvreImage(c.dataset.src); mesure("temoignage-capture"); }
    });
  }

  // Questions : dépliables (la question se déplie), la vidéo dans chaque réponse, une ligne de texte max
  $("faq").innerHTML = (C.faq || []).map((f, i) => `<details class="reveal"${i === 0 ? " open" : ""}><summary>${esc(avecPrenom(f.q))}<span class="chev"></span></summary><div class="rep"><div class="video" id="faqVideo${i}"></div>${f.r ? `<p>${esc(avecPrenom(f.r))}</p>` : ""}</div></details>`).join("");
  (C.faq || []).forEach((f, i) => facade($("faqVideo" + i), f.video || C.faqVideoDefaut, "", "q" + (i + 1)));

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
