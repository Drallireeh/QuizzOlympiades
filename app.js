/* ============================================================
   NAVIGATION GÉNÉRALE
   ============================================================ */
function goTo(screenId) {
  if (typeof clearR2Timer === "function") clearR2Timer();
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
  document.getElementById("screen-" + screenId).classList.add("active");
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-go]");
  if (btn) goTo(btn.dataset.go);
});

document.querySelectorAll("[id^='fullscreen-btn']").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen();
    }
  });
});

/* Petit bip via Web Audio, pas besoin de fichier son externe */
let audioCtx = null;
function playBeep() {
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.5);
  } catch (e) {
    /* silencieux si l'audio n'est pas dispo */
  }
}

/* ============================================================
   MANCHE 1 — QUESTIONS
   ============================================================ */
const TIMER_CIRCUMFERENCE = 2 * Math.PI * 52;

let r1Index = 0;
let r1Phase = "answers"; // answers -> timer-running -> timer-done -> revealed
let r1RevealedCount = 0;
let r1TimerInterval = null;
let r1StageDefaultHTML = "";

function initR1() {
  r1StageDefaultHTML = document.querySelector("#screen-round1 .stage").innerHTML;
  renderR1();
}

function renderR1() {
  const stage = document.querySelector("#screen-round1 .stage");
  if (stage.innerHTML !== r1StageDefaultHTML) stage.innerHTML = r1StageDefaultHTML;

  const data = QUIZ_DATA.round1;
  const q = data.questions[r1Index];

  document.querySelector("#screen-round1 .controls").classList.remove("hidden");
  document.querySelector("#screen-round1 .hint").classList.remove("hidden");

  document.getElementById("r1-counter").textContent = `${r1Index + 1} / ${data.questions.length}`;
  document.getElementById("r1-type-label").textContent = q.type === "qcm" ? "QCM" : "Vrai ou faux";
  document.getElementById("r1-question-text").textContent = q.question;

  const answersEl = document.getElementById("r1-answers");
  answersEl.className = "answers-grid" + (q.type === "plusminus" ? " plusminus" : "");
  answersEl.innerHTML = "";
  const letters = ["A", "B", "C", "D"];
  q.answers.forEach((ans, i) => {
    const tile = document.createElement("div");
    tile.className = "answer-tile";
    tile.dataset.index = i;
    tile.innerHTML =
      q.type === "qcm"
        ? `<span class="badge">${letters[i]}</span><span>${ans}</span>`
        : `<span>${ans}</span>`;
    tile.addEventListener("click", () => onR1TileClick(i));
    answersEl.appendChild(tile);
  });

  document.getElementById("r1-timer").classList.add("hidden");
  document.getElementById("r1-skip-timer").classList.add("hidden");
  document.getElementById("r1-prev").style.visibility = r1Index === 0 ? "hidden" : "visible";

  r1Phase = "answers";
  r1RevealedCount = 0;
  clearInterval(r1TimerInterval);
  updateR1Button();
}

function updateR1Button() {
  const btn = document.getElementById("r1-action");
  const isLast = r1Index === QUIZ_DATA.round1.questions.length - 1;
  btn.disabled = false;

  if (r1Phase === "answers") {
    btn.textContent = "Afficher la réponse suivante";
  } else if (r1Phase === "timer-running") {
    btn.textContent = "Chrono en cours…";
    btn.disabled = true;
  } else if (r1Phase === "timer-done") {
    btn.textContent = "Révéler la bonne réponse";
  } else if (r1Phase === "revealed") {
    btn.textContent = isLast ? "Terminer la manche" : "Question suivante →";
  }
}

function r1Advance() {
  const q = QUIZ_DATA.round1.questions[r1Index];

  if (r1Phase === "answers") {
    const tiles = document.querySelectorAll("#r1-answers .answer-tile");
    tiles[r1RevealedCount].classList.add("shown");
    r1RevealedCount++;
    if (r1RevealedCount >= q.answers.length) {
      startR1Timer(q.timer || QUIZ_DATA.round1.timerSeconds);
    } else {
      updateR1Button();
    }
    return;
  }

  if (r1Phase === "timer-done") {
    colorR1Tile(q.correctIndex);
    return;
  }

  if (r1Phase === "revealed") {
    if (r1Index < QUIZ_DATA.round1.questions.length - 1) {
      r1Index++;
      renderR1();
    } else {
      showR1End();
    }
  }
}

function onR1TileClick(i) {
  if (r1Phase !== "timer-done" && r1Phase !== "revealed") return;
  colorR1Tile(i);
}

function colorR1Tile(i) {
  const tile = document.querySelectorAll("#r1-answers .answer-tile")[i];
  if (tile.classList.contains("correct") || tile.classList.contains("incorrect")) return;
  const q = QUIZ_DATA.round1.questions[r1Index];
  if (i === q.correctIndex) {
    tile.classList.add("correct");
    r1Phase = "revealed";
    updateR1Button();
  } else {
    tile.classList.add("incorrect");
  }
}

function startR1Timer(seconds) {
  r1Phase = "timer-running";
  updateR1Button();
  document.getElementById("r1-answers").classList.remove("interactive");

  const ring = document.getElementById("r1-timer");
  const circle = document.getElementById("r1-timer-circle");
  const valueEl = document.getElementById("r1-timer-value");
  const skipBtn = document.getElementById("r1-skip-timer");

  ring.classList.remove("hidden", "urgent");
  skipBtn.classList.remove("hidden");

  circle.style.strokeDasharray = TIMER_CIRCUMFERENCE;
  circle.style.transition = "none";
  circle.style.strokeDashoffset = 0;
  void circle.getBoundingClientRect(); // force reflow
  circle.style.transition = `stroke-dashoffset ${seconds}s linear`;
  circle.style.strokeDashoffset = TIMER_CIRCUMFERENCE;

  let remaining = seconds;
  valueEl.textContent = remaining;
  clearInterval(r1TimerInterval);
  r1TimerInterval = setInterval(() => {
    remaining--;
    valueEl.textContent = Math.max(remaining, 0);
    if (remaining <= 5) ring.classList.add("urgent");
    if (remaining <= 0) {
      clearInterval(r1TimerInterval);
      onR1TimerEnd();
    }
  }, 1000);
}

function onR1TimerEnd() {
  document.getElementById("r1-skip-timer").classList.add("hidden");
  document.getElementById("r1-answers").classList.add("interactive");
  r1Phase = "timer-done";
  updateR1Button();
  playBeep();
}

function showR1End() {
  const stage = document.querySelector("#screen-round1 .stage");
  stage.innerHTML = `<div class="end-card"><h2>Manche 1 terminée !</h2><button class="primary-btn" data-go="home">Retour à l'accueil</button></div>`;
  document.querySelector("#screen-round1 .controls").classList.add("hidden");
  document.querySelector("#screen-round1 .hint").classList.add("hidden");
}

document.getElementById("r1-action").addEventListener("click", r1Advance);
document.getElementById("r1-prev").addEventListener("click", () => {
  if (r1Index > 0) {
    r1Index--;
    renderR1();
  }
});
document.getElementById("r1-skip-timer").addEventListener("click", () => {
  clearInterval(r1TimerInterval);
  const circle = document.getElementById("r1-timer-circle");
  circle.style.transition = "none";
  circle.style.strokeDashoffset = TIMER_CIRCUMFERENCE;
  onR1TimerEnd();
});
document.getElementById("r1-reset").addEventListener("click", () => {
  r1Index = 0;
  renderR1();
});

/* ============================================================
   MANCHE 2 — CATÉGORIES (chrono global + file de questions)
   ============================================================ */
let r2Done = new Map(); // catIndex -> score final
let r2CurrentCat = null;
let r2Queue = [];
let r2Score = 0;
let r2Remaining = 0;
let r2TimerInterval = null;
let r2StageDefaultHTML = "";

function initR2() {
  r2StageDefaultHTML = document.getElementById("r2-stage").innerHTML;
  renderR2Grid();
}

function clearR2Timer() {
  clearInterval(r2TimerInterval);
  r2TimerInterval = null;
}

function renderR2Grid() {
  clearR2Timer();
  const stage = document.getElementById("r2-stage");
  stage.innerHTML = r2StageDefaultHTML;
  const grid = document.getElementById("r2-grid");
  grid.innerHTML = "";
  QUIZ_DATA.round2.categories.forEach((cat, i) => {
    const done = r2Done.has(i);
    const tile = document.createElement("button");
    tile.className = "category-tile" + (done ? " used" : "");
    tile.disabled = done;
    tile.innerHTML = `
      <span class="label">${cat.name}</span>
      <span class="mark">✓</span>
      ${done ? `<span class="score-note">${r2Done.get(i)} bonne${r2Done.get(i) > 1 ? "s" : ""} réponse${r2Done.get(i) > 1 ? "s" : ""}</span>` : ""}
    `;
    if (!done) tile.addEventListener("click", () => openR2Category(i));
    grid.appendChild(tile);
  });
  document.getElementById("r2-hint").textContent = "Clique sur une catégorie pour la lancer.";
}

function openR2Category(i) {
  r2CurrentCat = i;
  r2Score = 0;
  r2Queue = QUIZ_DATA.round2.categories[i].questions.map((_, idx) => idx);
  renderR2Ready();
}

function renderR2Ready() {
  const cat = QUIZ_DATA.round2.categories[r2CurrentCat];
  const stage = document.getElementById("r2-stage");
  stage.innerHTML = `
    <div class="category-play">
      <div class="play-topbar">
        <span class="cat-name">${cat.name}</span>
        <span class="play-score" id="r2-play-score">0 bonne réponse</span>
      </div>
      <div class="ready-card">
        <p>${cat.questions.length} questions prêtes. Le chrono démarre à ton signal, la première question s'affichera au top départ.</p>
        <button class="primary-btn" id="r2-start-btn">Lancer le chrono (${formatMinSec(QUIZ_DATA.round2.timerSeconds)})</button>
      </div>
    </div>
  `;
  document.getElementById("r2-hint").textContent = "Prêt quand tu l'es.";
  document.getElementById("r2-start-btn").addEventListener("click", startR2Timer);
}

function formatMinSec(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function startR2Timer() {
  const seconds = QUIZ_DATA.round2.timerSeconds;
  r2Remaining = seconds;
  renderR2Question();

  clearR2Timer();
  r2TimerInterval = setInterval(() => {
    r2Remaining--;
    const el = document.getElementById("r2-chrono-value");
    if (el) el.textContent = formatMinSec(Math.max(r2Remaining, 0));
    if (r2Remaining <= 0) {
      clearR2Timer();
      endR2Category();
    }
  }, 1000);
}

function renderR2Question() {
  const cat = QUIZ_DATA.round2.categories[r2CurrentCat];
  const stage = document.getElementById("r2-stage");

  if (r2Queue.length === 0) {
    stage.innerHTML = `
      <div class="category-play">
        ${playTopbarHTML(cat)}
        <div class="waiting-card">
          <p>Toutes les questions ont été traitées, il reste du temps au chrono.</p>
          <button class="ghost-btn" id="r2-finish-early">Terminer maintenant</button>
        </div>
      </div>
    `;
    document.getElementById("r2-finish-early").addEventListener("click", () => {
      clearR2Timer();
      endR2Category();
    });
    document.getElementById("r2-hint").textContent = "En attente de la fin du chrono…";
    return;
  }

  const qIndex = r2Queue[0];
  const q = cat.questions[qIndex];
  stage.innerHTML = `
    <div class="category-play">
      ${playTopbarHTML(cat)}
      <div class="question-card">
        <p class="eyebrow">Question</p>
        <h2>${q.question}</h2>
        <div class="answer-box">
          <p class="eyebrow">Réponse</p>
          <p class="answer-text">${q.answer}</p>
        </div>
      </div>
      <div class="qa-actions">
        <button class="qa-btn good" id="r2-good">✓ Bonne réponse</button>
        <button class="qa-btn bad" id="r2-bad">✕ Mauvaise réponse</button>
        <button class="qa-btn skip" id="r2-skip">↷ Passer</button>
      </div>
    </div>
  `;
  document.getElementById("r2-hint").textContent = "Bonne réponse / mauvaise réponse / passer.";
  document.getElementById("r2-good").addEventListener("click", () => r2Answer("good"));
  document.getElementById("r2-bad").addEventListener("click", () => r2Answer("bad"));
  document.getElementById("r2-skip").addEventListener("click", () => r2Answer("skip"));
}

function playTopbarHTML(cat) {
  return `
    <div class="play-topbar">
      <span class="cat-name">${cat.name}</span>
      <span class="play-score" id="r2-play-score">Chrono : <span id="r2-chrono-value">${formatMinSec(
        r2Remaining
      )}</span> · ${r2Score} bonne${r2Score > 1 ? "s" : ""} réponse${r2Score > 1 ? "s" : ""}</span>
    </div>
  `;
}

function r2Answer(type) {
  const idx = r2Queue.shift();
  if (type === "good") r2Score++;
  if (type === "skip") r2Queue.push(idx);
  renderR2Question();
}

function endR2Category() {
  r2Done.set(r2CurrentCat, r2Score);
  const stage = document.getElementById("r2-stage");
  stage.innerHTML = `
    <div class="category-play">
      <div class="score-card">
        <p class="score-label">Score final</p>
        <div class="score-value" id="r2-final-score">${r2Score}</div>
        <p class="score-label">bonne${r2Score > 1 ? "s" : ""} réponse${r2Score > 1 ? "s" : ""}</p>
        <div class="score-adjust">
          <button class="icon-btn" id="r2-score-minus">−</button>
          <button class="icon-btn" id="r2-score-plus">+</button>
        </div>
        <button class="primary-btn" id="r2-back-to-grid">Retour à la liste des catégories</button>
      </div>
    </div>
  `;
  document.getElementById("r2-hint").textContent = "Manche 2 — chrono terminé.";
  document.getElementById("r2-score-minus").addEventListener("click", () => adjustR2Score(-1));
  document.getElementById("r2-score-plus").addEventListener("click", () => adjustR2Score(1));
  document.getElementById("r2-back-to-grid").addEventListener("click", renderR2Grid);
}

function adjustR2Score(delta) {
  const newScore = Math.max(0, r2Score + delta);
  r2Score = newScore;
  r2Done.set(r2CurrentCat, r2Score);
  document.getElementById("r2-final-score").textContent = r2Score;
}

document.getElementById("r2-reset").addEventListener("click", () => {
  r2Done = new Map();
  renderR2Grid();
});

/* ============================================================
   MANCHE 3 — PERSONNALITÉS
   ============================================================ */
let r3Done = new Set();
let r3CurrentIndex = null;
let r3Phase = "intro"; // intro -> prompt-shown -> timer-running -> timer-done -> revealed
let r3StageDefaultHTML = "";
let r3Timeout1 = null;
let r3Timeout2 = null;
let r3TimerInterval = null;

function initials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function initR3() {
  r3StageDefaultHTML = document.getElementById("r3-stage").innerHTML;
  renderR3Grid();
}

function clearR3Timers() {
  clearTimeout(r3Timeout1);
  clearTimeout(r3Timeout2);
  clearInterval(r3TimerInterval);
}

function renderR3Grid() {
  clearR3Timers();
  const stage = document.getElementById("r3-stage");
  stage.innerHTML = r3StageDefaultHTML;
  const grid = document.getElementById("r3-grid");
  grid.innerHTML = "";
  QUIZ_DATA.round3.personalities.forEach((p, i) => {
    const tile = document.createElement("button");
    tile.className = "personality-tile" + (r3Done.has(i) ? " done" : "");
    tile.innerHTML = `
      <div class="avatar">${p.image ? `<img src="${p.image}" alt="">` : initials(p.name)}</div>
      <span class="points-pill" data-pts="${p.points}">${p.points} pt${p.points > 1 ? "s" : ""}</span>
    `;
    tile.addEventListener("click", () => openR3Reveal(i));
    grid.appendChild(tile);
  });
  document.getElementById("r3-controls").classList.add("hidden");
  document.getElementById("r3-action").classList.add("hidden");
  document.getElementById("r3-skip-timer").classList.add("hidden");
  document.getElementById("r3-hint").textContent = "Clique sur une personnalité pour l'ouvrir.";
}

/* La photo et les points s'affichent tout de suite (plus de flou).
   1s après : le cartouche "? ? ?" apparaît.
   1s après ça : le chrono démarre tout seul. */
function openR3Reveal(i) {
  clearR3Timers();
  r3CurrentIndex = i;
  r3Phase = "intro";
  const p = QUIZ_DATA.round3.personalities[i];
  const stage = document.getElementById("r3-stage");
  stage.innerHTML = `
    <div class="reveal-card">
      <span class="points-pill" data-pts="${p.points}">${p.points} pt${p.points > 1 ? "s" : ""}</span>
      <div class="reveal-avatar" id="r3-reveal-avatar">${
        p.image ? `<img src="${p.image}" alt="">` : initials(p.name)
      }</div>
      <div class="reveal-question" id="r3-reveal-question">${p.question || ""}</div>
      <div class="reveal-name hidden-text" id="r3-reveal-name">${p.answer}</div>
      <div class="timer-ring hidden" id="r3-timer">
        <svg viewBox="0 0 120 120">
          <circle class="track" cx="60" cy="60" r="52"></circle>
          <circle class="progress" id="r3-timer-circle" cx="60" cy="60" r="52"></circle>
        </svg>
        <span class="value" id="r3-timer-value"></span>
      </div>
    </div>
  `;
  document.getElementById("r3-controls").classList.remove("hidden");
  document.getElementById("r3-action").classList.add("hidden");
  document.getElementById("r3-skip-timer").classList.add("hidden");
  document.getElementById("r3-hint").textContent = "…";

  r3Timeout1 = setTimeout(() => {
    document.getElementById("r3-reveal-question").classList.add("shown");
    r3Timeout2 = setTimeout(() => {
      startR3Timer(QUIZ_DATA.round3.timerSeconds || 15);
    }, 1000);
  }, 1000);
}

function startR3Timer(seconds) {
  r3Phase = "timer-running";
  const ring = document.getElementById("r3-timer");
  const circle = document.getElementById("r3-timer-circle");
  const valueEl = document.getElementById("r3-timer-value");
  const skipBtn = document.getElementById("r3-skip-timer");

  ring.classList.remove("hidden", "urgent");
  skipBtn.classList.remove("hidden");
  document.getElementById("r3-hint").textContent = "Chrono en cours…";

  circle.style.strokeDasharray = TIMER_CIRCUMFERENCE;
  circle.style.transition = "none";
  circle.style.strokeDashoffset = 0;
  void circle.getBoundingClientRect();
  circle.style.transition = `stroke-dashoffset ${seconds}s linear`;
  circle.style.strokeDashoffset = TIMER_CIRCUMFERENCE;

  let remaining = seconds;
  valueEl.textContent = remaining;
  r3TimerInterval = setInterval(() => {
    remaining--;
    valueEl.textContent = Math.max(remaining, 0);
    if (remaining <= 5) ring.classList.add("urgent");
    if (remaining <= 0) {
      clearInterval(r3TimerInterval);
      onR3TimerEnd();
    }
  }, 1000);
}

function onR3TimerEnd() {
  document.getElementById("r3-skip-timer").classList.add("hidden");
  r3Phase = "timer-done";
  updateR3Button();
  document.getElementById("r3-action").classList.remove("hidden");
  document.getElementById("r3-hint").textContent = "Clique sur Révéler quand tu es prêt.";
  playBeep();
}

function updateR3Button() {
  const btn = document.getElementById("r3-action");
  btn.textContent = r3Phase === "revealed" ? "Retour à la liste" : "Révéler";
}

function r3Advance() {
  if (r3Phase === "timer-done") {
    const nameEl = document.getElementById("r3-reveal-name");
    nameEl.classList.remove("hidden-text");
    nameEl.classList.add("shown");
    r3Phase = "revealed";
    updateR3Button();
    document.getElementById("r3-hint").textContent = "Clique sur Retour à la liste.";
    return;
  }
  if (r3Phase === "revealed") {
    r3Done.add(r3CurrentIndex);
    renderR3Grid();
  }
}

document.getElementById("r3-action").addEventListener("click", r3Advance);
document.getElementById("r3-cancel").addEventListener("click", renderR3Grid);
document.getElementById("r3-skip-timer").addEventListener("click", () => {
  clearInterval(r3TimerInterval);
  const circle = document.getElementById("r3-timer-circle");
  circle.style.transition = "none";
  circle.style.strokeDashoffset = TIMER_CIRCUMFERENCE;
  onR3TimerEnd();
});
document.getElementById("r3-reset").addEventListener("click", () => {
  r3Done = new Set();
  renderR3Grid();
});

/* ============================================================
   RACCOURCIS CLAVIER
   ============================================================ */
document.addEventListener("keydown", (e) => {
  const activeScreen = document.querySelector(".screen.active").id;

  if (e.key === "Escape") {
    goTo("home");
    return;
  }

  if (["Enter", " ", "ArrowRight"].includes(e.key)) {
    e.preventDefault();
    if (activeScreen === "screen-round1") {
      const btn = document.getElementById("r1-action");
      if (!btn.disabled) btn.click();
    } else if (activeScreen === "screen-round3") {
      const btn = document.getElementById("r3-action");
      if (!btn.classList.contains("hidden")) btn.click();
    }
    return;
  }

  if (e.key === "ArrowLeft" && activeScreen === "screen-round1") {
    document.getElementById("r1-prev").click();
  }
});

/* ============================================================
   INIT
   ============================================================ */
initR1();
initR2();
initR3();