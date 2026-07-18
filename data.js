/* ============================================================
   DONNÉES DU QUIZZ — à modifier librement, c'est le seul fichier
   dont tu as vraiment besoin de t'occuper.
   ============================================================ */

const QUIZ_DATA = {

  /* ---------- MANCHE 1 : Questions (QCM ou +/-) ---------- */
  round1: {
    timerSeconds: 12, // durée par défaut du chrono (en secondes)
    questions: [
      {
        question: "Quel est le plus grand os du corps humain  ?",
        type: "qcm", // "qcm" (4 réponses A-D) ou "plusminus" (+/-)
        answers: ["Tibia", "Humérus", "Fémur", "Fibula"],
        correctIndex: 2
        // timer: 15, // (optionnel) surcharge la durée par défaut pour cette question
      },
      {
        question: "Quelle est la capitale de l'Australie ?",
        type: "qcm",
        answers: ["Sydney", "Melbourne", "Canberra", "Perth"],
        correctIndex: 2
      },
      {
        question: "Qui a peint 'La Nuit étoilée' ?",
        type: "qcm",
        answers: ["Claude Monet", "Vincent van Gogh", "Pablo Picasso", "Edgar Degas"],
        correctIndex: 1
      },
      {
        question: "Combien y a-t-il de départements en France métropolitaine ?",
        type: "qcm",
        answers: ["86", "94", "96", "101"],
        correctIndex: 2
      },
      {
        question: "Quel pays possède le plus grand nombre d'îles ?",
        type: "qcm",
        answers: ["Indonésie", "Japon", "Suède", "Philippines"],
        correctIndex: 2
      },
      {
        question: "Madonna a-t-elle vendu plus ou moins d'albums que Céline Dion ?",
        type: "plusminus",
        answers: ["+", "-"],
        correctIndex: 0
      },
      {
        question: "Lequel de ces actes n'est pas considéré comme un délit en Allemagne ?",
        type: "qcm",
        answers: ["Conduire pieds nus", "Ouvrir le courrier de son conjoint", "Refuser de témoigner devant un tribunal", "S'évader de prison"],
        correctIndex: 3
      },
      {
        question: "En quelle année a eu lieu la première 24 Heures du Mans ?",
        type: "qcm",
        answers: ["1913", "1919", "1923", "1929"],
        correctIndex: 2
      },
      {
        question: "Le Roi Lion (1994) a-t-il rapporté plus ou moins d'argent que La Reine des Neiges ?",
        type: "plusminus",
        answers: ["+", "-"],
        correctIndex: 1
      },
      {
        question: "Quel est le pays ayant le plus de fuseaux horaires ?",
        type: "qcm",
        answers: ["Russie", "USA", "France", "Royaume-Uni"],
        correctIndex: 2
      },
      {
        question: "AC/DC ont-ils vendu plus ou moins d'albums que Queen ?",
        type: "plusminus",
        answers: ["+", "-"],
        correctIndex: 1
      },
      {
        question: "Quelle est la capitale du Kazakhstan ?",
        type: "qcm",
        answers: ["Almaty", "Achgabat", "Bichkek", "Astana"],
        correctIndex: 3
      },
      {
        question: "Quelle planète possède le plus grand nombre de lunes connues ?",
        type: "qcm",
        answers: ["Jupiter", "Saturne", "Uranus", "Neptune"],
        correctIndex: 1
      },
      {
        question: "Quelle lettre n'apparaît dans aucun symbole du tableau périodique des éléments ?",
        type: "qcm",
        answers: ["J", "Q", "W", "X"],
        correctIndex: 0
      },
      {
        question: "Quelle couleur attire le moins les moustiques ?",
        type: "qcm",
        answers: ["Noire", "Blanche", "Rouge", "Verte"],
        correctIndex: 1
      },
      {
        question: "Eminem a-t-il vendu plus ou moins d'albums que Rihanna ?",
        type: "plusminus",
        answers: ["+", "-"],
        correctIndex: 1
      },
      {
        question: "Quel est le plus grand désert du monde ?",
         type: "qcm",
        answers: ["Sahara", "Gobi", "Antarctique", "Arabie"],
        correctIndex: 2
      },
      {
        question: "Quel roi de France était surnommé <<le Bien-Aimé>> ?",
         type: "qcm",
        answers: ["Louis XIII", "Louis XIV", "Louis XV", "Louis XVI"],
        correctIndex: 2
      },
      {
        question: "Quel est le seul État dont le drapeau national n'est pas un quadrilatère ?",
         type: "qcm",
        answers: ["Suisse", "Vatican", "Bhoutan", "Népal"],
        correctIndex: 3
      },
      {
        question: "Quelle est la plus ancienne université encore en activité ?",
         type: "qcm",
        answers: ["Oxford", "Al Quaraouiyine", "Bologne", "Sorbonne"],
        correctIndex: 1
      },
      {
        question: "Combien de cheminées possédait le titanic ?",
         type: "qcm",
        answers: ["3", "4", "5", "6"],
        correctIndex: 1
      },
    ]
  },

  /* ---------- MANCHE 2 : Catégories (lues à l'oral) ---------- */
  round2: {
    categories: [
      "Cinéma",
      "Musique",
      "Histoire",
      "Géographie",
      "Sport",
      "Sciences",
      "Gastronomie",
      "Jeux vidéo"
    ]
  },

  /* ---------- MANCHE 3 : Personnalités (1-2-3 points) ---------- */
 round3: {
    timerSeconds: 15, // chrono qui se lance automatiquement après l'apparition de la question
    personalities: [
      { name: "Zinédine Zidane", points: 1, image: null, question: "Il inscrit un doublé de la tête en finale de la Coupe du Monde 1998." },
      { name: "Édith Piaf", points: 1, image: null, question: "Surnommée « la Môme », elle a chanté 'Non, je ne regrette rien'." },
      { name: "Omar Sy", points: 1, image: null, question: "Révélé par 'Intouchables', il a reçu un César du meilleur acteur en 2012." },
      { name: "Marion Cotillard", points: 2, image: null, question: "Oscarisée en 2008 pour son rôle d'Édith Piaf dans 'La Môme'." },
      { name: "Alain Prost", points: 2, image: null, question: "Surnommé « le Professeur », quadruple champion du monde de Formule 1." },
      { name: "Simone de Beauvoir", points: 2, image: null, question: "Autrice du 'Deuxième Sexe', figure majeure du féminisme français." },
      { name: "Antoine Lavoisier", points: 3, image: null, question: "Père de la chimie moderne, il énonce la loi de conservation de la masse." },
      { name: "Colette", points: 3, image: null, question: "Autrice de 'Gigi' et du cycle des 'Claudine', première femme aux Goncourt en présidente du jury." }
      // Pour ajouter une vraie photo : "image": "images/nom-fichier.jpg"
    ]
  }

};
