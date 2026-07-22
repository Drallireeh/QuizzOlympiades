/* ============================================================
   DONNÉES DU QUIZZ — à modifier librement, c'est le seul fichier
   dont tu as vraiment besoin de t'occuper.
   ============================================================ */

const QUIZ_DATA = {

  /* ---------- MANCHE 1 : Questions (QCM ou +/-) ---------- */
  round1: {
    timerSeconds: 13, // durée par défaut du chrono (en secondes)
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

   round2: {
    timerSeconds: 180, // 3 minutes, modifiable ici
    categories: [
      {
        name: "Cinéma",
        questions: [
          { question: "Quel est le prénom de la princesse dans La Belle et la Bête ?", answer: "Belle" },
          { question: "Dans Retour vers le futur, comment s'appelle le scientifique ?", answer: "Doc Brown" },
          { question: "Quel film est le premier long-métrage d'animation de Disney ?", answer: "Blanche neige et les 7 nains" },
          { question: "Quel est le nom de l'hôtel dans Shining ?", answer: "Overlook Hotel" },
          { question: "Quel lion est le héros du Roi Lion ?", answer: "Simba" },
          { question: "Quel acteur interprète Maximus dans Gladiator ?", answer: "Russell Crowe" },
          { question: "Quelle couleur est la pilule choisie par Neo ?", answer: "Rouge" },
          { question: "Quel acteur refuse le rôle de Gandalf avant Ian McKellen ?", answer: "Sean Connery" },
          { question: "Quel réalisateur est surnommé \"le maître du suspense\" ?", answer: "Alfred Hitchcock" },
          { question: "Quel acteur joue le Joker dans The Dark Knight ?", answer: "Heath Ledger" },
          { question: "Quel réalisateur a signé Le Parrain ?", answer: "Francis Ford Coppola" },
          { question: "Quel acteur prête sa voix originale à Woody dans Toy Story ?", answer: "Tom Hanks" },
          { question: "Quel sont les films à avoir remporté les 11 Oscars pour lesquels ils étaient nommés ?", answer: "Ben-Hur, Titanic et le seigneur des anneaux : le retour du roi" },
          { question: "Dans Star Wars, quel est le prénom de l'empereur Palpatine ?", answer: "Sheev" },
          { question: "Dans quel film entend-on \"La vie, c'est comme une boîte de chocolats...\"  ?", answer: "Forrest Gump" },
          { question: "Quel est le nom du célèbre parc dans Jurassic Park ?", answer: "Jurassic Park" },
          { question: "Quel est le seul acteur à avoir remporté trois Oscars du meilleur acteur ?", answer: "Daniel Day-Lewis" },
          { question: "Quel réalisateur est derrière Le Bon, la Brute et le Truand ?", answer: "Sergio Leone" },
          { question: "Dans Les Évadés, quel est le nom de la prison ?", answer: "Shawshank" },
          { question: "Dans Interstellar, quel est le nom du robot principal ?", answer: "TARS" },
          { question: "Quel réalisateur a réalisé Le Prestige ?", answer: "Christopher Nolan" },
          { question: "Quel est le premier film non anglophone à avoir remporté l’oscar du meilleur film ?", answer: "Parasite" },
          { question: "Quel film a remporté l'Oscar du meilleur film en 2024 ?", answer: "Oppenheimer" },
          { question: "Quel film détient le record du box-office mondial ?", answer: "Avatar" },
          { question: "Avec quelle actrice Alain Delon forme un duo dans le film “La piscine” ?", answer: "Romy Schneider" },
        ]
      },
      {
        name: "Sport",
        questions: [
          { question: "Quel cheval a remporté pour la France la médaille d'or olympique en saut d'obstacles à Séoul en 1988 ?", answer: "Jappeloup" },
          { question: "Quel pays a remporté le plus de Coupes du monde de football ?", answer: "Brésil" },
          { question: "Quel pilote est surnommé \"The Doctor\" en MotoGP ?", answer: "Valentino Rossi" },
          { question: "Quel est le nom du tournoi du Grand Chelem disputé sur gazon ?", answer: "Wimbledon" },
          { question: "Quel pays a remporté la toute première Coupe du monde de football en 1930 ?", answer: "Uruguay" },
          { question: "Combien de points vaut une transformation au rugby ?", answer: "2" },
          { question: "Quelle est la distance à 10 mètres près d’un marathon ?", answer: "42,195 km" },
          { question: "Dans quel sport utilise-t-on une pierre de granit ?", answer: "Curling" },
          { question: "Quel pilote français est devenu champion du monde de F1 en 1993 ?", answer: "Alain Prost" },
          { question: "Quel nageur américain a remporté 23 médailles d'or olympiques ?", answer: "Michael Phelps" },
          { question: "Quel pays a inventé le tennis de table ?", answer: "Angleterre" },
          { question: "Au hockey sur glace, comment s’appelle la zone où un joueur se rend pour purger une pénalité ?", answer: "La prison" },
          { question: "Quel boxeur était surnommé \"The Greatest\" ?", answer: "Muhammad Ali" },
          { question: "Quelle joueuse détient le record de titres du Grand Chelem en simple à l'ère Open ?", answer: "Serena Williams" },
          { question: "Quel Français a remporté le Tour de France pour la dernière fois ?", answer: "Bernard Hinault" },
          { question: "Quel est l'ordre des disciplines dans un Ironman ?", answer: "Natation, vélo puis course à pied" },
          { question: "Parmi les différents sports de lancer en athlétisme, lequel n’est pas présent au décathlon ?", answer: "Lancer de marteau" },
          { question: "Quels sont les trois armes utilisées en escrime ?", answer: "Fleuret, Epée, Sabre" },
          { question: "Quelle nage est la plus rapide ?", answer: "Le crawl" },
          { question: "À partir de quelle distance est tiré un penalty ?", answer: "11 m" },
          { question: "Que signifie réaliser un birdie ?", answer: "Jouer un coup sous le par" },
          { question: "Aux Jeux olympiques, combien de membres composent au maximum une équipe masculine de bobsleigh ?", answer: "4" },
          { question: "Quel sportif est surnommé \"Le Cannibale\" ?", answer: "Eddy Merckx" },
          { question: "Quel est le sport national de l'Indonésie ?", answer: "Badminton" },
          { question: "Quel champion paralympique est tristement célèbre pour avoir tué sa compagne ?", answer: "Oscar Pistorius" },
        ]
      },
      {
        name: "Musique",
        questions: [
          { question: "Quel groupe a écrit Hotel California ?", answer: "Eagles" },
          { question: "Combien de cordes possède une guitare classique ?", answer: "6" },
          { question: "Quel groupe a participé au concert Live Aid avec une prestation devenue légendaire ?", answer: "Queen" },
          { question: "Quel groupe a vendu le plus de disques de l'histoire ?", answer: "Beatles" },
          { question: "Quel artiste est surnommé \"The Boss\" ?", answer: "Bruce Springsteen" },
          { question: "Quel est le véritable nom d'Elton John ?", answer: "Reginald Kenneth Dwight" },
          { question: "Quel compositeur est devenu sourd à la fin de sa vie ?", answer: "Beethoven" },
          { question: "Combien de touches possède un piano moderne ?", answer: "88" },
          { question: "Quel film est associé à la chanson \"Eye of the Tiger\" ?", answer: "Rocky 3" },
          { question: "Quel est le plus petit instrument de la famille des cordes frottées ?", answer: "Violon" },
          { question: "Quel artiste a composé Imagine ?", answer: "John Lennon" },
          { question: "Quel musicien est considéré comme le \"cinquième Beatle\" pour son rôle de producteur ?", answer: "George Martin" },
          { question: "Dans quelle ville est né le jazz ?", answer: "La nouvelle Orléans" },
          { question: "Quelle chanteuse détient le record du plus grand nombre de Grammy Awards remportés ?", answer: "Beyoncé" },
          { question: "Quel instrument est surnommé \"le roi des instruments\"  ?", answer: "L’orgue" },
          { question: "Combien de mouvements comporte une symphonie classique ?", answer: "4" },
          { question: "Citez 3 instruments à vent (bois).", answer: "Flûte, Harmonica, Clarinette, Saxophone, Accordéon, Hautbois ou Bombarde (3 au choix)" },
          { question: "Que signifie l'indication musicale \"Allegro\" ?", answer: "Rapide" },
          { question: "Comment appelle-t-on une suite de trois notes jouées simultanément ?", answer: "Un accord" },
          { question: "Quel groupe est connu pour ses maquillages extravagants sur scène ?", answer: "KISS" },
          { question: "Quel groupe a enregistré l'album The Dark Side of the Moon ?", answer: "Pink Floyd" },
          { question: "Quel groupe a composé \"Smoke on the Water\" ?", answer: "Deep Purple" },
          { question: "Quel est le nom de la voix masculine la plus aiguë ?", answer: "Ténor" },
          { question: "Que signifie EP dans l'industrie musicale ?", answer: "Extended play" },
          { question: "Quel groupe a été créé par les frères Angus et Malcolm Young ?", answer: "AC/DC" },
        ]
      },
      {
        name: "Sciences",
        questions: [
          { question: "Quel est le plus grand organe du corps humain ?", answer: "La peau" },
          { question: "Combien de chromosomes possède un être humain ?", answer: "46" },
          { question: "Quel est le symbole chimique de l'or ?", answer: "Au" },
          { question: "Quel scientifique a découvert la pénicilline ?", answer: "Alexander Fleming" },
          { question: "Combien de temps met la Terre pour tourner autour du Soleil ?", answer: "365.25 jours" },
          { question: "Combien de planètes compte le Système solaire ?", answer: "8" },
          { question: "Quel est l'animal terrestre le plus rapide ?", answer: "Le guépard" },
          { question: "Quel gaz est le plus abondant dans l'atmosphère terrestre ?", answer: "Azote" },
          { question: "Quel organe produit l'insuline ?", answer: "Le pancréas" },
          { question: "Quelle est la planète la plus proche du Soleil ?", answer: "Mercure" },
          { question: "Quelle couche de l'atmosphère contient la couche d'ozone ?", answer: "la stratosphère" },
          { question: "Quel est le seul métal liquide à température ambiante ?", answer: "Le mercure" },
          { question: "Combien d'os possède un adulte ?", answer: "206" },
          { question: "Combien de temps met la lumière du Soleil pour atteindre la Terre ?", answer: "8mn20" },
          { question: "Quel est l'animal possédant le plus gros cerveau ?", answer: "Cachalot" },
          { question: "Quelle est la plus haute montagne du Système solaire ?", answer: "Olympus Moon" },
          { question: "À quelle période a vécu le Tyrannosaurus rex ?", answer: "Crétacé" },
          { question: "Les mammouths ont-ils vécu en même temps que les pyramides d'Égypte ?", answer: "Oui" },
          { question: "Quel élément est indispensable à la fabrication du verre ?", answer: "Silice" },
          { question: "Quel gaz donne son odeur caractéristique aux œufs pourris ?", answer: "Sulfate d’hydrogène" },
          { question: "Quelle est l'unité de la résistance électrique ?", answer: "Ohm" },
          { question: "Quel est le seul os du corps humain qui ne touche aucun autre os ?", answer: "L’os Hyoïde" },
          { question: "Quel est le seul mammifère capable de voler ?", answer: "Chauve souris" },
          { question: "Combien de cœurs possède une pieuvre ?", answer: "Trois" },
          { question: "Quelle est la planète la plus chaude du Système solaire ?", answer: "Vénus" },
          { question: "Où est tombé l'astéroïde responsable de l’extinction des dinosaures ?", answer: "Chicxulub (Mexique accepté)" },
        ]
      },
      {
        name: "Histoire",
        questions: [
          { question: "En quelle année le mur de berlin est-il tombé ?", answer: "1989" },
          { question: "Où Napoléon Ier a-t-il été éxilé ?", answer: "L’île d’Elbe" },
          { question: "Quel roi français était surnommé le Roi-Soleil ?", answer: "Louis 14" },
          { question: "Quel conflit opposa le Nord et le Sud des États-Unis ?", answer: "La guerre de sécession" },
          { question: "Quel pays est à l'origine de la Révolution industrielle ?", answer: "Le Royaume-Uni" },
          { question: "Combien de temps à durée la guerre de 100 ans ?", answer: "116 ans" },
          { question: "Dans quelle ville Jules César fut-il assassiné ?", answer: "Rome" },
          { question: "Quel empire avait Constantinople pour capitale ?", answer: "L’empire Byzantin" },
          { question: "Quel navigateur découvrit la route maritime vers l'Inde en contournant l'Afrique ?", answer: "Vasco de gama" },
          { question: "Quel roi anglais possédait six épouses ?", answer: "Henri 8" },
          { question: "Quel était le nom de l'opération du débarquement de Normandie ?", answer: "Overlord" },
          { question: "Quel événement marque traditionnellement la fin du Moyen Âge ?", answer: "La chute de constantinople (ou découverte amérique, ça marche aussi)" },
          { question: "Quelle guerre fut la plus courte de l'histoire ?", answer: "Anglo-zanzibarienne" },
          { question: "Quel roi de France est mort après s'être cogné la tête contre un linteau de porte ?", answer: "Charles 8" },
          { question: "Quelle armée utilisait des éléphants de guerre contre Rome ?", answer: "Carthage" },
          { question: "Quel pays s'est séparé pacifiquement de la Tchéquie en 1993 ?", answer: "La Slovaquie" },
          { question: "Quel pays a lancé le premier satellite artificiel ?", answer: "L’URSS" },
          { question: "Quelle fortification chinoise est visible depuis l'espace ?", answer: "Aucune" },
          { question: "Quelle civilisation a inventé le papier ?", answer: "Les chinois" },
          { question: "Quel navigateur donne son nom à l'Amérique ?", answer: "Amerigo Vespucci" },
          { question: "Quelle période historique suit le Moyen Âge ?", answer: "Les Temps Modernes" },
          { question: "Quel ordre religieux et militaire protégeait les pèlerins en Terre sainte ?", answer: "Les templiers" },
          { question: "Comment s'appelle la grande épidémie qui a ravagé l'Europe au XIVᵉ siècle ?", answer: "La peste noire" },
          { question: "Quel est le nom du célèbre cheval d'Alexandre le Grand ?", answer: "Bucéphale" },
          { question: "Quel était le principal rôle d'un château fort ?", answer: "Défendre un territoire" },
        ]
      },
      {
        name: "Gastronomie",
        questions: [
          { question: "Quel fromage est utilisé dans une tartiflette ?", answer: "Reblochon" },
          { question: "Quel alcool parfume traditionnellement les crêpes Suzette ?", answer: "Le grand marnier" },
          { question: "Quelle crème est utilisée dans un Paris-Brest traditionnel ?", answer: "Crème mousseline au praliné" },
          { question: "Quelle est la différence entre une meringue française et une meringue italienne ?", answer: "L’italienne est réalisée avec un sirop de sucre chaud" },
          { question: "Comment appelle-t-on le fait de cuire brièvement un légume avant de le refroidir immédiatement ?", answer: "Blanchir" },
          { question: "Quel fruit donne les pruneaux d'Agen ?", answer: "La prune d’ente" },
          { question: "Quel fromage français est surnommé \"le roi des fromages\" ?", answer: "Le brie de meaux" },
          { question: "Quel est le seul aliment connu qui ne se périme pratiquement pas ?", answer: "Le miel" },
          { question: "La cacahuète est-elle une noix ?", answer: "Non, légumineuse" },
          { question: "Quel est le composé responsable de la sensation de piquant des piments ?", answer: "La capsaïcine" },
          { question: "Quel aliment rapporté d'Amérique était longtemps considéré comme toxique en Europe ?", answer: "La tomate" },
          { question: "Combien de temps de cuisson pour un œuf à la coque ?", answer: "3 mn" },
          { question: "De quel animal provient la mozzarella di bufala ?", answer: "La bufflone" },
          { question: "Quel est l'ingrédient principal du taboulé libanais traditionnel ?", answer: "Le boulgour" },
          { question: "Quel beurre est privilégié en pâtisserie française ?", answer: "Doux" },
          { question: "Quel fromage italien est râpé sur les pâtes carbonara traditionnelles ?", answer: "Pecorino Romano" },
          { question: "Quel est l'ingrédient principal du kimchi ?", answer: "Le chou chinois" },
          { question: "Quel fromage entre traditionnellement dans une fondue moitié-moitié suisse ?", answer: "Gruyère et Vacherin Fribourgeois" },
          { question: "Quelle variété de riz est utilisée pour un risotto ?", answer: "Arborio ou Carnaroli" },
          { question: "Le ceviche est originaire de quel pays ?", answer: "Pérou" },
          { question: "Quel est le seul fromage français bénéficiant d'une AOP fabriqué exclusivement avec du lait de brebis ?", answer: "Roquefort" },
          { question: "Quel fruit, très courant dans nos cuisines, est en fait une baie au sens botanique ?", answer: "La banane" },
          { question: "Quel est le seul fruit dont les graines sont à l'extérieur ?", answer: "La fraise" },
          { question: "Quel est le nom de la technique japonaise consistant à préparer du poisson cru tranché ?", answer: "Sachimi" },
          { question: "Quel est le nom de la technique qui consiste à cuire des aliments dans leur propre graisse ?", answer: "Le confit" },
        ]
      },
      {
        name: "Géographie",
        questions: [
          { question: "Quel fleuve traverse Budapest ?", answer: "Le Danube" },
          { question: "Dans quelle mer se jette le Nil ?", answer: "Méditérannée" },
          { question: "Combien y a t-il de volcans dans la ceinture de feu du pacifique, à 20 près ?", answer: "452" },
          { question: "Quelle est la capitale du suriname ?", answer: "Paramaribo" },
          { question: "Quel est le plus petit pays d'Afrique continentale ?", answer: "Rwanda" },
          { question: "Combien de pays bordent la mer Caspienne ?", answer: "5 (Russie Iran Turkménistan Azerbaïdjan kazaksthan)" },
          { question: "Quel est le plus grand océan terrestre ?", answer: "Pacifique" },
          { question: "Quel est le seul pays situé à la fois en Europe et en Asie ?", answer: "La turquie" },
          { question: "Quelle est la plus longue chaîne de montagnes du monde sur terre ?", answer: "Les andes" },
          { question: "Quelle est la plus grande île du monde ?", answer: "Groenland" },
          { question: "Quel est le volcan le plus actif d'Europe ?", answer: "Etna" },
          { question: "Quelle est la capitale du Brésil ?", answer: "Brasilia" },
          { question: "Quel pays est traversé par l'équateur et possède pourtant des sommets enneigés ?", answer: "Equateur" },
          { question: "Quel pays compte le plus de pyramides au monde ?", answer: "Le Soudan" },
          { question: "Quel pays est entièrement enclavé dans l'Afrique du Sud ?", answer: "Le Lesotho" },
          { question: "Quel pays possède deux capitales officielles ?", answer: "La Bolivie" },
          { question: "Quel plateau est surnommé le \"toit du monde\" ?", answer: "Le plateau tibétain" },
          { question: "Quel pays possède la plus forte altitude moyenne au monde ?", answer: "Le Bouthan" },
          { question: "Quel pays possède le plus de couleurs sur son drapeau national ?", answer: "Le Bélize" },
          { question: "Quel pays possède le plus de lacs au monde ?", answer: "Canada" },
          { question: "Quel est le pays le plus plat du monde ?", answer: "Maldives" },
          { question: "Quels sont les deux seuls pays d'Amérique du Sud à ne pas avoir de frontière avec le Brésil ?", answer: "Chili Equateur" },
          { question: "Quel pays possède un perroquet sur son drapeau ?", answer: "Le mozambique" },
          { question: "Quel est l'océan le plus petit ?", answer: "Arctique" },
          { question: "Quel est le point le plus bas de la Terre émergée ?", answer: "Les rives de la mer morte" },
        ]
      },
      {
        name: "Jeux vidéo",
        questions: [
          { question: "Quel studio est derrière Assassin's Creed ?", answer: "Ubisoft" },
          { question: "Quel était le métier de Mario lors de sa première apparition dans Donkey Kong ?", answer: "Charpentier" },
          { question: "Quel est le jeu vidéo le plus vendu de tous les temps ?", answer: "Minecraft" },
          { question: "Quel est le nom de l’animal bleu qui est la mascotte de Sega ?", answer: "Sonic" },
          { question: "Quel jeu est célèbre pour sa phrase \"The cake is a lie\" ?", answer: "Portal" },
          { question: "Dans quel jeu affronte-t-on Ganondorf ?", answer: "The legend of zelda" },
          { question: "Quel personnage est la mascotte de Halo ?", answer: "Master Chief" },
          { question: "Quel studio est à l'origine de Dark Souls ?", answer: "From Software" },
          { question: "Quel est le nom de la monnaie utilisée dans Animal Crossing ?", answer: "Les clochettes" },
          { question: "Quel jeu a popularisé le genre MOBA ?", answer: "Dota" },
          { question: "Quel est le nom de la planète de World of Warcraft ?", answer: "Azeroth" },
          { question: "Quelle console de Nintendo utilisait des cartouches violettes translucides ?", answer: "Nintendo 64" },
          { question: "Quel studio japonais a créé Resident Evil ?", answer: "Capcom" },
          { question: "Quel est le nom de la toute première console de jeu vidéo ?", answer: "Atari Pong" },
          { question: "Quel personnage est le héros de The Legend of Zelda ?", answer: "Link" },
          { question: "Quel Pokémon porte le numéro 001 du Pokédex ?", answer: "Bulbizarre" },
          { question: "Quel personnage de Street Fighter lance des Hadoken ?", answer: "Ryu ou Ken" },
          { question: "Quel constructeur produisait la Mega Drive ?", answer: "Sega" },
          { question: "Dans quel jeu incarne-t-on Geralt de Riv ?", answer: "The witcher" },
          { question: "Quelle entreprise a créé Pong ?", answer: "Atari" },
          { question: "Quels sont les noms des fantômes de Pacman ?", answer: "Blinky, Pinky, Inky & Clyde" },
          { question: "Que signifie \"NPC\" ?", answer: "Non playable Character" },
          { question: "Que veut dire “PES” ?", answer: "Pro Evolution Soccer" },
          { question: "Quel jeu est considéré comme le père des FPS modernes ?", answer: "Doom" },
          { question: "Quel jeu consiste principalement à empiler des blocs qui tombent ?", answer: "Tetris" },
        ]
      }
    ]
  },


  /* ---------- MANCHE 3 : Personnalités (1-2-3 points) ---------- */
 round3: {
    timerSeconds: 15, // chrono qui se lance automatiquement après l'apparition de la question
    personalities: [
      // --- 1 point (faciles) ---
      { name: "Leonardo DiCaprio", points: 1, image: "images/dicaprio.jpg", question: "Dans quel film incarne-t-il le personnage de Jack Dawson ?", answer: "Titanic" },
      { name: "Mimie Mathy", points: 1, image: "images/mathy.jpg", question: "Quel est le nom de son personnage dans joséphine ange-gardien ?", answer: "Joséphine Delamarre" },
      { name: "Kylian Mbappé", points: 1, image: "images/mbappe.jpg", question: "Dans quel club français s'est-il révélé ?", answer: "AS Monaco" },
      { name: "Louis de Funès", points: 1, image: "images/funes.jpg", question: "Quel gendarme célèbre incarnait-il ?", answer: "Cruchot" },
      { name: "Jean Dujardin", points: 1, image: "images/dujardin.jpg", question: "Pour quel film reçoit-il l'Oscar du meilleur acteur en 2012 ?", answer: "The Artist" },
      { name: "Antoine Griezmann", points: 1, image: "images/griezmann.jpg", question: "Quel est son surnom courant ?", answer: "Grizou" },
      { name: "Albert Einstein", points: 1, image: "images/einstein.jpg", question: "Quel prix nobel a-t-il remporté en 1921 ?", answer: "Prix Nobel de physique" },
 
      // --- 2 points (moyennes) ---
      { name: "Mylène Farmer", points: 2, image: "images/farmer.jpg", question: "De quel pays est-elle originaire ?", answer: "Canada" },
      { name: "Marion Cotillard", points: 2, image: "images/cotillard.jpg", question: "Pour quel rôle remporte-t-elle l'Oscar de la meilleure actrice ?", answer: "La Môme" },
      { name: "Tony Parker", points: 2, image: "images/parker.jpg", question: "Quel meneur légendaire était son entraîneur chez les Spurs ?", answer: "Gregg Popovich" },
      { name: "Teddy Riner", points: 2, image: "images/riner.jpg", question: "Combien de titres olympiques individuels possède-t-il ?", answer: "3" },
      { name: "Nekfeu", points: 2, image: "images/nekfeu.jpg", question: "Dans quel groupe de rap Nekfeu a-t-il fait ses débuts ?", answer: "S-crew" },
      { name: "Jean Reno", points: 2, image: "images/reno.jpg", question: "Quel est le prénom de la jeune fille protégée par Léon ?", answer: "Mathilda" },
      { name: "Thomas Pesquet", points: 2, image: "images/pesquet.jpg", question: "Quel était son métier avant de devenir astronaute ?", answer: "Pilote de ligne" },
 
      // --- 3 points (difficiles) ---
      { name: "Omar Sy", points: 3, image: "images/sy.jpg", question: "Quel est le nom du personnage qu'il incarne dans Jurassic World ?" },
      { name: "Stromae", points: 3, image: "images/stromae.jpg", question: "Quel est son nom de famille ?" },
      { name: "Jean Jacques Goldman", points: 3, image: "images/jeanjacques.jpg", question: "Avec quel groupe Jean-Jacques Goldman se fait-il connaître du grand public dans les années 1970 ?" },
      { name: "Johnny Hallyday", points: 3, image: "images/halliday.jpg", question: "Combien de fois s'est-il marié ?", answer: "5" },
      { name: "Alain Chabat", points: 3, image: "images/chabat.jpg", question: "Quel est le nom du journal fictif où il travaille dans La Cité de la peur ?", answer: "Cannes Matin" },
      { name: "Bourvil", points: 3, image: "images/bourvil.jpg", question: "Quel métier exerce-t-il avant d'être artiste ?", answer: "Boulanger" },
      { name: "Ayrton Senna", points: 3, image: "images/senna.jpg", question: "Quel pilote perd la vie lors des qualifications du Grand Prix de Saint-Marin 1994, le même week-end où Ayrton Senna trouve la mort en course ?", answer: "Roland Ratzenberger" },
      // Pour ajouter une vraie photo : "image": "images/nom-fichier.jpg"
      // (place le fichier dans le dossier images/ à côté d'index.html)
    ]
  }

};
