// Template page club : tout le contenu vient de config.js (window.CLUB). Rien à modifier ici.
(function () {
  const C = window.CLUB || {};
  const $ = (id) => document.getElementById(id);
  const esc = (t) => String(t == null ? "" : t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const ytId = (v) => encodeURIComponent(String(v || "").trim());
  const CHARGE = performance.now();

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
  // Lecteur automatique : démarre en muet dès qu'il est à l'écran, bouton "Activer le son" qui relance du début avec le son
  const ICONE_SON = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>';
  const lecteurAuto = (el, id, nom) => {
    if (!el) return;
    if (!id) { el.remove(); return; }
    el.classList.add("auto");
    const cmd = (func, args) => { const f = el.querySelector("iframe"); if (f && f.contentWindow) f.contentWindow.postMessage(JSON.stringify({ event: "command", func, args: args || [] }), "*"); };
    el.lance = () => {
      if (el.querySelector("iframe")) { cmd("playVideo"); return; }
      const f = document.createElement("iframe");
      f.src = `https://www.youtube-nocookie.com/embed/${ytId(id)}?autoplay=1&mute=1&playsinline=1&enablejsapi=1&rel=0&modestbranding=1&origin=${encodeURIComponent(location.origin)}`;
      f.title = "Vidéo"; f.allow = "autoplay; encrypted-media; picture-in-picture"; f.allowFullscreen = true;
      el.innerHTML = ""; el.appendChild(f);
      const b = document.createElement("button"); b.type = "button"; b.className = "son"; b.innerHTML = ICONE_SON + "<span>Activer le son</span>";
      b.addEventListener("click", (e) => { e.stopPropagation(); cmd("seekTo", [0, true]); cmd("unMute"); cmd("setVolume", [100]); cmd("playVideo"); b.remove(); mesure("son-" + nom); });
      el.appendChild(b);
      mesure("auto-" + nom);
    };
    el.pause = () => cmd("pauseVideo");
    el.arrete = () => { el.innerHTML = ""; };
    obsAuto.observe(el);
  };
  // À l'écran : on lance (ou on reprend) ; hors écran : on met en pause
  const obsAuto = new IntersectionObserver((entries) => {
    entries.forEach((e) => { const el = e.target; if (!el.isConnected || !el.lance) return; if (e.isIntersecting) el.lance(); else if (el.querySelector("iframe")) el.pause(); });
  }, { threshold: 0.35 });

  $("titreVideo").textContent = contacts[ref] ? `Regarde cette vidéo avant d'écrire à ${contact.prenom}.` : "Regarde cette vidéo avant d'aller plus loin.";
  lecteurAuto($("videoHero"), (C.video || {}).youtube, "hero");

  // Étape 2 : accès
  $("acces").innerHTML = (C.acces || []).map((a, i) => `<div class="carte reveal"><i>${String(i + 1).padStart(2, "0")}</i><h3>${esc(a.titre)}</h3><p>${esc(a.texte)}</p></div>`).join("");

  // Étape 3 : déroulé
  $("deroule").innerHTML = (C.deroule || []).map((d, i) => `<li class="reveal"><span class="num">${i + 1}</span><div><h3>${esc(avecPrenom(d.titre))}</h3><p>${esc(avecPrenom(d.texte))}</p></div></li>`).join("");

  // Chiffres : compteur qui monte de 0 ; null = "..." (à remplir)
  const chiffres = (C.chiffres || []).filter(Boolean);
  if (!chiffres.length) $("chiffresSection").remove();
  else {
    const BADGE_APPLE = `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M16.4 12.6c0-2.2 1.8-3.3 1.9-3.3-1-1.5-2.6-1.7-3.2-1.8-1.4-.1-2.7.8-3.4.8-.7 0-1.8-.8-3-.8-1.5 0-2.9.9-3.7 2.3-1.6 2.8-.4 6.9 1.1 9.1.8 1.1 1.7 2.3 2.9 2.3 1.2 0 1.6-.8 3-.8s1.8.8 3 .7c1.2 0 2-1.1 2.8-2.2.9-1.3 1.2-2.5 1.2-2.6 0 0-2.4-.9-2.6-3.7zM14.2 5.9c.6-.8 1.1-1.8.9-2.9-.9 0-2 .6-2.7 1.4-.6.7-1.1 1.8-1 2.8 1.1.1 2.1-.5 2.8-1.3z"/></svg>`;
    const BADGE_PLAY = `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M4 3.5v17c0 .6.6 1 1.1.7L19.6 12 5.1 2.8C4.6 2.5 4 2.9 4 3.5z"/></svg>`;
    const badge = (lien, ico, petit, grand) => `<${lien ? `a href="${esc(lien)}" target="_blank" rel="noopener"` : "span"} class="store">${ico}<span><small>${petit}</small>${grand}</span></${lien ? "a" : "span"}>`;
    $("chiffres").innerHTML = chiffres.map((c) => {
      const haut = c.texte != null ? `<b>${esc(c.texte)}</b>` : `<b data-cible="${c.valeur == null ? "" : Number(c.valeur)}" data-prefixe="${esc(c.prefixe || "")}" data-suffixe="${esc(c.suffixe || "")}">${c.valeur == null ? "..." : esc(c.prefixe || "") + "0" + esc(c.suffixe || "")}</b>`;
      const stores = c.stores ? `<div class="stores">${badge(C.appStore, BADGE_APPLE, "Télécharger sur", "App Store")}${badge(C.googlePlay, BADGE_PLAY, "Disponible sur", "Google Play")}</div>` : "";
      return `<div class="chiffre reveal">${haut}<span>${esc(c.label)}</span>${stores}</div>`;
    }).join("");
  }
  const compte = (el) => {
    if (el.dataset.cible === "") return;
    const cible = Number(el.dataset.cible), pre = el.dataset.prefixe || "", suf = el.dataset.suffixe || "", debut = performance.now(), duree = 1300;
    const pas = (t) => { const p = Math.min(1, (t - debut) / duree), e = 1 - Math.pow(1 - p, 3); el.textContent = pre + Math.round(cible * e).toLocaleString("fr-FR") + suf; if (p < 1) requestAnimationFrame(pas); };
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
  (C.faq || []).forEach((f, i) => {
    const el = $("faqVideo" + i), det = el && el.closest("details");
    if (!el) return;
    const id = f.video || C.faqVideoDefaut;
    if (!id) { el.remove(); return; }
    el.classList.add("auto");
    // Fermée : rien n'est chargé. Ouverte : lecteur automatique (la première est ouverte au chargement et démarre quand elle arrive à l'écran).
    // Chrome envoie un "toggle" au chargement pour la question déjà ouverte : dans ce cas on laisse l'observateur démarrer la vidéo quand elle arrive à l'écran.
    const arme = () => { if (!el.lance) lecteurAuto(el, id, "q" + (i + 1)); if (det.open && performance.now() - CHARGE > 1500) el.lance(); };
    det.addEventListener("toggle", () => { if (det.open) arme(); else if (el.arrete) { obsAuto.unobserve(el); el.arrete(); el.lance = null; } });
    if (det.open) { if (!el.lance) lecteurAuto(el, id, "q" + (i + 1)); }
  });

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
