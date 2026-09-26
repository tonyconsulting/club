// Template page club : tout le contenu vient de config.js (window.CLUB). Rien à modifier ici.
(function () {
  const C = window.CLUB || {};
  const $ = (id) => document.getElementById(id);
  const esc = (t) => String(t == null ? "" : t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const ytId = (v) => encodeURIComponent(String(v || "").trim());
  const estFichier = (v) => /^(https?:\/\/.+|[^\s]+)\.(mp4|webm|mov|m4v)(\?.*)?$/i.test(String(v || "").trim());   // adresse complète ou chemin relatif (ex. temoignages/maxim-t1.mp4)
  const CHARGE = performance.now();
  const APERCU = new URLSearchParams(location.search).get("apercu") === "1";   // ?apercu=1 : rendu final sans aucune mention « exemple » ni case à remplir (pour juger la page, pas pour la diffuser)

  // Au rechargement, la page repart toujours du haut (pas de retour à l'ancienne position)
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  window.scrollTo(0, 0);
  window.addEventListener("pageshow", () => window.scrollTo(0, 0));
  window.addEventListener("beforeunload", () => window.scrollTo(0, 0));

  // Qui a envoyé la page (?r=prenom) : uniquement des liens publics déclarés dans config.js
  const ref = (new URLSearchParams(location.search).get("r") || window.CLUB_R || "").toLowerCase().replace(/[^a-z0-9_-]/g, "");   // ?r=prenom, sinon la page d'entrée de la personne (dossier /prenom/) fixe window.CLUB_R
  const contacts = C.contacts || {};
  const contact = contacts[ref] || contacts[C.contactParDefaut] || Object.values(contacts)[0] || { prenom: "nous", lien: "#" };
  const avecPrenom = (t) => String(t || "").replace(/\{prenom\}/g, contact.prenom);

  // Thème et couleurs : ceux de la personne (contact.theme, contact.accent, contact.accent2) passent avant ceux de config.js
  const hexRgb = (h, d) => (/^#([0-9a-f]{6})$/i.test(h || "") ? [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)).join(",") : d);
  Object.entries(Object.assign({}, C.theme || {}, contact.theme || {})).forEach(([k, v]) => { if (v) document.documentElement.style.setProperty("--" + k, v); });
  const ACCENT = contact.accent || C.accent || "#6E9BFF";
  document.documentElement.style.setProperty("--accent", ACCENT);
  document.documentElement.style.setProperty("--accent-rgb", hexRgb(ACCENT, "110,155,255"));
  const ACCENT2 = contact.accent2 || C.accent2 || "";   // seconde couleur facultative : dégradé du titre et bouton principal
  if (ACCENT2) { document.documentElement.style.setProperty("--accent2", ACCENT2); document.documentElement.style.setProperty("--accent2-rgb", hexRgb(ACCENT2, "246,196,83")); document.documentElement.classList.add("duo"); }
  if (contact.theme || contact.accent) document.documentElement.classList.add("theme-perso");

  // Marque
  const marque = $("marque");
  marque.innerHTML = C.logo ? `<img src="${esc(C.logo)}" alt="${esc(C.nom)}">` : `<span class="wordmark">${esc(String(C.nom || "").toUpperCase())}</span>`;
  document.title = C.nom || document.title;

  // Identité de la personne qui envoie (photo, nom, abonnés), façon Kéo
  const ident = $("identite");
  if (C.identite !== false && (contact.photo || contact.nom)) {
    ident.innerHTML = `${contact.photo ? `<img class="iavatar" src="${esc(contact.photo)}" alt="">` : ""}<div><div class="inom">${esc(contact.nom || contact.prenom)}${contact.certifie ? ` <span class="icertif" title="Compte certifié" aria-label="Compte certifié"><svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path d="M12 2l2.4 2.1 3.2-.4 1 3.1 2.9 1.5-1.2 3 1.2 3-2.9 1.5-1 3.1-3.2-.4L12 22l-2.4-2.1-3.2.4-1-3.1-2.9-1.5 1.2-3-1.2-3 2.9-1.5 1-3.1 3.2.4z" fill="currentColor"/><path d="M8.5 12.2l2.3 2.3 4.7-4.8" fill="none" stroke="#0a0b10" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>` : ""}</div><div class="isuite">${contact.handle ? `@${esc(contact.handle)}` : ""}${contact.handle && contact.abonnes ? " · " : ""}${contact.abonnes ? `<b>${esc(contact.abonnes)} abonnés</b>` : ""}</div></div>`;
  } else ident.remove();

  // Hero
  $("badgeTexte").textContent = C.badge || "Accès gratuit";
  $("h1").innerHTML = `${esc(C.titre)}<br><em>${esc(C.titreAccent)}</em>`;
  if (C.sousTitre) $("sousTitre").textContent = C.sousTitre; else $("sousTitre").remove();

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
    const fichier = estFichier(id);
    const cmd = (func, args) => { const f = el.querySelector("iframe"); if (f && f.contentWindow) f.contentWindow.postMessage(JSON.stringify({ event: "command", func, args: args || [] }), "*"); };
    el.lance = () => {
      const deja = el.querySelector("iframe, video");
      if (deja) { if (fichier) deja.play().catch(() => {}); else cmd("playVideo"); return; }
      let lecteur;
      if (fichier) {
        // Fichier .mp4 : lecteur natif, muet, démarre seul ; le bouton relance du début avec le son (standard VSL).
        // Attributs posés AVANT la source, et type déclaré explicitement (Safari refuse sinon un fichier servi sans type vidéo).
        lecteur = document.createElement("video");
        lecteur.muted = true; lecteur.defaultMuted = true; lecteur.autoplay = true; lecteur.playsInline = true; lecteur.preload = "auto";
        lecteur.setAttribute("muted", ""); lecteur.setAttribute("playsinline", ""); lecteur.setAttribute("webkit-playsinline", ""); lecteur.setAttribute("autoplay", "");
        if (el.dataset.poster) lecteur.poster = el.dataset.poster;
        const src = document.createElement("source"); src.src = id; src.type = /\.webm/i.test(id) ? "video/webm" : "video/mp4"; lecteur.appendChild(src);
      } else {
        lecteur = document.createElement("iframe");
        lecteur.src = `https://www.youtube-nocookie.com/embed/${ytId(id)}?autoplay=1&mute=1&playsinline=1&enablejsapi=1&rel=0&modestbranding=1&origin=${encodeURIComponent(location.origin)}`;
        lecteur.title = "Vidéo"; lecteur.allow = "autoplay; encrypted-media; picture-in-picture"; lecteur.allowFullscreen = true;
      }
      el.innerHTML = ""; el.appendChild(lecteur);
      const b = document.createElement("button"); b.type = "button"; b.className = "son"; b.innerHTML = ICONE_SON + "<span>Activer le son</span>";
      const avecSon = () => {
        if (fichier) { lecteur.currentTime = 0; lecteur.muted = false; lecteur.volume = 1; lecteur.controls = true; lecteur.play().catch(() => {}); }
        else { cmd("seekTo", [0, true]); cmd("unMute"); cmd("setVolume", [100]); cmd("playVideo"); }
        b.remove(); const p = el.querySelector(".play"); if (p) p.remove(); mesure("son-" + nom);
      };
      b.addEventListener("click", (e) => { e.stopPropagation(); avecSon(); });
      el.appendChild(b);
      if (fichier) {
        // Si le navigateur refuse le démarrage automatique (Safari en économie d'énergie, etc.) : gros bouton lecture, un clic = lecture avec le son
        lecteur.play().catch(() => {
          if (el.querySelector(".play")) return;
          const p = document.createElement("button"); p.type = "button"; p.className = "play"; p.setAttribute("aria-label", "Lire la vidéo");
          p.addEventListener("click", (e) => { e.stopPropagation(); avecSon(); });
          el.appendChild(p);
        });
        lecteur.addEventListener("click", () => { if (lecteur.muted) avecSon(); });
      }
      mesure("auto-" + nom);
    };
    el.pause = () => { const v = el.querySelector("video"); if (v) v.pause(); else cmd("pauseVideo"); };
    el.arrete = () => { el.innerHTML = ""; };
    obsAuto.observe(el);
  };
  // À l'écran : on lance (ou on reprend) ; hors écran : on met en pause
  const obsAuto = new IntersectionObserver((entries) => {
    entries.forEach((e) => { const el = e.target; if (!el.isConnected || !el.lance) return; if (e.isIntersecting) el.lance(); else if (el.querySelector("iframe, video")) el.pause(); });
  }, { threshold: 0.35 });

  $("titreVideo").textContent = avecPrenom(C.titreVideo || "Regarde cette vidéo avant de m'écrire.");
  if ((C.video || {}).poster) $("videoHero").dataset.poster = C.video.poster;
  lecteurAuto($("videoHero"), contact.video || (C.video || {}).youtube, "hero");   // contact.video = la VSL de la personne, sinon la vidéo commune

  // Badges App Store / Google Play (liens dans config.js : appStore, googlePlay)
  const BADGE_APPLE = `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M16.4 12.6c0-2.2 1.8-3.3 1.9-3.3-1-1.5-2.6-1.7-3.2-1.8-1.4-.1-2.7.8-3.4.8-.7 0-1.8-.8-3-.8-1.5 0-2.9.9-3.7 2.3-1.6 2.8-.4 6.9 1.1 9.1.8 1.1 1.7 2.3 2.9 2.3 1.2 0 1.6-.8 3-.8s1.8.8 3 .7c1.2 0 2-1.1 2.8-2.2.9-1.3 1.2-2.5 1.2-2.6 0 0-2.4-.9-2.6-3.7zM14.2 5.9c.6-.8 1.1-1.8.9-2.9-.9 0-2 .6-2.7 1.4-.6.7-1.1 1.8-1 2.8 1.1.1 2.1-.5 2.8-1.3z"/></svg>`;
  const BADGE_PLAY = `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M4 3.5v17c0 .6.6 1 1.1.7L19.6 12 5.1 2.8C4.6 2.5 4 2.9 4 3.5z"/></svg>`;
  const badge = (lien, ico, petit, grand) => `<${lien ? `a href="${esc(lien)}" target="_blank" rel="noopener"` : "span"} class="store">${ico}<span><small>${petit}</small>${grand}</span></${lien ? "a" : "span"}>`;
  const storesHTML = () => `<div class="stores">${badge(C.appStore, BADGE_APPLE, "Télécharger sur", "App Store")}${badge(C.googlePlay, BADGE_PLAY, "Disponible sur", "Google Play")}</div>`;

  // Étape 2 : les trois accès. Une carte avec un lien (canal, page preuves, adresse https) est cliquable en entier.
  const q = contacts[ref] ? "?r=" + ref : "";
  if ($("accesTitre") && C.accesTitre) $("accesTitre").textContent = C.accesTitre;
  if ($("acces")) $("acces").innerHTML = (C.acces || []).map((a, i) => {
    let href = a.canal ? C.lienCanal : (a.lien || "");
    if (href && /^[a-z0-9_-]+\.html$/i.test(href)) href += q;
    const ext = /^https?:/i.test(href);
    const dedans = `${a.nouveau ? `<span class="pill-new">Nouveau</span>` : ""}<i>${String(i + 1).padStart(2, "0")}</i><h3>${esc(a.titre)}</h3><p>${esc(a.texte)}</p>${a.statut ? `<span class="statut"><span class="sdot"></span>${esc(a.statut)}</span>` : ""}${a.preinscription ? `<p class="preins">${esc(avecPrenom(a.preinscription))}</p>` : ""}${a.stores ? storesHTML() : ""}`;
    return href
      ? `<a class="carte carte-clic reveal" href="${esc(href)}"${ext ? ' target="_blank" rel="noopener"' : ""} data-pos="acces-${i + 1}">${dedans}</a>`
      : `<div class="carte reveal">${dedans}</div>`;
  }).join("");
  if ($("acces")) $("acces").addEventListener("click", (e) => { const l = e.target.closest(".carte-clic"); if (l) mesure("clic-" + l.dataset.pos); });

  // Étape 3 : déroulé
  $("deroule").innerHTML = (C.deroule || []).map((d, i) => `<li class="reveal"><span class="num">${i + 1}</span><div class="dtexte"><h3>${esc(avecPrenom(d.titre))}</h3><p>${esc(avecPrenom(d.texte))}</p></div>${d.temps ? `<span class="temps">${esc(d.temps)}</span>` : ""}</li>`).join("");

  // Pourquoi c'est gratuit : le visage de la personne qui envoie + 2 ou 3 phrases à la première personne
  const gPhoto = contact.photoGrande || contact.photo || C.gratuitPhoto;
  if (C.gratuitAffiche !== false && (C.gratuitTextes || []).length) {
    $("gratuitTitre").textContent = C.gratuitTitre || "Pourquoi c'est gratuit.";
    $("gratuitTextes").innerHTML = C.gratuitTextes.map((t) => `<p>${esc(avecPrenom(t))}</p>`).join("");
    if (gPhoto) $("gratuitPhoto").innerHTML = `<img src="${esc(gPhoto)}" alt="${esc(contact.nom || "")}">${contact.nom ? `<span class="gnom">${esc(contact.nom)}</span>` : ""}`; else $("gratuitPhoto").remove();
  } else $("gratuitSection").remove();

  // Résultats façon Kéo : grille de captures du canal, zoom au clic, « Voir plus » déplie le reste
  const tuileFictive = (n) => "data:image/svg+xml;utf8," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="440" height="550" viewBox="0 0 440 550"><rect width="440" height="550" fill="#13141b"/><rect x="24" y="24" width="392" height="502" rx="14" fill="#1a1b24" stroke="#2a2c38"/><circle cx="72" cy="80" r="20" fill="#2a2c38"/><rect x="104" y="66" width="140" height="12" rx="6" fill="#30323f"/><rect x="104" y="86" width="90" height="10" rx="5" fill="#262833"/><rect x="52" y="130" width="336" height="14" rx="7" fill="#2a2c38"/><rect x="52" y="156" width="300" height="14" rx="7" fill="#2a2c38"/><rect x="52" y="182" width="320" height="14" rx="7" fill="#2a2c38"/><rect x="52" y="208" width="200" height="14" rx="7" fill="#2a2c38"/><text x="220" y="330" text-anchor="middle" font-family="Inter,Helvetica,Arial" font-size="22" fill="#6b6e7c">Capture du canal ${n}</text><text x="220" y="362" text-anchor="middle" font-family="Inter,Helvetica,Arial" font-size="14" fill="#4a4c58">exemple, à remplacer</text></svg>`);
  const listeRes = (contact.resultats || C.resultats || []).filter((p) => !(APERCU && p === "placeholder"));   // contact.resultats = les captures des membres de cette personne, sinon la liste commune
  const res = listeRes.map((p, i) => (p === "placeholder" ? tuileFictive(i + 1) : p));
  if (!res.length) $("resultatsSection").remove();
  else {
    $("resultatsTitre").textContent = (contact.resultats ? contact.resultatsTitre : "") || C.resultatsTitre || "Ce qui se passe dans le canal.";
    $("resultatsSous").textContent = (contact.resultats ? contact.resultatsSous : "") || C.resultatsSous || "";
    if (res.length < 4) $("resultats").classList.add("peu");
    const nb = C.resultatsVisibles || 8;
    { const note = $("resultatsNote"); if (!APERCU && listeRes.slice(0, nb).includes("placeholder") && C.resultatsNote) note.textContent = C.resultatsNote; else note.remove(); }   // la note ne s'affiche que si une case à remplir est visible sans cliquer
    $("resultats").innerHTML = res.map((s, i) => `<button class="tuile reveal${listeRes[i] === "placeholder" ? " ex" : ""}" data-src="${esc(s)}" aria-label="Agrandir"${i >= nb ? " hidden" : ""}><img src="${esc(s)}" alt="Capture ${i + 1}" loading="lazy"></button>`).join("");
    // Harmonisation des captures : toutes les cases ont le même fond sombre, et une capture plus claire que les autres
    // (fond d'écran gris au lieu de noir) est assombrie par une courbe gamma calculée sur SON fond : les blancs restent blancs, le texte reste lisible.
    $("resultats").querySelectorAll(".tuile:not(.ex) img").forEach((img) => {
      const teinte = () => { try {
        const cv = document.createElement("canvas"); cv.width = 16; cv.height = 16; const x = cv.getContext("2d", { willReadFrequently: true });
        const moyenne = (sx, sy, sw, sh) => { x.drawImage(img, sx, sy, sw, sh, 0, 0, 16, 16); const d = x.getImageData(0, 0, 16, 16).data; let r = 0, g = 0, b = 0; for (let i = 0; i < d.length; i += 4) { r += d[i]; g += d[i + 1]; b += d[i + 2]; } const n = d.length / 4; r /= n; g /= n; b /= n; return { r, g, b, l: 0.2126 * r + 0.7152 * g + 0.0722 * b }; };
        const W = img.naturalWidth, H = img.naturalHeight, tuile = img.closest(".tuile");
        if (W / H > 1) img.style.objectPosition = "center";   // capture plus large que haute (ex. écran coupé) : centrée dans la case au lieu d'être collée en haut
        const fond = moyenne(W * 0.86, H * 0.2, W * 0.14, H * 0.5);   // bande de droite = fond d'écran de la discussion
        const CIBLE = 14;   // luminosité du fond des captures sombres de référence
        if (fond.l > 19 && fond.l < 110 && !img.dataset.gamma) {   // capture trop claire : assombrie UNE fois (courbe gamma sur un canvas), puis affichée comme une image normale : rien à recalculer au défilement
          const exp = Math.min(1.45, Math.max(1, Math.log(CIBLE / 255) / Math.log(fond.l / 255)));
          const c2 = document.createElement("canvas"); c2.width = W; c2.height = H; const x2 = c2.getContext("2d"); x2.drawImage(img, 0, 0);
          const im = x2.getImageData(0, 0, W, H), px = im.data, lut = new Uint8ClampedArray(256); for (let v = 0; v < 256; v++) lut[v] = Math.round(255 * Math.pow(v / 255, exp));
          for (let k = 0; k < px.length; k += 4) { px[k] = lut[px[k]]; px[k + 1] = lut[px[k + 1]]; px[k + 2] = lut[px[k + 2]]; }
          x2.putImageData(im, 0, 0); img.dataset.gamma = "1"; img.src = c2.toDataURL("image/jpeg", 0.88);
        }
        const bas = moyenne(0, H - 14, W, 14);
        tuile.style.setProperty("--cap-bg", bas.l < 110 ? "#0d0d0d" : `rgb(${Math.round(bas.r)},${Math.round(bas.g)},${Math.round(bas.b)})`);   // capture claire (thème clair) : la case garde sa couleur
      } catch (e) {} };
      if (img.complete && img.naturalWidth) teinte(); else img.addEventListener("load", teinte);
    });
    $("resultats").addEventListener("click", (e) => { const t = e.target.closest(".tuile"); if (t) { ouvreImage(t.dataset.src); mesure("resultat-capture"); } });
    const plus = $("resultatsPlus");
    if (res.length > nb) { plus.hidden = false; plus.addEventListener("click", () => { $("resultats").querySelectorAll(".tuile[hidden]").forEach((t) => { t.hidden = false; t.classList.add("in"); }); plus.remove(); mesure("resultats-plus"); }); }
  }

  // Chiffres : compteur qui monte de 0 ; null = "..." (à remplir)
  const chiffres = (C.chiffres || []).filter(Boolean);
  if (!chiffres.length) $("chiffresSection").remove();
  else {
    $("chiffres").innerHTML = chiffres.map((c) => {
      const haut = c.texte != null ? `<b>${esc(c.texte)}</b>` : `<b data-cible="${c.valeur == null ? "" : Number(c.valeur)}" data-prefixe="${esc(c.prefixe || "")}" data-suffixe="${esc(c.suffixe || "")}">${c.valeur == null ? "..." : esc(c.prefixe || "") + "0" + esc(c.suffixe || "")}</b>`;
      const stores = c.stores ? storesHTML() : "";
      return `<div class="chiffre reveal">${haut}<span>${esc(c.label)}</span>${stores}</div>`;
    }).join("");
  }
  const compte = (el) => {
    if (el.dataset.cible === "") return;
    const cible = Number(el.dataset.cible), pre = el.dataset.prefixe || "", suf = el.dataset.suffixe || "", debut = performance.now(), duree = 1300;
    const pas = (t) => { const p = Math.max(0, Math.min(1, (t - debut) / duree)), e = 1 - Math.pow(1 - p, 3); el.textContent = pre + Math.round(cible * e).toLocaleString("fr-FR").replace(/[\u202f\u00a0]/g, "\u00a0") + suf; if (p < 1) requestAnimationFrame(pas); };
    requestAnimationFrame(pas);
  };

  // Lightbox : image (capture) ou vidéo (iframe)
  const lb = $("lightbox"), lbContenu = $("lightboxContenu");
  const ouvreImage = (src) => { lbContenu.innerHTML = `<img src="${esc(src)}" alt="Capture">`; lb.hidden = false; };
  const ouvreVideo = (id) => {
    lbContenu.innerHTML = estFichier(id)
      ? `<div class="cadre"><video src="${esc(id)}" controls autoplay playsinline></video></div>`
      : `<div class="cadre"><iframe src="https://www.youtube-nocookie.com/embed/${ytId(id)}?autoplay=1&rel=0&modestbranding=1" title="Vidéo témoignage" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>`;
    lb.hidden = false;
  };
  const ferme = () => { lb.hidden = true; lbContenu.innerHTML = ""; };
  $("fermer").addEventListener("click", ferme);
  lb.addEventListener("click", (e) => { if (e.target === lb) ferme(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") ferme(); });

  // Témoignages façon Hans : carte = qui, capital de départ → résultat, durée, capture, vidéo
  // Montants : "1 850 €" → 1850 ; gain = arrivée moins départ, formaté "+1 350 €"
  const montant = (s) => { const n = parseFloat(String(s == null ? "" : s).replace(/[^\d.,-]/g, "").replace(",", ".")); return isNaN(n) ? null : n; };
  const euros = (n) => n.toLocaleString("fr-FR").replace(/[\u202f\u00a0]/g, "\u00a0") + "\u00a0€";
  const gainDe = (t) => { if (t.gain) return t.gain; const d = montant(t.depart), a = montant(t.arrivee); return d != null && a != null ? (a >= d ? "+" : "") + euros(a - d) : ""; };
  // Petit graphique fictif : solde de départ à gauche, solde actuel à droite
  const captureFictive = (depart, arrivee, duree) => "data:image/svg+xml;utf8," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360"><rect width="640" height="360" fill="#0f0f0f"/><rect x="16" y="16" width="608" height="328" rx="10" fill="#151515" stroke="#262626"/><text x="36" y="50" font-family="Inter,Helvetica,Arial" font-size="13" fill="#7a7a7a">Solde du compte${duree ? " · " + esc(duree) : ""}</text>${APERCU ? "" : `<text x="604" y="50" text-anchor="end" font-family="Inter,Helvetica,Arial" font-size="12" fill="#4a4a4a">Exemple fictif</text>`}<line x1="36" y1="290" x2="604" y2="290" stroke="#262626"/><polyline points="60,262 120,248 180,256 250,222 320,232 390,190 450,200 520,150 580,120" fill="none" stroke="${ACCENT}" stroke-width="3" stroke-linejoin="round"/><circle cx="60" cy="262" r="6" fill="#0f0f0f" stroke="#9a9a9a" stroke-width="3"/><circle cx="580" cy="120" r="6" fill="#0f0f0f" stroke="${ACCENT}" stroke-width="3"/><text x="60" y="318" font-family="Inter,Helvetica,Arial" font-size="12" fill="#7a7a7a">Départ</text><text x="60" y="338" font-family="Inter,Helvetica,Arial" font-size="17" font-weight="700" fill="#ededed">${esc(depart)}</text><text x="580" y="86" text-anchor="end" font-family="Inter,Helvetica,Arial" font-size="12" fill="#7a7a7a">Aujourd'hui</text><text x="580" y="108" text-anchor="end" font-family="Inter,Helvetica,Arial" font-size="20" font-weight="700" fill="${ACCENT}">${esc(arrivee)}</text></svg>`);
  // Une personne qui a ses propres témoignages réels (contact.temoignages) les affiche ; une personne qui a déjà ses vraies captures (contact.resultats)
  // n'affiche plus les cartes d'exemple : la section disparaît tant qu'elle n'a pas de vrais témoignages vidéo.
  // Source des témoignages : contact.temoignagesUrl (liste JSON validée par l'IB, servie par l'appli d'Arthur) sinon contact.temoignages sinon C.temoignages
  const temoinsConfig = contact.temoignages || C.temoignages || [];   // les cartes d'exemple restent affichées (avec leur pastille) tant que la personne n'a pas ses propres témoignages
  const depuisJson = (j) => (Array.isArray(j) ? j : (j && j.temoignages) || [])
    .filter((t) => t && t.valide !== false && t.accord !== false && (t.fichier || t.audio || t.texte))
    .slice(0, Number(contact.temoignagesMax || C.temoignagesMax || 6))
    .map((t) => ({ prenom: t.prenom || "", nom: t.nom || "", sous: t.sous || "Membre Unlock", texte: t.texte || "", fichier: t.fichier || "", audio: t.audio || "", poster: t.poster || "", photo: t.photo || "" }));
  const rendreTemoignages = (temoins) => {
  if (!temoins.length) $("temoignages").remove();
  else {
    $("temoignagesTitre").textContent = C.temoignagesTitre || "Ce que disent les membres.";
    $("temoignagesSous").textContent = C.temoignagesSous || "";
    const note = $("temoignagesNote");
    if (!APERCU && !contact.resultats && temoins.some((t) => t.fictif) && C.temoignagesNote) note.textContent = C.temoignagesNote; else note.remove();
    // Ticker : phrases courtes qui défilent
    const tk = C.ticker || [];
    if (tk.length) { const l = tk.map((t) => `<span class="titem"><span class="tdot"></span>${esc(t)}</span>`).join(""); $("ttrack").innerHTML = l + l; } else $("ticker").remove();
    const carte = (t, i) => {
      if (t.audio) {   // témoignage vocal : la personne, un lecteur audio sobre, une ligne au plus
        const ini = (t.prenom || "U").charAt(0).toUpperCase();
        return `<article class="tcard treel tvocal" data-i="${i}">
        <div class="tqui"><div class="tavatar">${t.photo ? `<img src="${esc(t.photo)}" alt="">` : esc(ini)}</div><div><div class="tnom">${esc(t.prenom || "Membre Unlock")}${t.nom ? " " + esc(t.nom) : ""}</div><div class="thandle">${esc(t.sous || "Membre Unlock")}</div></div></div>
        <audio class="taudio" controls preload="none" src="${esc(t.audio)}"></audio>
        ${t.texte ? `<p class="ttexte">${esc(t.texte)}</p>` : ""}
      </article>`;
      }
      if (!t.fichier && !t.capture && !t.depart && t.texte) {   // témoignage écrit : la personne et son texte, rien d'autre
        const ini = (t.prenom || "U").charAt(0).toUpperCase();
        return `<article class="tcard treel tecrit" data-i="${i}">
        <div class="tqui"><div class="tavatar">${t.photo ? `<img src="${esc(t.photo)}" alt="">` : esc(ini)}</div><div><div class="tnom">${esc(t.prenom || "Membre Unlock")}${t.nom ? " " + esc(t.nom) : ""}</div><div class="thandle">${esc(t.sous || "Membre Unlock")}</div></div></div>
        <p class="ttexte tlong">${esc(t.texte)}</p>
      </article>`;
      }
      if (t.fichier) {   // témoignage vidéo réel (fichier mp4 hébergé avec le site) : la personne, la vidéo verticale en aperçu, une ligne au plus, aucun chiffre
        const ini = (t.prenom || "U").charAt(0).toUpperCase();
        return `<article class="tcard treel" data-i="${i}">
        <div class="tqui"><div class="tavatar">${t.photo ? `<img src="${esc(t.photo)}" alt="">` : esc(ini)}</div><div><div class="tnom">${esc(t.prenom || "Membre Unlock")}${t.nom ? " " + esc(t.nom) : ""}</div><div class="thandle">${esc(t.sous || "Membre Unlock")}</div></div></div>
        <button class="tmedia tvideo" data-video="${esc(t.fichier)}" aria-label="Voir le témoignage"><video src="${esc(t.fichier)}#t=1"${t.poster ? ` poster="${esc(t.poster)}"` : ""} muted playsinline preload="metadata" tabindex="-1"></video><span class="tplay"></span><span class="tprog"><i></i></span></button>
        ${t.texte ? `<p class="ttexte">${esc(t.texte)}</p>` : ""}
      </article>`;
      }
      const cap = t.capture === "placeholder" ? captureFictive(t.depart, t.arrivee, t.duree) : t.capture;
      const ini = (t.prenom || "?").charAt(0).toUpperCase();
      return `<article class="tcard" data-i="${i}">
        <div class="tqui"><div class="tavatar">${t.photo ? `<img src="${esc(t.photo)}" alt="">` : esc(ini)}</div><div><div class="tnom">${esc(t.prenom)} ${esc(t.nom || "")}${t.fictif && !APERCU ? ` <span class="tfictif">Exemple fictif</span>` : ""}</div>${t.handle ? `<div class="thandle">@${esc(t.handle)}</div>` : ""}</div></div>
        <div class="tmetric">${esc(gainDe(t))}${t.duree ? ` <span class="ten">en ${esc(t.duree)}</span>` : ""}</div>
        <div class="tsolde">${esc(t.depart)} <span class="fleche">→</span> ${esc(t.arrivee)}${t.profil ? `<span class="tprofil"> · ${esc(t.profil)}</span>` : ""}</div>
        ${cap ? `<button class="tcapture" data-src="${esc(cap)}" aria-label="Voir la capture"><img src="${esc(cap)}" alt="Capture" loading="lazy"></button>` : ""}
        <p class="ttexte">${esc(t.texte || "")}</p>
        ${t.video ? `<button class="tvideo" data-video="${esc(t.fictif && contact.video ? contact.video : t.video)}"><span class="tplay"></span>Voir la vidéo</button>` : ""}
      </article>`;
    };
    const piste = $("track");
    piste.innerHTML = temoins.map(carte).join("");
    piste.addEventListener("click", (e) => {
      const v = e.target.closest(".tvideo");
      if (v) {
        if (v.classList.contains("tmedia")) {   // témoignage fichier : se lance dans la carte, sans fenêtre (demande de Tony du 21/09)
          const vid = v.querySelector("video");
          piste.querySelectorAll(".tmedia video").forEach((o) => { if (o !== vid && !o.paused) { o.pause(); o.closest(".tmedia").classList.remove("joue"); } });
          if (vid.paused) { vid.muted = false; if (vid.currentTime < 1.2 || vid.ended) vid.currentTime = 0; v.classList.add("joue"); vid.play().catch(() => {}); mesure("temoignage-video"); }
          else { vid.pause(); v.classList.remove("joue"); }   // un clic = lecture, un clic = pause, sans commandes natives (elles avalaient le clic)
          return;
        }
        ouvreVideo(v.dataset.video); mesure("temoignage-video"); return;
      }
      const c = e.target.closest(".tcapture"); if (c) { ouvreImage(c.dataset.src); mesure("temoignage-capture"); return; }
    });
    piste.querySelectorAll(".tmedia video").forEach((vid) => {
      const barre = vid.closest(".tmedia").querySelector(".tprog i");
      vid.addEventListener("ended", () => { vid.closest(".tmedia").classList.remove("joue"); });
      vid.addEventListener("timeupdate", () => { if (barre && vid.duration) barre.style.width = (vid.currentTime / vid.duration * 100) + "%"; });
    });
    // Carrousel en boucle façon Kéo : la carte active au centre, la précédente à gauche, la suivante à droite (même au début et à la fin), flèches, points, glissement au doigt
    const cartes = [...piste.querySelectorAll(".tcard")], n = cartes.length;
    const points = $("points");
    points.innerHTML = cartes.map((_, i) => `<button class="pt" data-i="${i}" aria-label="Témoignage ${i + 1}"></button>`).join("");
    let actif = 0;
    const place = () => {
      const w = cartes[0].offsetWidth, gap = 16, ecart = w + gap;
      let hmax = 0;
      cartes.forEach((k, i) => {
        let d = (i - actif + n) % n; if (d > n / 2) d -= n;          // -1 = à gauche, 0 = centre, 1 = à droite
        k.classList.toggle("active", d === 0);
        k.dataset.d = d;
        const visible = Math.abs(d) <= 1 || (n >= 5 && Math.abs(d) === 2);
        k.style.transform = `translateX(calc(-50% + ${d * ecart}px)) scale(${d === 0 ? 1 : 0.93})`;
        k.style.opacity = d === 0 ? 1 : (Math.abs(d) === 1 ? 0.4 : 0);
        k.style.filter = d === 0 ? "none" : "blur(1.2px)";
        k.style.pointerEvents = visible ? "auto" : "none";
        k.style.zIndex = d === 0 ? 3 : (Math.abs(d) === 1 ? 2 : 1);
        hmax = Math.max(hmax, k.offsetHeight);
      });
      piste.style.height = hmax + "px";
      points.querySelectorAll(".pt").forEach((p, i) => p.classList.toggle("on", i === actif));
    };
    const va = (i) => { actif = (i + n) % n; place(); mesure("temoignage-nav"); };
    $("flG").addEventListener("click", () => va(actif - 1));
    $("flD").addEventListener("click", () => va(actif + 1));
    points.addEventListener("click", (e) => { const p = e.target.closest(".pt"); if (p) va(Number(p.dataset.i)); });
    piste.addEventListener("click", (e) => { const k = e.target.closest(".tcard"); if (k && k.dataset.d !== "0" && !e.target.closest(".tvideo, .tcapture")) va(actif + Number(k.dataset.d)); });
    // Glissement au doigt ou à la souris
    let x0 = null;
    piste.addEventListener("pointerdown", (e) => { x0 = e.clientX; });
    piste.addEventListener("pointerup", (e) => { if (x0 == null) return; const dx = e.clientX - x0; x0 = null; if (Math.abs(dx) > 40) va(actif + (dx < 0 ? 1 : -1)); });
    piste.addEventListener("pointercancel", () => { x0 = null; });
    window.addEventListener("resize", place);
    place(); setTimeout(place, 400); setTimeout(place, 1500);
  }
  };
  if (contact.temoignagesUrl) {
    const delai = new Promise((r) => setTimeout(() => r(null), 3000));
    Promise.race([fetch(contact.temoignagesUrl, { cache: "no-store" }).then((r) => (r.ok ? r.json() : null)).catch(() => null), delai])
      .then((j) => { const l = j ? depuisJson(j) : []; rendreTemoignages(l.length ? l : temoinsConfig); });
  } else rendreTemoignages(temoinsConfig);

  // Questions : dépliables (la question se déplie), la vidéo dans chaque réponse, une ligne de texte max
  $("faq").innerHTML = (C.faq || []).map((f, i) => `<details class="reveal"${i === 0 ? " open" : ""}><summary>${esc(avecPrenom(f.q))}<span class="chev"></span></summary><div class="rep"><div class="video" id="faqVideo${i}"></div>${f.r && (C.faqTextes !== false || !((contact.faqVideos || [])[i] || f.video || C.faqVideoDefaut)) ? `<p>${esc(avecPrenom(f.r))}</p>` : ""}</div></details>`).join("");   // faqTextes: false = la vidéo seule ; le texte ne revient que si une question n'a aucune vidéo
  (C.faq || []).forEach((f, i) => {
    const el = $("faqVideo" + i), det = el && el.closest("details");
    if (!el) return;
    const id = (contact.faqVideos || [])[i] || f.video || C.faqVideoDefaut;   // contact.faqVideos = les réponses vidéo de la personne, dans l'ordre des questions
    if (!id) { el.remove(); return; }
    el.classList.add("auto");
    // Fermée : rien n'est chargé. Ouverte : lecteur automatique (la première est ouverte au chargement et démarre quand elle arrive à l'écran).
    // Chrome envoie un "toggle" au chargement pour la question déjà ouverte : dans ce cas on laisse l'observateur démarrer la vidéo quand elle arrive à l'écran.
    const arme = () => { if (!el.lance) lecteurAuto(el, id, "q" + (i + 1)); if (det.open && performance.now() - CHARGE > 1500) el.lance(); };
    det.addEventListener("toggle", () => { if (det.open) { $("faq").querySelectorAll("details[open]").forEach((o) => { if (o !== det) o.open = false; }); arme(); } else if (el.arrete) { obsAuto.unobserve(el); el.arrete(); el.lance = null; } });
    if (det.open) { if (!el.lance) lecteurAuto(el, id, "q" + (i + 1)); }
  });

  // Bloc final
  $("finalTitre").textContent = C.finalTitre || "";
  $("finalTexte").textContent = C.finalTexte || "";
  $("finalLignes").innerHTML = (C.finalLignes || []).map((l) => `<li><span class="case"></span>${esc(avecPrenom(l))}</li>`).join("");
  const cta = $("cta");
  const texteCta = avecPrenom(C.boutonTexte || "Écris-moi sur Insta"), sousCta = C.boutonSous || "";
  const rendreCta = (el) => { el.innerHTML = `<span class="ctaTexte">${esc(texteCta)}</span>${sousCta ? `<span class="ctaSous">${esc(sousCta)}</span>` : ""}`; };
  rendreCta(cta);
  cta.href = contact.lien || "#";
  cta.addEventListener("click", () => mesure("clic-cta-" + (contacts[ref] ? ref : "defaut")));
  // Boutons intermédiaires (sous les témoignages, sous « pourquoi c'est gratuit ») : même texte, même lien, comptés séparément
  document.querySelectorAll(".cta-plus").forEach((b) => { rendreCta(b); b.href = cta.href; b.addEventListener("click", () => mesure("clic-cta-" + b.dataset.pos)); });
  $("antiUrgence").textContent = C.antiUrgence || "";
  // Lien du canal Insta (preuves) à côté du bouton, dès qu'il est renseigné dans config.js
  const canalIndex = $("canalIndex");
  if (C.lienCanal && C.canalEnBas !== false) { canalIndex.href = C.lienCanal; canalIndex.textContent = C.canalTexte || "Voir le canal"; canalIndex.hidden = false; canalIndex.addEventListener("click", () => mesure("clic-canal")); }

  // Footer
  $("legal1").textContent = C.legal1 || "";
  $("legal2").textContent = C.legal2 || "";
  if (C.editeur) $("editeur").textContent = "Éditeur : " + C.editeur; else $("editeur").remove();   // vide = la ligne disparaît, sans laisser d'espace
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
  const setter = (new URLSearchParams(location.search).get("s") || "").toLowerCase().replace(/[^a-z0-9_-]/g, "");   // ?s=prenom : le setter qui a envoyé la page (mesure seulement)
  if (C.goatcounter) mesure("vue-" + (contacts[ref] ? ref : "defaut") + (setter ? "-s-" + setter : ""));
})();
