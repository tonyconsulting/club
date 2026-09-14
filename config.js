// ============================================================
//  RÉGLAGES DE LA PAGE CLUB : c'est le SEUL fichier à modifier.
//  Tout ce qui est entre guillemets peut être changé librement.
//  Les vidéos sont des identifiants YouTube (la partie après "v=").
// ============================================================
window.CLUB = {

  // --- Identité ---
  nom: "NOM DU CLUB",              // remplace par le vrai nom
  logo: "",                        // ex: "logo.png" (laisser vide = le nom s'affiche en texte)
  accent: "#00C896",               // couleur d'accent (vert Hans par défaut)
  titre: "Apprends les marchés financiers,",
  titreAccent: "avec des gens autour de toi.",   // la partie du titre en couleur
  sousTitre: "Gratuit, sans formation à acheter. Tout est expliqué dans la vidéo.",

  // --- La page parle à la première personne : c'est la personne qui l'envoie qui parle ("écris-moi").
  //     Le lien ?r=prenom choisit vers quel Instagram le bouton renvoie (et compte les clics par personne).
  //     Mets uniquement des liens publics (Instagram, page, formulaire). Jamais de numéro de téléphone.
  badge: "Accès gratuit",
  titreVideo: "Regarde cette vidéo avant de m'écrire.",
  identite: true,                  // photo + nom + abonnés de la personne qui envoie, tout en haut (façon Kéo)
  contactParDefaut: "sacha",
  contacts: {
    sacha: { prenom: "Sacha", nom: "Sacha Amoyel", handle: "sachaamoyel", abonnes: "17K", photo: "sacha.jpg", lien: "https://ig.me/m/sachaamoyel" },
    tony:  { prenom: "Tony",  nom: "Tony Rande",   handle: "",            abonnes: "",    photo: "",          lien: "https://ig.me/m/tonyconsulting.fr" },
  },

  // --- Étape 1 : la vidéo principale ---
  video: {
    youtube: "D-b4-2rdsoU",        // vidéo de présentation (placeholder : vidéo de Sacha)
    duree: "3 min",
  },

  // --- Étape 2 : ce que tu trouves dans le club (3 à 4 blocs) ---
  acces: [
    { titre: "L'application", texte: "Analyses, canaux et suivi au même endroit.", stores: true },   // stores: true = badges App Store et Google Play dans la carte
    { titre: "Les canaux d'analyses", texte: "Les analyses des traders du club, chaque jour de marché." },
    { titre: "L'accompagnement", texte: "Une personne pour t'installer et te répondre." },
    { titre: "La communauté", texte: "Des membres à ton niveau, 6 lives par semaine." },
  ],

  // --- Étape 3 : comment ça se passe (le vrai déroulé, dans l'ordre) ---
  deroule: [
    { titre: "Tu regardes la vidéo", texte: "Tout est dedans.", temps: "3 min" },
    { titre: "Tu m'écris sur Insta", texte: "Toutes tes questions, réponse franche.", temps: "2 min" },
    { titre: "On t'active ensemble", texte: "Je t'installe dans les canaux, avec toi.", temps: "20 min" },
  ],

  // --- Le club en chiffres (3 cartes). Formes possibles :
  //   { texte: "Gratuit", label: "..." }                          → un mot en grand
  //   { valeur: 200, prefixe: "+", suffixe: "", label: "membres" } → compteur qui monte de 0 (null = "..." à remplir)
  //   ajouter stores: true à une carte → badges App Store et Google Play sous le libellé (liens ci-dessous)
  // Valeurs d'exemple pour le template : remplacer par des chiffres RÉELS et datés.
  chiffres: [
    { valeur: 200, prefixe: "+", suffixe: "", label: "membres accompagnés" },
    { texte: "Gratuit", label: "aucun abonnement" },
    { valeur: 1, prefixe: "", suffixe: "", label: "application iOS et Android" },
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

  // --- Pourquoi c'est gratuit : section avec le visage de la personne qui envoie (façon Kéo « pourquoi je donne tout ça ») ---
  gratuitTitre: "Pourquoi c'est gratuit.",
  gratuitPhoto: "",                // photo grande (ex: "sacha-grande.jpg") ; vide = la photo de profil du contact
  gratuitTextes: [
    "Tu paies exactement les mêmes frais que si tu ouvrais ton compte en direct chez le broker partenaire. C'est lui qui reverse une partie de ses frais au club, sur ton volume d'activité, que tu gagnes ou que tu perdes.",
    "Tu ne me verses rien. Ton compte est à ton nom, je ne peux ni y déposer ni en retirer.",
    "Ce que j'y gagne : un membre bien installé, qui comprend ce qu'il fait, reste. J'ai donc intérêt à prendre le temps avec toi.",
  ],

  // --- Questions : dépliables, la vidéo dans chaque question, une ligne de texte maximum (peut être vide "") ---
  faqVideoDefaut: "5Y6GerIb7lU",   // vidéo utilisée quand une question n'a pas la sienne (placeholder : vidéo de Sacha)
  faq: [
    { q: "Où est le piège ?", r: "Il n'y en a pas : tu paies les mêmes frais qu'en direct, c'est le broker partenaire qui reverse une part au club.", video: "" },
    { q: "Que se passe-t-il une fois que j'ai écrit ?", r: "", video: "" },
    { q: "Quelqu'un m'accompagne vraiment ?", r: "", video: "" },
    { q: "Comment je sais que ce n'est pas une arnaque ?", r: "Tu ne me donnes pas d'argent. Ton compte est à ton nom.", video: "" },
    { q: "Je peux perdre de l'argent ?", r: "Oui. Le trading comporte un risque de perte en capital.", video: "" },
    { q: "Je débute, je vais suivre ?", r: "", video: "" },
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
