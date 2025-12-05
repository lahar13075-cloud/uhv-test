// 40 UHV QUESTIONS
const questions = [
  { q: "What is invariant and universal among all human beings?", opts: ["Natural Acceptance","Understanding","Expectations","None of these"], answer: "A" },
  { q: "Value education helps to?", opts: ["Remove our confusions","Bring harmony in all levels of human living","Removes our contradictions","All of these"], answer: "D" },
  { q: "Holistic development of human beings means?", opts: ["Living only with Physical facility","Living with Relationships","Living for right understanding, relationship and physical","None of these"], answer: "C" },
  { q: "Experiential validation of proposal means?", opts: ["Living according to our desires","Living according to proposal after verifying with natural acceptance","Living according to expectations","Living according to thoughts"], answer: "B" },
  { q: "Ensuring justice in relationship leads to ______ in society.", opts: ["Trust","Fearlessness","Respect","None of these"], answer: "B" },

  // add any remaining questions up to 40...
];

// Helpers
const $ = id => document.getElementById(id);
let order = [];
let userAnswers = {};
let cur = 0;
let timerInterval=null;
let remainingSeconds = 1800;
let animating=false;

function shuffle(arr){for(let i=arr.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}return arr;}
function pad(n){return n.toString().padStart(2,'0');}
function formatTime(s){return `${Math.floor(s/60)}:${pad(s%60)}`;}

document.getElementById("startBtn").addEventListener("click", ()=>{
  const name = $('username').value.trim();
  if(!name){alert("Enter name first");return;}

  order = shuffle([...Array(questions.length).keys()]);
  $("totalCount").innerText = questions.length;

  $("startPage").style.display="none";
  $("quiz").style.display="block";

  remainingSeconds = 30*60;
  $("timerText").innerText = formatTime(remainingSeconds);

  timerInterval = setInterval(()=>{
    remainingSeconds--;
    $("timerText").innerText = formatTime(remainingSeconds);
    if(remainingSeconds<=0){clearInterval(timerInterval); submitTest();}
  },1000);

  renderStage();
  showQuestion(0);
});

function renderStage(){
  $("qstage").innerHTML="";
  questions.forEach((q,i)=>{
    const card=document.createElement("div");
    card.className="question-card";
    card.id="card"+i;

    card.innerHTML = `
      <div class='qtext'>${q.q}</div>
    `;

    const opts=document.createElement("div");
    opts.className="options";

    q.opts.forEach((o,j)=>{
      const letter=["A","B","C","D"][j];
      const opt=document.createElement("label");
      opt.className="option";
      opt.innerHTML = `<input type="radio" name="q${i}" value="${letter}"> <strong>${letter}.</strong> ${o}`;
      opt.addEventListener("click",()=>{
        document.querySelector(`input[name='q${i}'][value='${letter}']`).checked=true;
        userAnswers[i]=letter;
        $("answeredCount").innerText = Object.keys(userAnswers).length;
      });
      opts.appendChild(opt);
    });

    card.appendChild(opts);
    $("qstage").appendChild(card);
  });
}

function showQuestion(position){
  if(animating) return;
  animating=true;

  let prev=document.querySelector(".question-card.show");
  let newCard=$("card"+order[position]);
  if(!newCard){animating=false;return;}

  newCard.classList.add("show");
  newCard.style.zIndex="2";

  if(prev){
    prev.classList.remove("show");
    prev.style.opacity="0";
    setTimeout(()=>{prev.style.opacity="";},350);
  }

  cur=position;

  $("progressText").innerText = `Question ${cur+1} / ${questions.length}`;
  $("progressBar").style.width = (((cur)/questions.length)*100)+"%";

  animating=false;
  $("prevBtn").style.display = cur>0 ? "inline-block" : "none";
  $("nextBtn").innerText = cur<questions.length-1 ? "Next" : "Submit";

  const radios=document.getElementsByName("q"+order[cur]);
  for(const r of radios){r.checked = userAnswers[order[cur]]===r.value;}
}

$("nextBtn").addEventListener("click",()=>{
  if(cur<questions.length-1) showQuestion(cur+1);
  else submitTest();
});
$("prevBtn").addEventListener("click",()=>{
  if(cur>0) showQuestion(cur-1);
});

function submitTest(){
  if(timerInterval) clearInterval(timerInterval);

  let score=0;
  for(let i=0;i<questions.length;i++){
    if(userAnswers[i]===questions[i].answer) score++;
  }

  $("qstage").style.display="none";
  document.querySelector(".controls").style.display="none";
  $("result").style.display="block";
  $("timerText").style.display="none";
  document.querySelector(".progress-wrap").style.display="none";

  const name=$("username").value.trim();
  $("result").innerHTML = `${name}, your score is ${score}/${questions.length}`;
}
