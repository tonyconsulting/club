// ============================================================
//  RÉGLAGES DE LA PAGE CLUB : c'est le SEUL fichier à modifier.
//  Tout ce qui est entre guillemets peut être changé librement.
//  Les vidéos sont des identifiants YouTube (la partie après "v=").
// ============================================================
window.CLUB = {

  // --- Identité ---
  nom: "Unlock",                   // logo PNG à mettre dans "logo" dès reçu
  logo: "logo.jpg",                // logo Unlock (fond noir fondu dans la barre) ; vide = le nom en texte
  accent: "#6E9BFF",               // couleur d'accent (bleu ; change-la librement)
  // theme: { bg: "#100c0e", surface: "#181214", surface2: "#1e1719", line: "#2a2024", line2: "#3a2c31" },   // exemple de fond chaud ; sans cette ligne = noir neutre
  titre: "Apprends les marchés financiers,",
  titreAccent: "avec des gens autour de toi.",   // la partie du titre en couleur
  sousTitre: "",   // retiré le 19/09 à la demande de Tony (avant : « Gratuit, sans formation à acheter. Tout est expliqué dans la vidéo. ») ; vide = la ligne disparaît

  // --- Lien groupé (liens.html) et page témoignages (preuves.html) ---
  lienCanal: "https://www.instagram.com/channel/6xKu9QoZi1m4MzRU/",   // lien DIRECT vers le canal (même raison : pas de Taap.it, taap.it/IYSHixf testé le 19/09)   // canal de diffusion Insta « KEYSCLUB x UNLOCK » → bouton « Voir le canal » (page, carte communauté, preuves.html)
  canalTexte: "Voir le canal",
  canalEnBas: false,               // bouton « Voir le canal » du bloc final : retiré le 19/09 au soir à la demande de Tony (true pour le remettre)
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
    mila:  { prenom: "Mila",  nom: "Mila Winsback", handle: "mila.winsback", abonnes: "40K", photo: "mila.jpg?v=81", photoGrande: "mila-grande.jpg?v=80", lien: "https://ig.me/m/mila.winsback",   // page créée le 21/09 : copie exacte de celle de Maxim (demande Tony) ; photo HD reçue le 21/09 (coucher de soleil), avatar recadré sur le visage
             video: "Hp9xWN8UIvk",                                   // sa VSL Unlock « Comprendre Unlock en 3 minutes » (reçue le 21/09 ; fausse alerte de blocage le 21/09 : ne passait pas en test local, passe sur le vrai domaine)
             faqVideos: ["KCCFGn1kKi4", "N1Nln-q8bsc", "smqzEfBGnuQ", "0rt7-G3A-Jo"],   // piège, pour qui, peu de temps, compétences (reçues le 21/09, titres vérifiés)
             accent: "#FF6FB0", accent2: "#FFB067",                 // DA rose (demande Tony 21/09) + touche orange coucher de soleil de sa photo, à tester (Tony 21/09) ; rose clair d'avant : #FFC2DC
             theme: { bg: "#120a10", surface: "#1b1018", surface2: "#23141d", line: "#3a1f2f", line2: "#4f2a40" },
             temoignages: [   // mêmes membres que sur la page de Maxim, Mila remplacée par Maxim (vidéo reçue le 21/09)
               { prenom: "Maxim", sous: "Membre Unlock", fichier: "temoignages/mila-t1.mp4?v=75" },
               { prenom: "Ilhan", sous: "Membre Unlock", fichier: "temoignages/maxim-t2.mp4?v=75" },
               { prenom: "André", sous: "Membre Unlock", fichier: "temoignages/maxim-t3.mp4?v=75" },
             ],
             resultats: ["resultats/maxim-1.jpg?v=66", "resultats/maxim-2.jpg?v=66", "resultats/mila-3.jpg?v=85", "resultats/mila-4.jpg?v=85", "resultats/maxim-5.jpg?v=65", "resultats/maxim-6.jpg?v=65", "resultats/maxim-7.jpg?v=65", "resultats/maxim-8.jpg?v=65", "resultats/maxim-9.jpg?v=68", "resultats/maxim-10.jpg?v=68", "placeholder", "placeholder"],   // captures de Maxim, avec les versions pour Mila d'Antoine (mila-3, sans « merci Maxim ») et d'Amin (mila-4), reçues le 21/09 (cite Maxim ; retirée le 21/09 sur demande de Tony, une version sans « merci Maxim » est attendue)
             resultatsTitre: "Ce que les membres m'écrivent.",
             resultatsSous: "Touche une capture pour l'agrandir." },
    sacha: { prenom: "Sacha", nom: "Sacha Amoyel",  handle: "sachaamoyel",   abonnes: "17K", photo: "sacha.jpg", lien: "https://ig.me/m/sachaamoyel" },
    maxim: { prenom: "Maxim", nom: "Maxim Humbert", handle: "maxim.hrtt", abonnes: "14K", photo: "maxim.jpg", photoGrande: "maxim-grande.jpg", lien: "https://ig.me/m/maxim.hrtt",   // lien DIRECT : sur iPhone seul un vrai tap sur un lien Instagram ouvre l'appli. Testé le 19/09 : Taap.it (taap.it/wt6i1YC) redirige en JavaScript et fait atterrir sur la connexion web d'Instagram, à ne pas utiliser ici
             video: "KorX3tYtFUQ",                                   // sa VSL (YouTube)
             faqVideos: ["HVuh2EdflCE", "EuAOUfofyeU", "FtCrOmHyBio", "C4cuZzo4k0o"],   // ses 4 réponses vidéo, dans l'ordre des questions : piège, pour qui, peu de temps, compétences
             accent: "#B794F6", accent2: "#F6C453",                  // violet et jaune, les tons de sa vidéo
             theme: { bg: "#0c0914", surface: "#151021", surface2: "#1b152b", line: "#2b2142", line2: "#3c2f5c" },
             resultats: ["resultats/maxim-1.jpg?v=66", "resultats/maxim-2.jpg?v=66", "resultats/maxim-3.jpg?v=66", "resultats/maxim-4.jpg?v=66", "resultats/maxim-5.jpg?v=65", "resultats/maxim-6.jpg?v=65", "resultats/maxim-7.jpg?v=65", "resultats/maxim-8.jpg?v=65", "resultats/maxim-9.jpg?v=68", "resultats/maxim-10.jpg?v=68", "placeholder", "placeholder"],   // captures ENTIÈRES de ses membres, prénom et photo visibles (demande de Tony le 19/09 : accord de chaque membre à avoir), puis les cases à remplir
             // temoignagesUrl: "https://…/api/temoignages?ib=maxim",   // à brancher quand l'appli d'Arthur sert la liste validée (voir spec-temoignages-arthur.md) ; en attendant la liste ci-dessous
             temoignages: [   // témoignages vidéo réels reçus le 21/09 (fichiers mp4 dans temoignages/), prénoms à compléter par Tony
               { prenom: "Mila", sous: "Membre Unlock", fichier: "temoignages/maxim-t1.mp4?v=74" },
               { prenom: "Ilhan", sous: "Membre Unlock", fichier: "temoignages/maxim-t2.mp4?v=74" },
               { prenom: "André", sous: "Membre Unlock", fichier: "temoignages/maxim-t3.mp4?v=74" },
             ],
             resultatsTitre: "Ce que les membres m'écrivent.",
             resultatsSous: "Touche une capture pour l'agrandir." },
    loukas: { prenom: "Loukas", nom: "Loukas", handle: "", abonnes: "", photo: "", lien: "",   // page créée le 21/09 (demande Tony) : pseudo, photo HD, abonnés, VSL, 4 FAQ et couleurs à venir ; DA par défaut en attendant
             temoignages: [
               { prenom: "Maxim", sous: "Membre Unlock", fichier: "temoignages/mila-t1.mp4?v=75" },
               { prenom: "Ilhan", sous: "Membre Unlock", fichier: "temoignages/maxim-t2.mp4?v=75" },
               { prenom: "André", sous: "Membre Unlock", fichier: "temoignages/maxim-t3.mp4?v=75" },
             ],
             resultats: ["resultats/maxim-1.jpg?v=66", "resultats/maxim-2.jpg?v=66", "resultats/mila-3.jpg?v=85", "resultats/mila-4.jpg?v=85", "resultats/maxim-5.jpg?v=65", "resultats/maxim-6.jpg?v=65", "resultats/maxim-7.jpg?v=65", "resultats/maxim-8.jpg?v=65", "resultats/maxim-9.jpg?v=68", "resultats/maxim-10.jpg?v=68", "placeholder", "placeholder"],   // mêmes captures que la page de Mila
             resultatsTitre: "Ce que les membres m'écrivent.",
             resultatsSous: "Touche une capture pour l'agrandir." },
    pierre: { prenom: "Pierre", nom: "Pierre Barrillon", handle: "pierre.barrillon_", abonnes: "", certifie: true, photo: "", lien: "https://ig.me/m/pierre.barrillon_",   // pseudo reçu le 21/09 ; Tony : pas le nombre d'abonnés, juste la certification ; photo HD à venir
             video: "PxfY4M2rx2s",                                   // sa VSL « Comment Unlock m'a aidé à passer à l'action » (reçue le 21/09)
             faqVideos: ["rrhvDpYgQQM", "OGuipHvr3v0", "ZrmivCzIViA", "BUxhpKHRb9U"],   // piège, pour qui, peu de temps, compétences (titres vérifiés)
             accent: "#34D399", accent2: "#C8F560",                 // DA verte (Tony 21/09 : « jaune ou vert peut-être » ; vert choisi, le jaune est déjà chez Maxim) : vert émeraude + vert citron en dégradé
             theme: { bg: "#070d0a", surface: "#0e1712", surface2: "#132019", line: "#1e3328", line2: "#2a4a38" },
             temoignages: [
               { prenom: "Maxim", sous: "Membre Unlock", fichier: "temoignages/mila-t1.mp4?v=75" },
               { prenom: "Mila", sous: "Membre Unlock", fichier: "temoignages/maxim-t1.mp4?v=75" },
               { prenom: "Ilhan", sous: "Membre Unlock", fichier: "temoignages/maxim-t2.mp4?v=75" },
               { prenom: "André", sous: "Membre Unlock", fichier: "temoignages/maxim-t3.mp4?v=75" },
             ],
             resultats: ["resultats/maxim-1.jpg?v=66", "resultats/maxim-2.jpg?v=66", "resultats/mila-3.jpg?v=85", "resultats/mila-4.jpg?v=85", "resultats/maxim-5.jpg?v=65", "resultats/maxim-6.jpg?v=65", "resultats/maxim-7.jpg?v=65", "resultats/maxim-8.jpg?v=65", "resultats/maxim-9.jpg?v=68", "resultats/maxim-10.jpg?v=68", "placeholder", "placeholder"],   // mêmes captures que la page de Mila
             resultatsTitre: "Ce que les membres m'écrivent.",
             resultatsSous: "Touche une capture pour l'agrandir." },
    ilhan: { prenom: "Ilhan", nom: "Ilhan", handle: "", abonnes: "", photo: "", lien: "",   // page créée le 21/09 (demande Tony) : pseudo, photo HD, abonnés, 4 FAQ et couleurs à venir ; DA par défaut en attendant
             video: "hTTwMaFBteM",                                   // sa VSL (reçue le 21/09)
             accent: "#FF3B3B", accent2: "#FF8A80",                 // DA rouge et noir (demande Tony 21/09) : rouge vif + rouge clair en dégradé
             theme: { bg: "#0b0708", surface: "#150c0d", surface2: "#1d1012", line: "#33191c", line2: "#4a2226" },
             temoignages: [
               { prenom: "Maxim", sous: "Membre Unlock", fichier: "temoignages/mila-t1.mp4?v=75" },
               { prenom: "Mila", sous: "Membre Unlock", fichier: "temoignages/maxim-t1.mp4?v=75" },
               { prenom: "André", sous: "Membre Unlock", fichier: "temoignages/maxim-t3.mp4?v=75" },
             ],
             resultats: ["resultats/maxim-1.jpg?v=66", "resultats/maxim-2.jpg?v=66", "resultats/mila-3.jpg?v=85", "resultats/mila-4.jpg?v=85", "resultats/maxim-5.jpg?v=65", "resultats/maxim-6.jpg?v=65", "resultats/maxim-7.jpg?v=65", "resultats/maxim-8.jpg?v=65", "resultats/maxim-9.jpg?v=68", "resultats/maxim-10.jpg?v=68", "placeholder", "placeholder"],   // mêmes captures que la page de Mila
             resultatsTitre: "Ce que les membres m'écrivent.",
             resultatsSous: "Touche une capture pour l'agrandir." },
    tony:  { prenom: "Tony",  nom: "Tony Rande",    handle: "",              abonnes: "",    photo: "",          lien: "https://ig.me/m/tonyconsulting.fr", mlm: "" },   // handle, abonnés, photo et lien MLM à compléter
  },

  // --- Étape 1 : la vidéo principale (identifiant YouTube OU adresse d'un fichier .mp4 hébergé) ---
  video: {
    youtube: "D-b4-2rdsoU",        // VSL de Sacha : la même vidéo pour tous les IB (identifiant YouTube ou adresse .mp4)
    poster: "",
    duree: "3 min",
  },

  // --- (section « trois accès » retirée de la page le 15/09 : pas d'appli tout de suite, lien canal capricieux sur ordinateur ; la config reste pour plus tard) ---
  //   stores: true = badges App Store / Google Play ; canal: true = renvoie vers lienCanal ; lien: "preuves.html" ou une adresse https (ex : compte Insta témoignages)
  accesTitre: "Trois accès, tout est là.",
  acces: [
    { titre: "L'application", texte: "Canaux d'analyses, lives, académie, boutique.", stores: true,
      nouveau: true,                                                  // pastille « Nouveau » sur la carte (à retirer quand ce n'est plus nouveau)
      statut: "Sortie iOS le 22 septembre",                           // état réel et daté ; vide = rien
      preinscription: "Écris-moi « APP » et je te préviens le jour J." },   // la pré-inscription passe par la conversation, pas par un formulaire
    { titre: "Le canal Insta", texte: "Les nouvelles du club et les preuves, en direct.", canal: true },
    { titre: "Les témoignages", texte: "Ce que disent les membres, en captures et en vidéo.", lien: "preuves.html" },   // plus tard : le compte Insta témoignages ou les avis de l'appli
  ],

  // --- Étape 3 : comment ça se passe (le vrai déroulé, dans l'ordre) ---
  deroule: [
    { titre: "Tu regardes la vidéo", texte: "Tout est dedans.", temps: "3 min" },
    { titre: "Tu m'écris sur Insta", texte: "Toutes tes questions, réponse franche.", temps: "2 min" },
    { titre: "On te lance ensemble", texte: "On t'installe dans l'écosystème.", temps: "5 min" },
  ],

  // --- Le club en chiffres (3 cartes). Formes possibles :
  //   { texte: "Gratuit", label: "..." }                          → un mot en grand
  //   { valeur: 200, prefixe: "+", suffixe: "", label: "membres" } → compteur qui monte de 0 (null = "..." à remplir)
  //   ajouter stores: true à une carte → badges App Store et Google Play sous le libellé (liens ci-dessous)
  // Valeurs d'exemple pour le template : remplacer par des chiffres RÉELS et datés.
  chiffres: [
    { valeur: 350, prefixe: "+", suffixe: "", label: "membres accompagnés" },   // chiffre donné par Tony le 19/09/2026
    { texte: "Gratuit", label: "aucun abonnement" },
    { valeur: 6, prefixe: "+", suffixe: "", label: "lives par semaine" },   // exemple ; « 1 application iOS et Android » à remettre quand l'appli sort
  ],
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
  temoignages: [
    { prenom: "Nassim", nom: "B.", handle: "nassim.b", profil: "Débutant · Salarié", depart: "500 €", arrivee: "1 850 €", duree: "4 mois",
      texte: "Jamais ouvert de compte avant. Installé en une soirée.", video: "D-b4-2rdsoU", capture: "placeholder", fictif: true },
    { prenom: "Léa", nom: "M.", handle: "lea.mrt", profil: "Étudiante · 30 min le soir", depart: "300 €", arrivee: "920 €", duree: "3 mois",
      texte: "Venue pour les signaux, restée pour les explications.", video: "D-b4-2rdsoU", capture: "placeholder", fictif: true },
    { prenom: "Yanis", nom: "K.", handle: "yanis.k", profil: "Déjà un compte ailleurs", depart: "1 000 €", arrivee: "2 700 €", duree: "5 mois",
      texte: "15 groupes Telegram avant. Un seul canal aujourd'hui.", video: "D-b4-2rdsoU", capture: "placeholder", fictif: true },
    { prenom: "Inès", nom: "D.", handle: "ines.dl", profil: "Débutante · Méfiante", depart: "250 €", arrivee: "610 €", duree: "2 mois",
      texte: "Toutes ses questions posées avant d'ouvrir son compte.", video: "D-b4-2rdsoU", capture: "placeholder", fictif: true },
    { prenom: "Adam", nom: "R.", handle: "adam.r", profil: "Reprise après avoir tout arrêté", depart: "800 €", arrivee: "2 100 €", duree: "6 mois",
      texte: "Avait perdu seul. Repart accompagné.", video: "D-b4-2rdsoU", capture: "placeholder", fictif: true },
    { prenom: "Sofia", nom: "T.", handle: "sofia.t", profil: "Débutante · Alternance", depart: "400 €", arrivee: "1 300 €", duree: "4 mois",
      texte: "Suivait les lives avant de se lancer. Installée en 20 minutes.", video: "D-b4-2rdsoU", capture: "placeholder", fictif: true },
  ],

  // --- Résultats façon Kéo : grille de captures prises dans le canal (sous « Pourquoi c'est gratuit ») ---
  //   Chemins d'images portrait (ex: "resultats/1.jpg"). "placeholder" = tuile d'exemple. resultatsVisibles = nombre affiché avant « Voir plus ».
  resultatsTitre: "Ce qui se passe dans le canal.",
  resultatsSous: "Captures prises dans le canal, avec l'accord des membres.",
  resultatsNote: "Exemples pour le rendu, à remplacer par de vraies captures.",
  resultatsVisibles: 8,
  resultats: ["placeholder", "placeholder", "placeholder", "placeholder", "placeholder", "placeholder", "placeholder", "placeholder", "placeholder", "placeholder", "placeholder", "placeholder"],

  // --- Pourquoi c'est gratuit : section avec le visage de la personne qui envoie (façon Kéo « pourquoi je donne tout ça ») ---
  gratuitTitre: "Pourquoi c'est gratuit.",
  // photo de la section = photoGrande du contact du lien, sinon sa photo de profil, sinon pas de photo
  gratuitAffiche: false,           // section « Pourquoi c'est gratuit » retirée le 19/09 à la demande de Tony (true pour la remettre, les textes ci-dessous sont conservés)
  gratuitTextes: [
    "Tu paies exactement les mêmes frais que si tu ouvrais ton compte en direct chez le broker partenaire. C'est lui qui reverse une partie de ses frais au club, sur ton volume d'activité, que tu gagnes ou que tu perdes.",
    "Tu ne me verses rien. Ton compte est à ton nom, je ne peux ni y déposer ni en retirer.",
    "Ce que j'y gagne : un membre bien installé, qui comprend ce qu'il fait, reste. J'ai donc intérêt à prendre le temps avec toi.",
  ],

  // --- Questions : dépliables, la vidéo dans chaque question, une ligne de texte maximum (peut être vide "") ---
  faqVideoDefaut: "5Y6GerIb7lU",   // vidéo utilisée quand une question n'a pas la sienne (placeholder : vidéo de Sacha)
  faqTextes: false,                // pas de résumé écrit sous la vidéo de chaque question (retiré le 19/09 à la demande de Tony ; true pour le remettre, les textes « r » ci-dessous sont conservés)
  faq: [   // 4 questions fixées par Tony le 19/09/2026. Les 6 anciennes sont gardées en commentaire sous la liste.
    { q: "Où est le piège ?", r: "Il n'y en a pas : tu paies les mêmes frais qu'en direct, c'est le broker partenaire qui reverse une part au club.", video: "" },
    { q: "Pour qui est fait Unlock ?", r: "Pour celui qui débute et veut comprendre avant de se lancer, et pour celui qui a déjà un compte et se sent seul. Pas pour celui qui cherche de l'argent facile.", video: "" },
    { q: "J'ai peu de temps libre, je vais y arriver ?", r: "Vingt minutes le soir suffisent pour suivre et apprendre à ton rythme. Personne ne peut te promettre un résultat, mais le temps n'est pas ce qui bloque.", video: "" },
    { q: "Est-ce que j'ai besoin de compétences techniques ou d'expérience ?", r: "Non. Je t'installe pas à pas et tout est expliqué depuis zéro. Il te faut un téléphone et l'envie d'apprendre.", video: "" },
  ],
  // Anciennes questions (avant le 19/09) : « Que se passe-t-il une fois que j'ai écrit ? », « Quelqu'un m'accompagne vraiment ? », « Comment je sais que ce n'est pas une arnaque ? », « Je peux perdre de l'argent ? », « Je débute, je vais suivre ? »

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
  editeur: "",   // vide = rien ne s'affiche. À remplir plus tard : nom de la structure, statut, adresse, e-mail de contact
  legal1: "Le club n'est pas un conseiller financier et ne fournit aucune recommandation d'investissement personnalisée. Il est rémunéré par le broker partenaire au titre d'apporteur d'affaires, sur le volume d'activité, et n'exécute aucune opération pour ton compte.",
  legal2: "Le trading comporte un risque de perte en capital, notamment avec l'effet de levier. Les performances passées ne garantissent pas les performances futures. Les témoignages sont des expériences individuelles et ne constituent pas une promesse de résultat. Les informations de cette page sont fournies à titre informatif et éducatif uniquement. N'investis que des sommes que tu peux te permettre de perdre.",

  // --- Mesure (facultatif) : adresse GoatCounter, ex: "https://tony.goatcounter.com/count". Vide = rien. ---
  goatcounter: "",
};
