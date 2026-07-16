/* ============================================================
   DONNÉES DU QUIZZ — à modifier librement, c'est le seul fichier
   dont tu as vraiment besoin de t'occuper.
   ============================================================ */

const QUIZ_DATA = {

  /* ---------- MANCHE 1 : Questions (QCM ou +/-) ---------- */
  round1: {
    timerSeconds: 20, // durée par défaut du chrono (en secondes)
    questions: [
      {
        question: "Quelle est la capitale de l'Australie ?",
        type: "qcm", // "qcm" (4 réponses A-D) ou "plusminus" (+/-)
        answers: ["Sydney", "Melbourne", "Canberra", "Perth"],
        correctIndex: 2
        // timer: 15, // (optionnel) surcharge la durée par défaut pour cette question
      },
      {
        question: "Le Mont Blanc culmine à plus de 5000 mètres.",
        type: "plusminus",
        answers: ["Vrai (+)", "Faux (−)"],
        correctIndex: 1
      },
      {
        question: "Qui a peint 'La Nuit étoilée' ?",
        type: "qcm",
        answers: ["Claude Monet", "Vincent van Gogh", "Pablo Picasso", "Edgar Degas"],
        correctIndex: 1
      },
      {
        question: "Le Wi-Fi utilise exclusivement la fréquence 2.4 GHz.",
        type: "plusminus",
        answers: ["Vrai (+)", "Faux (−)"],
        correctIndex: 1
      },
      {
        question: "Combien y a-t-il de départements en France métropolitaine ?",
        type: "qcm",
        answers: ["86", "94", "96", "101"],
        correctIndex: 2
      },
      {
        question: "Quel est le plus long fleuve du monde ?",
        type: "qcm",
        answers: ["Le Nil", "L'Amazone", "Le Mississippi", "Le Yangtsé"],
        correctIndex: 0
      },
      {
        question: "Une équipe de rugby à XV compte 15 joueurs sur le terrain.",
        type: "plusminus",
        answers: ["Vrai (+)", "Faux (−)"],
        correctIndex: 0
      },
      {
        question: "En quelle année a eu lieu la première 24 Heures du Mans ?",
        type: "qcm",
        answers: ["1913", "1923", "1931", "1947"],
        correctIndex: 1
      }
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
      "Télévision",
      "Jeux vidéo"
    ]
  },

  /* ---------- MANCHE 3 : Personnalités (1-2-3 points) ---------- */
  round3: {
    personalities: [
      { name: "Zinédine Zidane", points: 1, image: null },
      { name: "Édith Piaf", points: 1, image: null },
      { name: "Omar Sy", points: 1, image: null },
      { name: "Marion Cotillard", points: 2, image: null },
      { name: "Alain Prost", points: 2, image: null },
      { name: "Simone de Beauvoir", points: 2, image: null },
      { name: "Antoine Lavoisier", points: 3, image: null },
      { name: "Colette", points: 3, image: null }
      // Pour ajouter une vraie photo : "image": "images/nom-fichier.jpg"
      // (place le fichier dans le dossier images/ à côté d'index.html)
    ]
  }

};
