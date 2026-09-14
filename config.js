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

  // --- Qui envoie la page : lien ?r=prenom → badge + bouton "J'écris à ..." ---
  // Mets uniquement des liens publics (Instagram, page, formulaire). Jamais de numéro de téléphone.
  contactParDefaut: "tony",
  contacts: {
    tony:  { prenom: "Tony",  lien: "https://ig.me/m/tonyconsulting.fr" },
    sacha: { prenom: "Sacha", lien: "https://ig.me/m/sachaamoyel" },
  },

  // --- Étape 1 : la vidéo principale ---
  video: {
    youtube: "D-b4-2rdsoU",        // vidéo de présentation (placeholder : vidéo de Sacha)
    duree: "3 min",
  },

  // --- Étape 2 : ce que tu trouves dans le club (3 à 4 blocs) ---
  acces: [
    { titre: "L'application", texte: "Analyses, canaux et suivi au même endroit. iOS et Android." },
    { titre: "Les canaux d'analyses", texte: "Les analyses des traders du club, chaque jour de marché." },
    { titre: "L'accompagnement", texte: "Une personne pour t'installer et te répondre." },
    { titre: "La communauté", texte: "Des membres à ton niveau, 6 lives par semaine." },
  ],

  // --- Étape 3 : comment ça se passe (le vrai déroulé, dans l'ordre) ---
  deroule: [
    { titre: "Tu regardes la vidéo", texte: "Trois minutes, tout est dedans." },
    { titre: "Tu m'écris, sur Insta", texte: "Je prends mon temps avec toi pour tes questions." },
    { titre: "On te lance tranquillement ensemble", texte: "On t'aide à créer ton compte sur l'application." },
  ],

  // --- Le club en chiffres (3 cartes). Trois formes possibles :
  //   { texte: "Gratuit", label: "..." }                → un mot en grand
  //   { valeur: 200, suffixe: "", label: "membres" }    → compteur qui monte de 0 (null = "..." à remplir)
  //   { stores: true, label: "..." }                    → badges App Store et Google Play (liens ci-dessous)
  // Valeurs d'exemple pour le template : remplacer par des chiffres RÉELS et datés.
  chiffres: [
    { texte: "Gratuit", label: "aucun abonnement" },
    { valeur: 200, suffixe: "", label: "membres" },
    { stores: true, label: "application iOS et Android" },
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

  // --- Questions : dépliables, la vidéo dans chaque question, une ligne de texte maximum (peut être vide "") ---
  faqVideoDefaut: "5Y6GerIb7lU",   // vidéo utilisée quand une question n'a pas la sienne (placeholder : vidéo de Sacha)
  faq: [
    { q: "Que se passe-t-il une fois que j'ai écrit ?", r: "", video: "" },
    { q: "Quelqu'un m'accompagne vraiment ?", r: "", video: "" },
    { q: "Pourquoi c'est gratuit ? Qui vous paie ?", r: "Tu paies les mêmes frais qu'en direct, c'est le broker partenaire qui reverse une part au club.", video: "" },
    { q: "Comment je sais que ce n'est pas une arnaque ?", r: "Tu ne nous donnes pas d'argent. Ton compte est à ton nom.", video: "" },
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
  boutonTexte: "J'écris à {prenom}",        // {prenom} = la personne du lien ?r=
  antiUrgence: "Pas de compte à rebours, pas d'offre qui expire. Cette page sera encore là demain.",

  // --- Mentions légales (obligatoire en France) ---
  editeur: "[ÉDITEUR À COMPLÉTER : nom, statut, adresse, email]",
  legal1: "Le club n'est pas un conseiller financier et ne fournit aucune recommandation d'investissement personnalisée. Il est rémunéré par le broker partenaire au titre d'apporteur d'affaires, sur le volume d'activité, et n'exécute aucune opération pour ton compte.",
  legal2: "Le trading comporte un risque de perte en capital, notamment avec l'effet de levier. Les performances passées ne garantissent pas les performances futures. Les témoignages sont des expériences individuelles et ne constituent pas une promesse de résultat. Les informations de cette page sont fournies à titre informatif et éducatif uniquement. N'investis que des sommes que tu peux te permettre de perdre.",

  // --- Mesure (facultatif) : adresse GoatCounter, ex: "https://tony.goatcounter.com/count". Vide = rien. ---
  goatcounter: "",
};
