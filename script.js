// --------------- 40 QUESTIONS -----------------
const questions = [
  { q:"What is invariant and universal among all human beings?", opts:["Natural Acceptance","Understanding","Expectations","None"], answer:"A" },
  { q:"Value education helps to?", opts:["Remove our confusions","Bring harmony","Remove contradictions","All"], answer:"D" },
  { q:"Holistic development means?", opts:["Physical only","Relationships","Understanding + Relationships + Physical","None"], answer:"C" },
  { q:"Experiential validation means?", opts:["Desires","Verify with natural acceptance","Expectations","Thoughts"], answer:"B" },
  { q:"Ensuring justice leads to ___ in society.", opts:["Trust","Fearlessness","Respect","None"], answer:"B" },

  // You can add remaining 35 MCQs here, same format.
];

// ------------------------------------------------------------------
// DO NOT TOUCH BELOW THIS — everything is auto-managed
// ------------------------------------------------------------------

let order = [];
let userAnswers = {};
let cur = 0;
let timerInterval = null;
let remainingSeconds = 0;

const $ = id => document.getElementById(id);

// Shuffle array
function shuffle(a){
  for(let i = a.length - 1; i > 0; i--){
    const j = Math.floor(Math.random()*(i+1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pad(n){ return n.toString().padStart(2,"0"); }

function formatTime(s){
  return `${Math.floor(s/60)}:${pad(s%60)}`;
}

function startTimer(){
  remainingSeconds = 30*60;
  $("timerText").innerText = formatTime(remainingSeconds);

  timerInterval = setInterval(()=>{
    remainingSeconds--;
    $("timerText").innerText = formatTime(remainingSeconds);

    if(remainingSeconds <= 0){
      clearInterval(timerInterval);
      submitTest();
    }
  },1000);
}

// ------------------------- START -----------------------------
$("startBtn").onclick = () => {
  const name = $("username").value.trim();
  if(!name) return alert("Enter your name first");

  order = shuffle([...Array(questions.length).keys()]);

  $("startPage").style.display = "none";
  $("quiz").style.display = "block";

  startTimer();
  renderQuestions();
  showQuestion(0);
};

// ------------------------- RENDER -----------------------------
function renderQuestions(){
  const stage = $("qstage");
  stage.innerHTML = "";

  questions.forEach((q,i)=>{
    const card = document.createElement("div");
    card.className = "question-card";
    card.id = "card"+i;
    card.style.display = "none";

    let html = `
      <div class="qtext">${q.q}</div>
      <div class="options">
    `;

    q.opts.forEach((o,j)=>{
      const letter = ["A","B","C","D"][j];
      html += `
        <label class="option">
          <input type="radio" name="q${i}" value="${letter}">
          <strong>${letter}.</strong> ${o}
        </label>`;
    });

    html += "</div>";
    card.innerHTML = html;

    stage.appendChild(card);
  });
}

// --------------------- NAVIGATION ---------------------------
function showQuestion(pos){
  document.querySelectorAll(".question-card").forEach(c => c.style.display = "none");

  const qid = order[pos];
  $("card"+qid).style.display = "block";

  cur = pos;
  $("progressText").innerText = `Question ${cur+1}/${questions.length}`;

  // Buttons
  $("prevBtn").style.visibility = cur === 0 ? "hidden" : "visible";
  $("nextBtn").innerText = cur === questions.length - 1 ? "Submit" : "Next →";
}

$("nextBtn").onclick = () => {
  saveCurrent();

  if(cur < questions.length - 1) showQuestion(cur+1);
  else submitTest();
};

$("prevBtn").onclick = () => {
  saveCurrent();
  if(cur > 0) showQuestion(cur-1);
};

function saveCurrent(){
  const realIndex = order[cur];
  const selected = document.querySelector(`input[name="q${realIndex}"]:checked`);
  if(selected) userAnswers[realIndex] = selected.value;
}

// -------------------------- SUBMIT --------------------------
function submitTest(){
  clearInterval(timerInterval);

  let score = 0;
  for(let i=0; i<questions.length; i++)
    if(userAnswers[i] === questions[i].answer) score++;

  document.querySelector(".controls").style.display = "none";
  $("qstage").style.display = "none";

  $("result").style.display = "block";
  $("result").innerHTML = `
    <div><strong>${$("username").value}</strong>, your score is:</div>
    <div style="font-size:28px;font-weight:bold;">${score}/${questions.length}</div>
  `;
}
