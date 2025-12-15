const questions = [
    {
        question:"In which year, America joined the Second World War",
        answers:[
            {text:"1940",correct:false},
            {text:"1939",correct:false},
            {text:"1941",correct:true},
            {text:"None",correct:false},
        ]
    },
    {
        question:"Who was the first Governor General of India?",
        answers:[
            {text:"Lord William Bentick",correct:true},
            {text:"Lord Mountbatten",correct:false},
            {text:"Sir Phillips",correct:false},
            {text:"Warren Hasting",correct:false},
        ]
    },
    {
        question:"Who is considered the author of the ancient Indian treatise on statecraft and military strategy known as the \"Arthashastra\"?",
        answers:[
            {text:"Kautilya (Chanakya)",correct:true},
            {text:"Kalidasa",correct:false},
            {text:"Panini",correct:false},
            {text:"Valmiki",correct:false},
        ]
    },
    {
        question:"The first Viceroy of India was",
        answers:[
            {text:"Lord William Bentinck",correct:false},
            {text:"Lord Canning",correct:true},
            {text:"Lord Elgin",correct:false},
            {text:"Dalhousie",correct:false},
        ]
    },
    {
        question:"The revolt of 1857 had its beginning in",
        answers:[
            {text:"Plassey",correct:false},
            {text:"Madras",correct:false},
            {text:"Meerut",correct:true},
            {text:"Bombay",correct:false},
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