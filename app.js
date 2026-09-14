// Keys Club — réplique statique. Menu, apparition au scroll, témoignages défilants, vidéos.
const TEMOIGNAGES = [
  ["Thomas M.", "@thomas.m", "0 → 1er trade", "Je pensais que le plus compliqué serait de comprendre le trading. En réalité, c'était juste de savoir par où commencer. Keys Club m'a fait gagner énormément de temps là-dessus."],
  ["Yassine B.", "@yassine.b", "Perdu → rentable", "J'ai posé une question que je pensais vraiment débile. On m'a répondu normalement, sans me prendre de haut. C'est con, mais c'est exactement ce qui m'a donné confiance pour continuer."],
  ["Lucas D.", "@lucas.d", "0 → confiant", "Le truc qui m'a surpris ? Je m'attendais à recevoir un lien et débrouille-toi. Au final, quelqu'un est resté avec moi jusqu'à ce que tout soit correctement mis en place."],
  ["Adam R.", "@adam.r", "Perdu → stable", "J'étais venu uniquement pour les signaux. Je suis finalement resté pour la simplicité du système. Tout est beaucoup plus clair quand quelqu'un t'explique directement quoi faire."],
  ["Mehdi A.", "@mehdi.a", "15 groupes → 1", "Avant, j'avais Telegram ouvert avec 15 groupes et je ne savais jamais lequel regarder. Maintenant je sais exactement où aller. Ça paraît rien, mais ça change complètement l'expérience."],
  ["Antoine L.", "@antoine.l", "Perdu → clair", "J'ai passé plus de temps à chercher comment commencer qu'à réellement commencer. Avec Keys Club, cette partie a littéralement disparu."],
  ["Sarah B.", "@sarah.b", "0 → décidée", "Ce que j'ai apprécié dès le départ : personne ne m'a vendu du rêve. On m'a expliqué comment ça fonctionnait, les risques aussi, puis on m'a laissé décider."],
  ["Yanis K.", "@yanis.k", "Perdu → guidé", "Je pensais devoir comprendre Vantage, MT5, Telegram et les signaux tout seul. En fait, j'ai juste posé mes questions et on m'a expliqué au fur et à mesure."],
  ["Hugo P.", "@hugo.p", "Chaos → simple", "J'avais déjà essayé de suivre des signaux auparavant. Le problème n'était pas forcément les signaux, c'était surtout le bordel autour. Ici, tout est beaucoup plus simple."],
  ["Karim N.", "@karim.n", "0 → lancé", "La première chose que j'ai demandée c'est : \"Mais concrètement, je dois faire quoi ?\" On m'a répondu en quelques messages. Pas de discours interminable."],
  ["Nathan S.", "@nathan.s", "Méfiant → membre", "Je suis assez méfiant de base avec tout ce qui touche au trading. J'ai justement apprécié qu'on puisse poser toutes les questions avant de faire quoi que ce soit."],
  ["Julien R.", "@julien.r", "Soirée → 5 min", "Je pensais que j'allais passer ma soirée à configurer mon compte. En réalité, quelques explications plus tard, c'était réglé."],
  ["Rayan E.", "@rayan.e", "30 min → 2 min", "Le meilleur truc avec Keys Club, c'est probablement le moment où tu réalises que tu n'as plus besoin de chercher pendant 30 minutes la réponse à chaque petite question."],
  ["Maxime C.", "@maxime.c", "Méfiant → clair", "Je suis arrivé avec énormément de questions et probablement encore plus de méfiance. Je suis resté parce qu'on m'a répondu clairement aux deux."],
  ["Imran H.", "@imran.h", "0 → accompagné", "J'ai surtout aimé le côté \"viens, on te montre\". Pas besoin de faire semblant de déjà tout connaître pour demander de l'aide."],
  ["Alexandre V.", "@alexandre.v", "Bloqué → aidé", "Honnêtement, ce n'est pas l'accès aux signaux qui m'a le plus marqué. C'est le fait que quand quelque chose n'est pas clair, j'ai quelqu'un à qui demander immédiatement."],
  ["Sofiane M.", "@sofiane.m", "50 tutos → 1", "J'étais persuadé que j'allais devoir regarder 50 tutos YouTube avant de comprendre comment tout fonctionnait. Quelques messages avec Keys Club plus tard, j'avais compris l'essentiel."],
  ["Théo G.", "@theo.g", "Rêve → réel", "Le plus rassurant, c'est qu'on ne m'a jamais fait croire que suivre un signal = gagner. On m'a expliqué le fonctionnement, puis à moi de prendre mes décisions."],
  ["Amine T.", "@amine.t", "Compliqué → simple", "Je voulais juste savoir si c'était compliqué de commencer. La réponse a été : \"Non, je te montre.\" Et effectivement, c'était beaucoup moins compliqué que je pensais."],
  ["Louis F.", "@louis.f", "Seul → guidé", "Je ne vais pas dire que Keys Club m'a appris à trader, ce serait faux. Par contre, ça m'a évité de passer des heures à essayer de comprendre seul comment mettre tout en place."],
  ["Samir A.", "@samir.a", "Signaux → aide", "Au début je pensais que Keys Club était juste un accès aux signaux. J'ai rapidement compris que la vraie valeur pour moi, c'était surtout d'avoir quelqu'un pour répondre quand j'étais bloqué."],
  ["Emma L.", "@emma.l", "Doute → confiance", "Ce qui m'a convaincue ? J'ai posé toutes les questions que j'avais avant de m'inscrire. On m'a répondu à chacune. Je n'ai jamais eu cette sensation de devoir acheter d'abord et comprendre après."],
  ["Noah K.", "@noah.k", "Perdu → connecté", "J'avais déjà Vantage, mais je ne savais même pas comment accéder correctement aux canaux. Keys Club m'a simplement montré la marche à suivre et tout est devenu beaucoup plus simple."],
  ["Nicolas B.", "@nicolas.b", "Lien → guidé", "Il y a une différence entre recevoir un lien Telegram et avoir quelqu'un qui t'explique réellement où aller, quoi regarder et à qui poser tes questions. C'est cette différence que j'ai trouvée ici."],
  ["Walid Z.", "@walid.z", "Débutant → lancé", "Je pensais que j'allais devoir connaître le trading avant de rejoindre. En fait, j'avais surtout besoin de quelqu'un pour m'expliquer le fonctionnement. Le reste est venu naturellement."],
  ["Victor P.", "@victor.p", "Envie → action", "Si je devais résumer Keys Club en une phrase : ils ont supprimé toute la friction entre \"j'ai envie d'essayer\" et \"ok, maintenant je sais où aller\"."],
];

const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// Témoignages : liste dupliquée pour un défilement sans coupure
const track = document.getElementById("track");
if (track) {
  const carte = ([nom, at, delta, texte]) => `<div class="card">
    <div class="who"><div class="ini">${esc(nom.charAt(0))}</div><div><div class="nom">${esc(nom)}</div><div class="at">${esc(at)}</div></div></div>
    <div class="delta">${esc(delta)}</div><p>${esc(texte)}</p></div>`;
  track.innerHTML = TEMOIGNAGES.map(carte).join("") + TEMOIGNAGES.map(carte).join("");
}

// Menu
const menu = document.getElementById("menu");
const burger = document.getElementById("burger");
if (burger && menu) {
  burger.onclick = () => menu.classList.add("on");
  document.getElementById("menuClose").onclick = () => menu.classList.remove("on");
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => menu.classList.remove("on")));
}

// Logo dans la barre une fois le hero passé
const topbar = document.getElementById("topbar");
const majTop = () => { if (topbar) topbar.classList.toggle("scrolled", window.scrollY > 260); };
window.addEventListener("scroll", majTop, { passive: true });
majTop();

// Apparition au scroll
const obs = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));

// Vidéos : le lecteur YouTube ne se charge qu'au clic
document.querySelectorAll(".video[data-yt]").forEach((v) => {
  v.addEventListener("click", () => {
    if (v.querySelector("iframe")) return;
    const id = v.dataset.yt;
    v.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0&modestbranding=1" title="Vidéo" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
  });
});
