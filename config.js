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

  // --- Témoignages façon Kéo : captures brutes (format portrait 4:5), zoom au clic ---
  // Mets les chemins des images ici, ex: "temoins/capture-1.jpg". Liste vide = section masquée.
  // Uniquement des membres réels avec leur accord écrit, sans montant ni capture de compte.
  temoignagesTitre: "Ce que disent les membres.",
  temoignagesSous: "Leurs messages, pris dans les canaux avec leur accord. Sur le club, pas sur leur compte.",
  temoignages: ["placeholder", "placeholder", "placeholder", "placeholder", "placeholder", "placeholder"],

  // --- Questions : réponse écrite obligatoire, vidéo facultative (identifiant YouTube ou "") ---
  faq: [
    { q: "Que se passe-t-il une fois que j'ai écrit ?",
      r: "Tu échanges avec la personne qui t'a envoyé la page. Elle t'explique le fonctionnement, la condition d'accès, et répond à tes questions. Ensuite tu décides.",
      video: "5Y6GerIb7lU" },
    { q: "Quelqu'un m'accompagne vraiment ?",
      r: "Oui. L'installation se fait avec toi, et tu as une personne à qui écrire quand quelque chose n'est pas clair.",
      video: "" },
    { q: "Pourquoi c'est gratuit ? Qui vous paie ?",
      r: "Tu paies exactement les mêmes frais que si tu ouvrais ton compte en direct chez le broker partenaire. C'est le broker qui reverse une partie de ses frais au club, en fonction du volume d'activité. Tu ne nous verses rien.",
      video: "" },
    { q: "Comment je sais que ce n'est pas une arnaque ?",
      r: "Tu ne nous donnes pas d'argent. Ton compte est à ton nom, chez le broker, et nous ne pouvons ni y déposer ni en retirer. Fais vérifier cette page par quelqu'un en qui tu as confiance avant d'écrire.",
      video: "" },
    { q: "Je peux perdre de l'argent ?",
      r: "Oui. Le trading comporte un risque de perte en capital, et l'effet de levier l'amplifie. Aucun signal, aucune analyse ne garantit un résultat. N'engage que ce que tu peux te permettre de perdre.",
      video: "" },
    { q: "Je débute, je vais suivre ?",
      r: "Oui, si tu suis l'ordre : d'abord les bases, ensuite les canaux. Personne ne te demande de comprendre tout de suite.",
      video: "" },
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
  legal2: "Le trading comporte un risque de perte en capital, notamment avec l'effet de levier. Les performances passées ne garantissent pas les performances futures. Les informations de cette page sont fournies à titre informatif et éducatif uniquement. N'investis que des sommes que tu peux te permettre de perdre.",

  // --- Mesure (facultatif) : adresse GoatCounter, ex: "https://tony.goatcounter.com/count". Vide = rien. ---
  goatcounter: "",
};
