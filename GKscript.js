const questions = [
    {
        question:"How many hours are there in a day??",
        answers:[
            {text:"26",correct:false},
            {text:"24",correct:true},
            {text:"29",correct:false},
            {text:"48",correct:false},
        ]
    },
    {
        question:"What is the capital of Germany?",
        answers:[
            {text:"Delhi",correct:false},
            {text:"Rome",correct:false},
            {text:"Paris",correct:false},
            {text:"Berlin",correct:true},
        ]
    },
    {
        question:"Which planet is known as the \"Earth's Twin\"?",
        answers:[
            {text:"Mars",correct:false},
            {text:"Venus",correct:true},
            {text:"Earth",correct:false},
            {text:"Jupiter",correct:false},
        ]
    },
    {
        question:"What is the chemical symbol for gold?",
        answers:[
            {text:"Gd",correct:false},
            {text:"Go",correct:false},
            {text:"Au",correct:true},
            {text:"Ag",correct:false},
        ]
    },
    {
        question:"What is the largest organ in the human body?",
        answers:[
            {text:"Heart",correct:false},
            {text:"Liver",correct:false},
            {text:"Brain",correct:false},
            {text:"Skin",correct:true},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex=0;
let score = 0;

function startQuiz(){
    currentQuestionIndex=0;
    score = 0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}

startQuiz();    