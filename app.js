/* ============================================================
   NAVIGATION GÉNÉRALE
   ============================================================ */
function goTo(screenId) {
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
let r1Phase = "answers"; // answers -> timer-ready -> timer-running -> timer-done -> revealed
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
  } else if (r1Phase === "timer-ready") {
    btn.textContent = "Lancer le chrono";
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
    if (r1RevealedCount >= q.answers.length) r1Phase = "timer-ready";
    updateR1Button();
    return;
  }

  if (r1Phase === "timer-ready") {
    startR1Timer(q.timer || QUIZ_DATA.round1.timerSeconds);
    return;
  }

  if (r1Phase === "timer-done") {
    colorR1Tile(q.correctIndex);
    r1Phase = "revealed";
    updateR1Button();
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
  tile.classList.add(i === q.correctIndex ? "correct" : "incorrect");
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
   MANCHE 2 — CATÉGORIES
   ============================================================ */
function renderR2() {
  const grid = document.getElementById("r2-grid");
  grid.innerHTML = "";
  QUIZ_DATA.round2.categories.forEach((cat) => {
    const tile = document.createElement("button");
    tile.className = "category-tile";
    tile.innerHTML = `<span class="label">${cat}</span><span class="mark">✓</span>`;
    tile.addEventListener("click", () => tile.classList.toggle("used"));
    grid.appendChild(tile);
  });
}
document.getElementById("r2-reset").addEventListener("click", renderR2);

/* ============================================================
   MANCHE 3 — PERSONNALITÉS
   ============================================================ */
let r3Done = new Set();
let r3CurrentIndex = null;
let r3Phase = "hidden"; // hidden -> revealed
let r3StageDefaultHTML = "";

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

function renderR3Grid() {
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
  document.getElementById("r3-hint").textContent = "Clique sur une personnalité pour l'ouvrir.";
}

function openR3Reveal(i) {
  r3CurrentIndex = i;
  r3Phase = "hidden";
  const p = QUIZ_DATA.round3.personalities[i];
  const stage = document.getElementById("r3-stage");
  stage.innerHTML = `
    <div class="reveal-card">
      <span class="points-pill" data-pts="${p.points}">${p.points} pt${p.points > 1 ? "s" : ""}</span>
      <div class="reveal-avatar" id="r3-reveal-avatar">${
        p.image ? `<img src="${p.image}" alt="">` : initials(p.name)
      }</div>
      <div class="reveal-name hidden-text" id="r3-reveal-name">${p.name}</div>
    </div>
  `;
  document.getElementById("r3-controls").classList.remove("hidden");
  document.getElementById("r3-hint").textContent = "Espace / clic : révéler, puis retour à la liste.";
  updateR3Button();
}

function updateR3Button() {
  const btn = document.getElementById("r3-action");
  btn.textContent = r3Phase === "hidden" ? "Révéler" : "Retour à la liste";
}

function r3Advance() {
  if (r3Phase === "hidden") {
    document.getElementById("r3-reveal-avatar").classList.add("revealed");
    document.getElementById("r3-reveal-name").classList.remove("hidden-text");
    r3Phase = "revealed";
    updateR3Button();
    return;
  }
  if (r3Phase === "revealed") {
    r3Done.add(r3CurrentIndex);
    renderR3Grid();
  }
}

document.getElementById("r3-action").addEventListener("click", r3Advance);
document.getElementById("r3-cancel").addEventListener("click", renderR3Grid);
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
      const controls = document.getElementById("r3-controls");
      if (!controls.classList.contains("hidden")) document.getElementById("r3-action").click();
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
renderR2();
initR3();
