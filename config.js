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
  sousTitre: "Un environnement gratuit pour comprendre, t'entourer et avancer à ton rythme. Pas de formation à acheter, pas d'abonnement.",

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
    { titre: "Les canaux d'analyses", texte: "Les analyses des traders du club, publiées chaque jour de marché, expliquées pour que tu comprennes le raisonnement." },
    { titre: "L'accompagnement", texte: "Une personne pour t'installer, répondre à tes questions et te dire quoi regarder en premier." },
    { titre: "La communauté", texte: "Des membres qui débutent comme toi et d'autres plus avancés, un live chaque semaine." },
    { titre: "Les bases", texte: "Gestion du risque, taille de position, lecture d'un graphique. Le minimum pour ne pas faire n'importe quoi." },
  ],

  // --- Étape 3 : comment ça se passe (le vrai déroulé, dans l'ordre) ---
  deroule: [
    { titre: "Tu regardes la vidéo", texte: "Trois minutes pour comprendre ce qu'est le club et ce que ce n'est pas." },
    { titre: "Tu écris à la personne qui t'a envoyé cette page", texte: "Tu poses toutes tes questions. Aucune n'est bête. La réponse est franche, même si c'est non." },
    { titre: "On t'active ensemble", texte: "Si tu veux continuer, on t'explique la condition d'accès et on t'installe dans les canaux, avec toi, pas tout seul." },
  ],

  // --- Le club en chiffres : uniquement des chiffres RÉELS et datés. null = à remplir (affiche "...") ---
  chiffres: [
    { valeur: 0,    suffixe: "€", label: "d'abonnement" },
    { valeur: null, suffixe: "",  label: "membres au [DATE]" },
    { valeur: null, suffixe: "",  label: "lives par semaine" },
  ],

  // --- Témoignages façon Hans : cartes qui défilent, une vidéo par membre (call, partage d'écran...) ---
  // ATTENTION : les 6 cartes ci-dessous sont des EXEMPLES FICTIFS pour visualiser le rendu.
  // À remplacer par de vrais membres, avec leur accord écrit. Tant que "fictif" est à true,
  // la page affiche "Exemple fictif" sur chaque carte et une note sous le titre.
  temoignagesTitre: "Ce que disent les membres.",
  temoignagesSous: "Les mêmes parcours, en vidéo. Clique pour écouter chaque membre.",
  temoignagesNote: "Exemples fictifs pour le rendu, à remplacer par de vrais membres avec leur accord.",
  temoignages: [
    { prenom: "Nassim", nom: "B.", handle: "nassim.b", profil: "Débutant · Salarié", depart: "500 €", arrivee: "1 850 €", duree: "4 mois",
      texte: "N'avait jamais ouvert de compte. Installé en une soirée, a suivi les bases avant les canaux.", video: "D-b4-2rdsoU", capture: "placeholder", fictif: true },
    { prenom: "Léa", nom: "M.", handle: "lea.mrt", profil: "Étudiante · 30 min le soir", depart: "300 €", arrivee: "920 €", duree: "3 mois",
      texte: "Venue pour les signaux, restée pour la clarté des explications. Pose ses questions dans le canal.", video: "D-b4-2rdsoU", capture: "placeholder", fictif: true },
    { prenom: "Yanis", nom: "K.", handle: "yanis.k", profil: "Déjà un compte ailleurs", depart: "1 000 €", arrivee: "2 700 €", duree: "5 mois",
      texte: "Avait 15 groupes Telegram ouverts. Aujourd'hui un seul canal et une routine simple.", video: "D-b4-2rdsoU", capture: "placeholder", fictif: true },
    { prenom: "Inès", nom: "D.", handle: "ines.dl", profil: "Débutante · Méfiante", depart: "250 €", arrivee: "610 €", duree: "2 mois",
      texte: "A posé toutes ses questions avant d'ouvrir son compte. Personne ne lui a vendu du rêve.", video: "D-b4-2rdsoU", capture: "placeholder", fictif: true },
    { prenom: "Adam", nom: "R.", handle: "adam.r", profil: "Reprise après avoir tout arrêté", depart: "800 €", arrivee: "2 100 €", duree: "6 mois",
      texte: "Avait perdu seul. Repart avec une gestion du risque et quelqu'un à qui écrire.", video: "D-b4-2rdsoU", capture: "placeholder", fictif: true },
    { prenom: "Sofia", nom: "T.", handle: "sofia.t", profil: "Débutante · Alternance", depart: "400 €", arrivee: "1 300 €", duree: "4 mois",
      texte: "Suivait les lives du dimanche avant de se lancer. A été installée en 20 minutes.", video: "D-b4-2rdsoU", capture: "placeholder", fictif: true },
  ],

  // --- Questions façon Hans : une étape par question, la vidéo d'abord, une ligne de texte maximum (peut être vide "") ---
  faqVideoDefaut: "5Y6GerIb7lU",   // vidéo utilisée quand une question n'a pas la sienne (placeholder : vidéo de Sacha)
  faq: [
    { q: "Que se passe-t-il une fois que j'ai écrit ?", r: "", video: "" },
    { q: "Quelqu'un m'accompagne vraiment ?", r: "", video: "" },
    { q: "Pourquoi c'est gratuit ? Qui vous paie ?", r: "Tu paies les mêmes frais qu'en direct chez le broker partenaire, c'est lui qui reverse une partie de ses frais au club.", video: "" },
    { q: "Comment je sais que ce n'est pas une arnaque ?", r: "Tu ne nous donnes pas d'argent. Ton compte est à ton nom, chez le broker.", video: "" },
    { q: "Je peux perdre de l'argent ?", r: "Oui. Le trading comporte un risque de perte en capital. N'engage que ce que tu peux te permettre de perdre.", video: "" },
    { q: "Je débute, je vais suivre ?", r: "", video: "" },
  ],

  // --- Bloc final ---
  finalTitre: "On se voit dans le club.",
  finalTexte: "Pour que ça compte vraiment, il ne te reste plus qu'à :",
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
