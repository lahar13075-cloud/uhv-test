// ---------- 40 UHV QUESTIONS ----------
const questions = [
  { q: "What is invariant and universal among all human beings?", opts: ["Natural Acceptance", "Understanding", "Expectations", "None of these"], answer: "A" },
  { q: "Value education helps to?", opts: ["Remove our confusions", "Bring harmony in life", "Remove contradictions", "All of these"], answer: "D" },
  { q: "Holistic development of human beings means?", opts: ["Physical facility only", "Living with relationships", "Right understanding + relationships + physical facility", "None"], answer: "C" },
  { q: "Experiential validation means?", opts: ["Living by desires", "Verifying with natural acceptance", "Living by expectations", "Living by thoughts"], answer: "B" },
  { q: "Ensuring justice in relationship leads to ____ in society.", opts: ["Trust", "Fearlessness", "Respect", "None"], answer: "A" },

  { q: "The basic human aspiration is?", opts: ["Wealth", "Education", "Happiness and prosperity", "Power"], answer: "C" },
  { q: "Relationship is based on?", opts: ["Fear", "Competition", "Trust", "Misunderstanding"], answer: "C" },
  { q: "Prosperity means?", opts: ["Having more money", "Having physical facility", "Feeling of having enough", "Power"], answer: "C" },
  { q: "Sanyam means?", opts: ["Controlling others", "Self-discipline", "Respecting others", "Avoiding food"], answer: "B" },
  { q: "Seva means?", opts: ["Helping others", "Working for money", "Serving with responsibility", "None"], answer: "C" },

  { q: "Which is the correct order of human values?", opts: ["Respect → Trust → Affection", "Trust → Respect → Affection", "Affection → Trust → Respect", "None"], answer: "B" },
  { q: "Natural acceptance is?", opts: ["Always changing", "Dependent on beliefs", "Universal", "Different for everyone"], answer: "C" },
  { q: "Fearlessness in society comes from?", opts: ["Wealth", "Technology", "Trust in relationships", "Competition"], answer: "C" },
  { q: "What leads to harmony in family?", opts: ["Money", "Trust and respect", "More facilities", "Arguing"], answer: "B" },
  { q: "Which value strengthens relationships?", opts: ["Anger", "Possessiveness", "Respect", "Jealousy"], answer: "C" },

  { q: "Which is a basic requirement for human beings?", opts: ["Physical facility", "Relationship", "Both A and B", "Neither"], answer: "C" },
  { q: "Right understanding is developed by?", opts: ["Reading books", "Observation & self-exploration", "Listening to others", "Watching movies"], answer: "B" },
  { q: "Human consciousness is?", opts: ["Needs unlimited", "Needs limited", "Opposite of animal consciousness", "None"], answer: "C" },
  { q: "Respect means?", opts: ["Seeing the other as valuable", "Praising others", "Fear", "Dominating others"], answer: "A" },
  { q: "Trust means?", opts: ["Assuming negative", "Assuming intentions are good", "Doubting others", "Judging"], answer: "B" },

  { q: "What is harmony in self?", opts: ["No confusion", "Clarity", "No contradiction", "All of these"], answer: "D" },
  { q: "Competence means?", opts: ["Having more money", "Right skills with right understanding", "Competing with others", "Beating others"], answer: "B" },
  { q: "What is the basis of a healthy society?", opts: ["Power", "Wealth", "Justice", "Competition"], answer: "C" },
  { q: "Which is NOT a human value?", opts: ["Trust", "Affection", "Greed", "Respect"], answer: "C" },
  { q: "Human being = ?", opts: ["Body only", "Mind only", "Body + Consciousness", "None"], answer: "C" },

  { q: "What is the meaning of harmony?", opts: ["Fight", "Mutual happiness", "Competition", "Domination"], answer: "B" },
  { q: "To be in relationship you need?", opts: ["Fear", "Trust", "Competition", "Anger"], answer: "B" },
  { q: "Which is a physical facility?", opts: ["Food", "Trust", "Affection", "Respect"], answer: "A" },
  { q: "What is required for prosperity?", opts: ["Unlimited facilities", "Enough facilities + right understanding", "Competition", "Anger"], answer: "B" },
  { q: "Commitment means?", opts: ["Changing decision", "Being responsible consistently", "Forcing others", "Avoiding tasks"], answer: "B" },

  { q: "Which is needed for long-term happiness?", opts: ["Money", "Relationship", "Winning over others", "Power"], answer: "B" },
  { q: "Right evaluation means?", opts: ["Judging quickly", "Evaluating on the basis of competence", "Comparing with others", "Criticizing"], answer: "B" },
  { q: "Justice consists of?", opts: ["Trust", "Respect", "Affection", "All of these"], answer: "D" },
  { q: "Which is an indicator of prosperity?", opts: ["Greed", "Feeling of enough", "Jealousy", "Comparison"], answer: "B" },
  { q: "Which is NOT needed in relationships?", opts: ["Trust", "Respect", "Competition", "Affection"], answer: "C" },

  { q: "Human desires are?", opts: ["Unlimited", "Limited", "Random", "Meaningless"], answer: "B" },
  { q: "Which is external to the body?", opts: ["Respect", "Clothes", "Thoughts", "Feelings"], answer: "B" },
  { q: "What is the basis of mutual happiness?", opts: ["Competition", "Complementarity", "Domination", "Selfishness"], answer: "B" },
  { q: "Which is a natural need?", opts: ["Trust", "Greed", "Jealousy", "Laziness"], answer: "A" },
  { q: "Education should lead to?", opts: ["Job only", "Pressure", "Right understanding", "Competition"], answer: "C" }
];

// -------------------- STATE --------------------
let order = [];
let userAnswers = {};
let cur = 0;
let timerInterval = null;
let remainingSeconds = 0;
let animating = false;

const $ = id => document.getElementById(id);
function shuffle(a){ for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
function pad(n){ return n.toString().padStart(2,'0'); }
function formatTime(s){ const m=Math.floor(s/60); const ss=s%60; return `${m}:${pad(ss)}`; }
function capitalize(s){ return s.charAt(0).toUpperCase()+s.slice(1); }

// -------------------- START TEST --------------------
$("startBtn").addEventListener("click", () => {
  const name = $("username").value.trim();
  if (!name) { alert("Enter name first"); return; }

  order = shuffle([...Array(questions.length).keys()]);
  $("totalCount").innerText = questions.length;

  $("startPage").style.display = "none";
  $("quiz").style.display = "block";

  remainingSeconds = parseInt($("timerMinutes").value || "30") * 60;
  $("timerText").innerText = formatTime(remainingSeconds);

  timerInterval = setInterval(() => {
    remainingSeconds--;
    if (remainingSeconds <= 0) {
      clearInterval(timerInterval);
      submitTest();
    }
    $("timerText").innerText = formatTime(remainingSeconds);
  }, 1000);

  renderStage();
  showQuestion(0);
});

// -------------------- RENDER QUESTIONS --------------------
function renderStage() {
  const stage = $("qstage");
  stage.innerHTML = "";

  questions.forEach((q, i) => {
    const card = document.createElement("div");
    card.className = "question-card";
    card.id = "card" + i;
    card.style.display = "none";

    card.innerHTML = `<div class='qtext'><strong>Q${i+1}.</strong> ${q.q}</div>`;

    const opts = document.createElement("div");
    opts.className = "options";

    q.opts.forEach((o, j) => {
      const letter = ["A", "B", "C", "D"][j];
      const opt = document.createElement("label");
      opt.className = "option";

      opt.innerHTML = `<input type='radio' name='q${i}' value='${letter}' /> 
                       <strong>${letter}.</strong> ${o}`;

      opt.addEventListener("click", () => {
        document.querySelectorAll(`input[name="q${i}"]`)[j].checked = true;
        userAnswers[i] = letter;
        updateAnswered();
      });

      opts.appendChild(opt);
    });

    card.appendChild(opts);
    stage.appendChild(card);
  });

  updateAnswered();
}

// -------------------- SHOW QUESTION WITH ANIMATION --------------------
function showQuestion(position) {
  if (animating) return;
  animating = true;

  const prev = document.querySelector(".question-card.show");
  const newCard = $("card" + order[position]);

  newCard.style.display = "block";
  newCard.classList.remove("out-left", "out-right", "in-left", "in-right", "show");

  if (prev) {
    const prevIndex = parseInt(prev.id.replace("card", ""));
    const direction = (order.indexOf(prevIndex) < position) ? "out-left" : "out-right";
    prev.classList.add(direction);
    prev.classList.remove("show");
  }

  const incoming = prev ? 
    ((order.indexOf(parseInt(prev?.id.replace("card", ""))) < position) ? "in-right" : "in-left")
    : "in-right";

  newCard.classList.add(incoming);

  setTimeout(() => {
    newCard.classList.remove("in-left", "in-right");
    newCard.classList.add("show");

    if (prev) {
      setTimeout(() => {
        prev.style.display = "none";
        prev.classList.remove("out-left", "out-right");
      }, 420);
    }

    const radios = document.getElementsByName("q" + order[position]);
    for (const r of radios) r.checked = (userAnswers[order[position]] === r.value);

    animating = false;
    updateProgress();
  }, 20);

  cur = position;
  $("prevBtn").style.display = (cur > 0) ? "inline-block" : "none";
  $("nextBtn").innerText = (cur < questions.length - 1) ? "Next" : "Submit";
}

// -------------------- NAVIGATION --------------------
$("nextBtn").addEventListener("click", () => {
  saveCurrent();
  if (cur < questions.length - 1) showQuestion(cur + 1);
  else submitTest();
});

$("prevBtn").addEventListener("click", () => {
  saveCurrent();
  if (cur > 0) showQuestion(cur - 1);
});

function saveCurrent() {
  const sel = document.querySelector(`input[name="q${order[cur]}"]:checked`);
  if (sel) userAnswers[order[cur]] = sel.value;
  updateAnswered();
}

function updateAnswered() {
  $("answeredCount").innerText = Object.keys(userAnswers).length;
}

function updateProgress() {
  const pct = Math.round((cur / questions.length) * 100);
  $("progressBar").style.width = pct + "%";
  $("progressText").innerText = `Question ${cur + 1} / ${questions.length}`;
}

// -------------------- SUBMIT TEST --------------------
function submitTest() {
  if (timerInterval) clearInterval(timerInterval);
  saveCurrent();

  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) score++;
  }

  $("qstage").style.display = "none";
  document.querySelector(".controls").style.display = "none";
  $("result").style.display = "block";

  $("timerText").style.display = "none";
  document.querySelector(".progress-wrap").style.display = "none";

  const name = $("username").value.trim();
  $("result").innerHTML = `<div style="font-size:20px;font-weight:700">
      ${capitalize(name)}, your score is ${score}/${questions.length}
  </div>`;

  if ($("showAnswers").checked) {
    const det = document.createElement("div");
    det.style.marginTop = "12px";

    questions.forEach((q, i) => {
      const wrap = document.createElement("div");
      wrap.style.marginTop = "8px";
      wrap.innerHTML = `<strong>Q${i+1}.</strong> ${q.q}`;

      q.opts.forEach((opt, j) => {
        const letter = ["A", "B", "C", "D"][j];
        const line = document.createElement("div");
        line.style.padding = "8px";
        line.style.borderRadius = "6px";

        if (letter === q.answer) line.style.background = "rgba(56,163,255,0.1)";
        if (userAnswers[i] === letter && letter !== q.answer)
          line.style.background = "rgba(255,80,80,0.1)";

        line.innerHTML = `<strong>${letter}.</strong> ${opt}`;
        wrap.appendChild(line);
      });

      det.appendChild(wrap);
    });

    $("result").appendChild(det);
  }
}

// --------------- RIPPLE EFFECT --------------------
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".ripple").forEach(btn => {
    btn.addEventListener("click", function (e) {
      const circle = document.createElement("span");
      circle.style.position = "absolute";
      circle.style.borderRadius = "50%";
      circle.style.width = "120px";
      circle.style.height = "120px";
      circle.style.left = (e.offsetX - 60) + "px";
      circle.style.top = (e.offsetY - 60) + "px";
      circle.style.background = "rgba(255,255,255,0.08)";
      circle.style.transform = "scale(0)";
      circle.style.transition = "transform .6s, opacity .8s";

      this.appendChild(circle);

      setTimeout(() => {
        circle.style.transform = "scale(1)";
        circle.style.opacity = "0";
      }, 10);

      setTimeout(() => circle.remove(), 900);
    });
  });
});
