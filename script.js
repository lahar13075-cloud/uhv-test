// QUESTIONS
const questions = [
  { q:"What is invariant and universal among all human beings?", opts:["Natural Acceptance","Understanding","Expectations","None of these"], answer:"A" },
  { q:"Value education helps to?", opts:["Remove our confusions","Bring harmony in life","Remove contradictions","All of these"], answer:"D" },
  { q:"Holistic development means?", opts:["Physical only","Relationships","Understanding + Relationships + Physical","None"], answer:"C" },
  { q:"Experiential validation means?", opts:["Desires","Verify with natural acceptance","Expectations","Thoughts"], answer:"B" },
  { q:"Ensuring justice leads to ___ in society.", opts:["Trust","Fearlessness","Respect","None"], answer:"A" },

  { q:"The basic human aspiration is?", opts:["Wealth","Education","Happiness and prosperity","Power"], answer:"C" },
  { q:"Relationship is based on?", opts:["Fear","Competition","Trust","Misunderstanding"], answer:"C" },
  { q:"Prosperity means?", opts:["Having more money","Having physical facility","Feeling of having enough","Power"], answer:"C" },
  { q:"Sanyam means?", opts:["Controlling others","Self-discipline","Respecting others","Avoiding food"], answer:"B" },
  { q:"Seva means?", opts:["Helping others","Working for money","Serving with responsibility","None"], answer:"C" },

  { q:"Which is the correct order of human values?", opts:["Respect → Trust → Affection","Trust → Respect → Affection","Affection → Trust → Respect","None"], answer:"B" },
  { q:"Natural acceptance is?", opts:["Always changing","Dependent on beliefs","Universal","Different for everyone"], answer:"C" },
  { q:"Fearlessness in society comes from?", opts:["Wealth","Technology","Trust in relationships","Competition"], answer:"C" },
  { q:"What leads to harmony in family?", opts:["Money","Trust and respect","More facilities","Arguing"], answer:"B" },
  { q:"Which value strengthens relationships?", opts:["Anger","Possessiveness","Respect","Jealousy"], answer:"C" },

  { q:"Which is a basic requirement for human beings?", opts:["Physical facility","Relationship","Both A and B","Neither"], answer:"C" },
  { q:"Right understanding is developed by?", opts:["Reading books","Observation & self-exploration","Listening to others","Watching movies"], answer:"B" },
  { q:"Human consciousness is?", opts:["Needs unlimited","Needs limited","Opposite of animal consciousness","None"], answer:"C" },
  { q:"Respect means?", opts:["Seeing the other as valuable","Praising others","Fear","Dominating others"], answer:"A" },
  { q:"Trust means?", opts:["Assuming negative","Assuming intentions are good","Doubting others","Judging"], answer:"B" },

  { q:"What is harmony in self?", opts:["No confusion","Clarity","No contradiction","All of these"], answer:"D" },
  { q:"Competence means?", opts:["Having more money","Right skills with right understanding","Competing with others","Beating others"], answer:"B" },
  { q:"What is the basis of a healthy society?", opts:["Power","Wealth","Justice","Competition"], answer:"C" },
  { q:"Which is NOT a human value?", opts:["Trust","Affection","Greed","Respect"], answer:"C" },
  { q:"Human being = ?", opts:["Body only","Mind only","Body + Consciousness","None"], answer:"C" },

  { q:"What is the meaning of harmony?", opts:["Fight","Mutual happiness","Competition","Domination"], answer:"B" },
  { q:"To be in relationship you need?", opts:["Fear","Trust","Competition","Anger"], answer:"B" },
  { q:"Which is a physical facility?", opts:["Food","Trust","Affection","Respect"], answer:"A" },
  { q:"What is required for prosperity?", opts:["Unlimited facilities","Enough facilities + right understanding","Competition","Anger"], answer:"B" },
  { q:"Commitment means?", opts:["Changing decision","Being responsible consistently","Forcing others","Avoiding tasks"], answer:"B" },

  { q:"Which is needed for long-term happiness?", opts:["Money","Relationship","Winning over others","Power"], answer:"B" },
  { q:"Right evaluation means?", opts:["Judging quickly","Evaluating on the basis of competence","Comparing with others","Criticizing"], answer:"B" },
  { q:"Justice consists of?", opts:["Trust","Respect","Affection","All of these"], answer:"D" },
  { q:"Which is an indicator of prosperity?", opts:["Greed","Feeling of enough","Jealousy","Comparison"], answer:"B" },
  { q:"Which is NOT needed in relationships?", opts:["Trust","Respect","Competition","Affection"], answer:"C" },

  { q:"Human desires are?", opts:["Unlimited","Limited","Random","Meaningless"], answer:"B" },
  { q:"Which is external to the body?", opts:["Respect","Clothes","Thoughts","Feelings"], answer:"B" },
  { q:"What is the basis of mutual happiness?", opts:["Competition","Complementarity","Domination","Selfishness"], answer:"B" },
  { q:"Which is a natural need?", opts:["Trust","Greed","Jealousy","Laziness"], answer:"A" },
  { q:"Education should lead to?", opts:["Job only","Pressure","Right understanding","Competition"], answer:"C" }
];

let order = [];
let userAnswers = {};
let cur = 0;
let timerInterval = null;
let remainingSeconds = 0;
let animating = false;

const $ = id => document.getElementById(id);
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function pad(n){return n.toString().padStart(2,'0');}
function formatTime(s){return `${Math.floor(s/60)}:${pad(s%60)}`;}
function capitalize(s){return s.charAt(0).toUpperCase()+s.slice(1);}

// THEME SWITCH
let light=false;
$("themeToggle").onclick=()=>{
  light=!light;
  if(light){
    document.body.style.background="#f4f4f4";
    document.body.style.color="#000";
    $("themeToggle").innerText="Dark Mode";
  } else {
    document.body.style.background="";
    document.body.style.color="";
    $("themeToggle").innerText="Light Mode";
  }
};

// START BUTTON
$("startBtn").onclick=()=>{
  const name = $("username").value.trim();
  if(!name){ alert("Enter name first"); return; }

  order = shuffle(Array.from(questions.keys()));
  $("totalCount").innerText = questions.length;

  $("startPage").style.display="none";
  $("quiz").style.display="block";

  remainingSeconds = 30 * 60;
  $("timerText").innerText = formatTime(remainingSeconds);

  timerInterval = setInterval(()=>{
    remainingSeconds--;
    if(remainingSeconds<=0){ clearInterval(timerInterval); submitTest(); }
    $("timerText").innerText = formatTime(remainingSeconds);
  },1000);

  renderStage();
  showQuestion(0);
};

// RENDER QUESTIONS
function renderStage(){
  const stage = $("qstage");
  stage.innerHTML="";

  questions.forEach((q,i)=>{
    const card = document.createElement("div");
    card.className="question-card";
    card.id="card"+i;
    card.style.display="none";

    let html = `<div class='qtext'><strong>Q${i+1}.</strong> ${q.q}</div><div class='options'>`;

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

// SHOW QUESTION
function showQuestion(pos){
  document.querySelectorAll(".question-card").forEach(c=>c.style.display="none");
  const card = $("card"+order[pos]);
  card.style.display="block";

  cur = pos;
  $("progressText").innerText = `Question ${cur+1} / ${questions.length}`;
  $("progressBar").style.width = (cur/questions.length)*100 + "%";

  $("prevBtn").style.display = cur>0 ? "inline-block" : "none";
  $("nextBtn").innerText = cur<questions.length-1 ? "Next" : "Submit";
}

$("nextBtn").onclick=()=>{
  saveCurrent();
  if(cur<questions.length-1) showQuestion(cur+1);
  else submitTest();
};

$("prevBtn").onclick=()=>{
  saveCurrent();
  showQuestion(cur-1);
};

function saveCurrent(){
  const sel = document.querySelector(`input[name="q${order[cur]}"]:checked`);
  if(sel) userAnswers[order[cur]] = sel.value;
  $("answeredCount").innerText = Object.keys(userAnswers).length;
}

// SUBMIT TEST
function submitTest(){
  clearInterval(timerInterval);

  saveCurrent();

  let score=0;
  for(let i=0;i<questions.length;i++)
    if(userAnswers[i]===questions[i].answer) score++;

  $("qstage").style.display="none";
  document.querySelector(".controls").style.display="none";

  $("progressText").style.display="none";
  $("timerText").style.display="none";

  $("result").style.display="block";
  $("result").innerHTML=`<div style="font-size:20px;font-weight:700">${capitalize($("username").value)}, your score is ${score}/${questions.length}</div>`;
}
