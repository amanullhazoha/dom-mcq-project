const data = [
    {
      "title": "What is the past form of 'eat'?",
      "options": ["eat", "ate", "eaten", "have ate"],
      "answer": "ate"
    },
    {
      "title": "Which sentence is present continuous tense?",
      "options": [
        "I eat rice",
        "I am eating rice",
        "I have eaten rice",
        "I have been eating rice for 1 year"
      ],
      "answer": "I am eating rice"
    },
    {
      "title": "Which sentence is present perfect tense?",
      "options": [
        "I eat rice",
        "I am eating rice",
        "I have eaten rice",
        "I have been eating rice for 1 year"
      ],
      "answer": "I have eaten rice"
    },
    {
      "title": "Which sentence is present perfect continuous tense?",
      "options": [
        "I eat rice",
        "I am eating rice",
        "I have eaten rice",
        "I have been eating rice for 1 year"
      ],
      "answer": "I have been eating rice for 1 year"
    },
    {
      "title": "Which sentence is past continuous tense?",
      "options": [
        "I eat rice",
        "I was eating rice",
        "I have eaten rice",
        "I have been eating rice for 1 year"
      ],
      "answer": "I was eating rice"
    },
    {
      "title": "Which sentence is past perfect tense?",
      "options": [
        "I eat rice",
        "I was eating rice",
        "I have eaten rice",
        "I have been eating rice for 1 year"
      ],
      "answer": "I have eaten rice"
    },
    {
      "title": "Which sentence is past perfect continuous tense?",
      "options": [
        "I eat rice",
        "I was eating rice",
        "I have eaten rice",
        "I have been eating rice for 1 year"
      ],
      "answer": "I have been eating rice for 1 year"
    },
    {
      "title": "Which sentence is future continuous tense?",
      "options": [
        "I eat rice",
        "I will be eating rice",
        "I have eaten rice",
        "I have been eating rice for 1 year"
      ],
      "answer": "I will be eating rice"
    },
    {
      "title": "Which sentence is future perfect tense?",
      "options": [
        "I eat rice",
        "I will be eating rice",
        "I will have eaten rice",
        "I have been eating rice for 1 year"
      ],
      "answer": "I will have eaten rice"
    },
    {
      "title": "Which sentence is future perfect continuous tense?",
      "options": [
        "I eat rice",
        "I will be eating rice",
        "I will have eaten rice",
        "I will have been eating rice for 1 year"
      ],
      "answer": "I will have been eating rice for 1 year"
    }
];

const time = data.length;
const homePage = document.querySelector("#home");
const mcqPage = document.querySelector("#mcq");
const questions = document.querySelector(".questions");
const timeoutPage = document.querySelector("#time-out");
const resultPage = document.querySelector("#result");
const hour = document.querySelector("#hour");
const min = document.querySelector("#min");
const sec = document.querySelector("#sec");
const totalQuestion = document.querySelector("#totalQuestion");
const answerTime = document.querySelector("#answerTime");
const resultSelector = document.querySelector("#resultPublish");

let result = 0;
let countdown = null;
let totalSec = 1000 * 60 * time;

totalQuestion.innerText = time;
answerTime.innerText = time;

const showTimer = (totalSec) => {
    const cvHour = Math.floor((totalSec % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const cvMin = Math.floor((totalSec % (1000 * 60 * 60)) / (1000 * 60));
    const cvSec = Math.floor((totalSec % (1000 * 60)) / 1000);

    cvHour > 9 ? hour.innerText = cvHour : hour.innerText = `0${cvHour}`;
    cvMin > 9 ? min.innerText = cvMin : min.innerText = `0${cvMin}`;
    cvSec > 9 ? sec.innerText = cvSec : sec.innerText = `0${cvSec}`;
}

const countDownInterval = (totalSec) => {
    countdown = setInterval(() => {
        totalSec -= 1000;
    
        showTimer(totalSec);
    
        if(totalSec === 0) {
            clearInterval(countdown);
            mcqPage.style.display = "none";
            timeoutPage.style.display = "flex";
        };
    }, 1000);
}

const handleStart = () => {
    allQuestion(data);
    showTimer(totalSec);
    countDownInterval(totalSec);

    homePage.style.display = "none";
    mcqPage.style.display = "flex";
}

const handleFinish = () => {
    clearInterval(countdown);

    totalSec = 1000 * 60 * time;
    showTimer(totalSec);

    mcqPage.style.display = "none";
    resultPage.style.display = "flex";
}

const handleAgain = () => {
    totalSec = 1000 * 60 * time;
    
    allQuestion(data);
    countDownInterval(totalSec);
    showTimer(totalSec);

    mcqPage.style.display = "flex";
    resultPage.style.display = "none";
    timeoutPage.style.display = "none";
}

const handleRadio = (event) => {
    const element = event.target;
    const parent = element.parentElement.parentElement;
    const selectItem = element.parentElement;

    const allInput = parent.querySelectorAll("input");
    const  rightAnswer = parent.querySelector("#rightAnswer").value;

    selectItem.style.background = "#B0B8FF";

    allInput.forEach(input => {
        if(element === input) {
            return element.setAttribute("checked", true);
        }

        input.disabled = true;
    });

    rightAnswer === element.value && result++;

    resultSelector.innerText = result;
}

function allQuestion(data) {
    let dom = ''

    const input = (options, index, answer) => {
        let showOptions = '';
        const optionArray = options.map(item => item.split(" ").join("_"));
        const convertAnswer = answer.split(" ").join("_");

        options.forEach((option, idx) => {
            showOptions += `<div class="radio">
                <input type="radio" id=${"radio"+ index + idx} name=${"radio"+ index} value=${optionArray[idx]} onchange="handleRadio(event)"/>
                <input type="hidden" id="rightAnswer" value=${convertAnswer} />
                <label for=${"radio"+ index + idx}>${option}</label>
            </div>`
        });

        return showOptions;
    }

    data.forEach((item, index) => {
        dom += `
        <div class="question">
            <h4><span style="margin-right: 5px">${index + 1}.</span>${item.title}</h4>
            <div class="input">
                ${input(item.options, index, item.answer)}
            </div>
        </div>
        `
    });

    questions.innerHTML = dom;
}

window.addEventListener("scroll", () => {
    if(window.scrollY > 50) {
        document.querySelector(".heading").classList.add("fixed");
    } else {
        document.querySelector(".heading").classList.remove("fixed");
    }
});