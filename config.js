// ============================================================
//  RÉGLAGES DE LA PAGE CLUB : c'est le SEUL fichier à modifier.
//  VERSION LANCEMENT (15/09) : uniquement ce qui existe aujourd'hui. La version complète
//  (appli, chiffres, témoignages, vidéos par question) est gardée dans config-template.js.
//  Tout ce qui est entre guillemets peut être changé librement.
//  Les vidéos sont des identifiants YouTube (la partie après "v=").
// ============================================================
window.CLUB = {

  // --- Identité ---
  nom: "Unlock",                   // nom annoncé le 14/09 (logo et DA Unlock à venir)
  logo: "",                        // ex: "logo.png" (laisser vide = le nom s'affiche en texte)
  accent: "#6E9BFF",               // couleur d'accent (bleu ; change-la librement)
  // theme: { bg: "#100c0e", surface: "#181214", surface2: "#1e1719", line: "#2a2024", line2: "#3a2c31" },   // exemple de fond chaud (Mila) ; sans cette ligne = noir neutre
  titre: "Apprends les marchés financiers,",
  titreAccent: "avec des gens autour de toi.",   // la partie du titre en couleur
  sousTitre: "Gratuit, sans formation à acheter. Tout est expliqué dans la vidéo.",

  // --- Lien groupé (liens.html) et page témoignages (preuves.html) ---
  lienCanal: "",                   // lien du canal de diffusion Insta Unlock (les preuves) : à coller dès que tu l'as
  hubTitre: "Par où tu veux commencer ?",
  hubPortes: [   // les portes du lien groupé ; {r} = le prénom du lien. mlm: true = renvoie vers le lien MLM du contact (ou son Insta si vide)
    { titre: "L'écosystème gratuit", texte: "Regarde la vidéo (3 min), puis écris-moi.", lien: "index.html" },
    { titre: "Les preuves", texte: "Ce que disent les membres, en captures.", lien: "preuves.html" },
    { titre: "Développer un business avec moi", texte: "Si tu veux aller plus loin que le trading.", mlm: true },
  ],
  preuvesTitre: "Ce que disent les membres.",
  preuvesSous: "Captures prises dans le canal, avec leur accord.",
  preuvesNote: "Exemples fictifs pour le rendu, à remplacer par de vraies captures.",
  preuves: ["placeholder", "placeholder", "placeholder", "placeholder", "placeholder", "placeholder"],   // chemins d'images (ex: "preuves/1.jpg"), format portrait

  // --- La page parle à la première personne : c'est la personne qui l'envoie qui parle ("écris-moi").
  //     Le lien ?r=prenom choisit vers quel Instagram le bouton renvoie (et compte les clics par personne).
  //     Mets uniquement des liens publics (Instagram, page, formulaire). Jamais de numéro de téléphone.
  badge: "Accès gratuit",
  titreVideo: "Regarde cette vidéo avant de m'écrire.",
  identite: true,                  // photo + nom + abonnés de la personne qui envoie, tout en haut (façon Kéo)
  contactParDefaut: "tony",
  contacts: {
    mila:  { prenom: "Mila",  nom: "Mila Winsback", handle: "mila.winsback", abonnes: "40K", photo: "mila.jpg",  photoGrande: "mila-grande.jpg", lien: "https://ig.me/m/mila.winsback" },
    sacha: { prenom: "Sacha", nom: "Sacha Amoyel",  handle: "sachaamoyel",   abonnes: "17K", photo: "sacha.jpg", lien: "https://ig.me/m/sachaamoyel" },
    tony:  { prenom: "Tony",  nom: "Tony Rande",    handle: "",              abonnes: "",    photo: "",          lien: "https://ig.me/m/tonyconsulting.fr", mlm: "" },   // handle, abonnés, photo et lien MLM à compléter
  },

  // --- Étape 1 : la vidéo principale (identifiant YouTube OU adresse d'un fichier .mp4 hébergé) ---
  video: {
    youtube: "D-b4-2rdsoU",        // VSL de Sacha : la même vidéo pour tous les IB (identifiant YouTube ou adresse .mp4)
    poster: "",
    duree: "3 min",
  },

  // --- Étape 2 : ce que tu trouves dans le club (3 à 4 blocs) ---
  acces: [   // uniquement ce qui existe aujourd'hui ; l'appli (canaux, lives, académie, boutique) revient quand elle est en ligne (voir config-template.js)
    { titre: "Les canaux d'analyses", texte: "Les analyses des traders du club, chaque jour de marché." },
    { titre: "L'accompagnement", texte: "Je t'installe, je réponds à tes questions et je te dis par quoi commencer." },
    { titre: "La communauté", texte: "Un canal privé, des membres comme toi, de l'entraide au quotidien." },
  ],

  // --- Étape 3 : comment ça se passe (le vrai déroulé, dans l'ordre) ---
  deroule: [
    { titre: "Tu regardes la vidéo", texte: "Tout est dedans.", temps: "3 min" },
    { titre: "Tu m'écris sur Insta", texte: "Toutes tes questions, réponse franche.", temps: "2 min" },
    { titre: "On t'active ensemble", texte: "Je t'installe dans les canaux, avec toi.", temps: "5 min" },
  ],

  // --- Le club en chiffres (3 cartes). Formes possibles :
  //   { texte: "Gratuit", label: "..." }                          → un mot en grand
  //   { valeur: 200, prefixe: "+", suffixe: "", label: "membres" } → compteur qui monte de 0 (null = "..." à remplir)
  //   ajouter stores: true à une carte → badges App Store et Google Play sous le libellé (liens ci-dessous)
  // Valeurs d'exemple pour le template : remplacer par des chiffres RÉELS et datés.
  chiffres: [],   // masqué au lancement : aucun chiffre réel validé. Exemples dans config-template.js
  appStore: "",      // lien App Store quand l'appli est publiée (vide = badge sans lien)
  googlePlay: "",    // lien Google Play

  // --- Témoignages façon Hans : cartes qui défilent, une vidéo par membre (call, partage d'écran...) ---
  // ATTENTION : les 6 cartes ci-dessous sont des EXEMPLES FICTIFS pour visualiser le rendu.
  // À remplacer par de vrais membres, avec leur accord écrit. Tant que "fictif" est à true,
  // la page affiche "Exemple fictif" sur chaque carte et une note sous le titre.
  temoignagesTitre: "Ce que disent les membres.",
  temoignagesSous: "Clique pour écouter chaque membre.",
  temoignagesNote: "Exemples fictifs pour le rendu, à remplacer par de vrais membres avec leur accord.",
  // Phrases courtes qui défilent au-dessus des cartes (une par membre, sur l'expérience, jamais de chiffres). Liste vide = rien.
  ticker: [],   // phrases courtes qui défilent (retiré pour l'instant, à revoir plus tard)
  temoignages: [],   // masqué au lancement : uniquement de vrais membres avec accord écrit. Exemples fictifs dans config-template.js

  // --- Pourquoi c'est gratuit : section avec le visage de la personne qui envoie (façon Kéo « pourquoi je donne tout ça ») ---
  gratuitTitre: "Pourquoi c'est gratuit.",
  // photo de la section = photoGrande du contact du lien, sinon sa photo de profil, sinon pas de photo
  gratuitTextes: [
    "Tu paies exactement les mêmes frais que si tu ouvrais ton compte en direct chez le broker partenaire. C'est lui qui reverse une partie de ses frais au club, sur ton volume d'activité, que tu gagnes ou que tu perdes.",
    "Tu ne me verses rien. Ton compte est à ton nom, je ne peux ni y déposer ni en retirer.",
    "Ce que j'y gagne : un membre bien installé, qui comprend ce qu'il fait, reste. J'ai donc intérêt à prendre le temps avec toi.",
  ],

  // --- Questions : dépliables, la vidéo dans chaque question, une ligne de texte maximum (peut être vide "") ---
  faqVideoDefaut: "",   // au lancement : pas de vidéo dans les questions (réponses écrites). Mettre l'identifiant ou l'adresse .mp4 quand les vidéos sont tournées
  faq: [
    { q: "Où est le piège ?", r: "Il n'y en a pas : tu paies les mêmes frais qu'en direct, c'est le broker partenaire qui reverse une part au club.", video: "" },
    { q: "Que se passe-t-il une fois que j'ai écrit ?", r: "On échange, je réponds à tes questions. Si tu veux continuer, je t'explique la condition d'accès et je t'installe.", video: "" },
    { q: "Quelqu'un m'accompagne vraiment ?", r: "Oui, moi. Tu as une personne à qui écrire quand quelque chose n'est pas clair.", video: "" },
    { q: "Comment je sais que ce n'est pas une arnaque ?", r: "Tu ne me donnes pas d'argent. Ton compte est à ton nom, chez le broker, je ne peux ni y déposer ni en retirer.", video: "" },
    { q: "Je peux perdre de l'argent ?", r: "Oui. Le trading comporte un risque de perte en capital. N'engage que ce que tu peux te permettre de perdre.", video: "" },
    { q: "Je débute, je vais suivre ?", r: "Oui, si tu suis l'ordre : les bases d'abord, les canaux ensuite. Je te dis par quoi commencer.", video: "" },
  ],

  // --- Bloc final ---
  finalTitre: "On se voit dans le club.",
  finalTexte: "Il ne te reste plus qu'à :",
  finalLignes: [
    "Regarder la vidéo jusqu'au bout",
    "Écrire à ton contact avec tes questions",
    "N'engager que ce que tu peux te permettre de perdre",
  ],
  boutonTexte: "Écris-moi sur Insta",
  antiUrgence: "Pas de compte à rebours, pas d'offre qui expire. Cette page sera encore là demain.",

  // --- Mentions légales (obligatoire en France) ---
  editeur: "[ÉDITEUR À COMPLÉTER : nom, statut, adresse, email]",
  legal1: "Le club n'est pas un conseiller financier et ne fournit aucune recommandation d'investissement personnalisée. Il est rémunéré par le broker partenaire au titre d'apporteur d'affaires, sur le volume d'activité, et n'exécute aucune opération pour ton compte.",
  legal2: "Le trading comporte un risque de perte en capital, notamment avec l'effet de levier. Les performances passées ne garantissent pas les performances futures. Les témoignages sont des expériences individuelles et ne constituent pas une promesse de résultat. Les informations de cette page sont fournies à titre informatif et éducatif uniquement. N'investis que des sommes que tu peux te permettre de perdre.",

  // --- Mesure (facultatif) : adresse GoatCounter, ex: "https://tony.goatcounter.com/count". Vide = rien. ---
  goatcounter: "",
};
