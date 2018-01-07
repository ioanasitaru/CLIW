// import {set_score, get_score} from "../../js/score.js";
// require("../../js/score.js");
const module_name = "Quiz";

const firstSet = [
    {
        question: "Select the Japanese translation for the English sentence: Good morning. ",
        answers: {
            a: "Ohayō gozaimasu",
            b: "Gomennasai",
            c: "O-yasumi nasai"
        },
        correctAnswer: "a"
    },
    {
        question: "Japanese culture: What is ikebana?",
        answers: {
            a: "A traditional dish.",
            b: "Art of flower arrangement.",
            c: "A building."
        },
        correctAnswer: "b"
    },
    {
        question: "Select the English translation for each Japanese sentence: Nante iimashita ka.",
        answers: {
            a: "I don't know what to say.",
            b: "What did you say?",
            c: "Did you say something?",
        },
        correctAnswer: "b"
    }
];

const secondSet = [
    {
        question: "Pick the Japanese word that matches the English word: Watashi wa nihongo ga [a little] shika hanasemasen.",
        answers: {
            a: "sukoshi",
            b: "motto",
            c: "yoku"
        },
        correctAnswer: "a"
    },
    {
        question: "Japanese culture: While having dinner at a restaurant with your Japanese friends your nose starts to run.",
        answers: {
            a: "Blow your nose on a tissue and throw it away.",
            b: "Sniff repeatedly.",
            c: "Excuse yourself, turn your head over your shoulder, blow your nose on a tissue and put it in your pocket."
        },
        correctAnswer: "b"
    },
    {
        question: "Select the English translation for each Japanese sentence: Nante iimashita ka.",
        answers: {
            a: "I don't know what to say.",
            b: "What did you say?",
            c: "Did you say something?",
        },
        correctAnswer: "b"
    }
];

const thirdSet = [
    {
        question: "Japanese culture: Many decisions/choices are made in Japan by",
        answers: {
            a: "Tossing a coin.",
            b: "Women get first choice.",
            c: "Rock, paper, scissors. "
        },
        correctAnswer: "c"
    },
    {
        question: "Check the numeral that matches the Japanese word: sanjū",
        answers: {
            a: "300",
            b: "30",
            c: "3"
        },
        correctAnswer: "b"
    },
    {
        question: "Christmas in Japan...",
        answers: {
            a: "Although most Japanese people are not Christians it is customary to go to church on Christmas eve.",
            b: "Is mostly celebrated by sweethearts going on romantic dates. ",
            c: "Is not well known as there are few Christians in Japan. ",
        },
        correctAnswer: "b"
    }
];

var allSets = [firstSet, secondSet, thirdSet];

var chosenSet = allSets[Math.floor(Math.random() * allSets.length)];


function buildQuiz() {

    const output = [];

    chosenSet.forEach((currentQuestion, questionNumber) => {

        const answers = [];

        for (let letter in currentQuestion.answers) {
            answers.push(
                `<label>
                 <input type="radio" name="question${questionNumber}" value="${letter}">
                  ${letter} :
                  ${currentQuestion.answers[letter]}
               </label>`
            );
        }

        output.push(
            `<div class="slide">
               <div class="question"> ${currentQuestion.question} </div>
               <div class="answers"> ${answers.join("")} </div>
             </div>`
        );
    })
    ;

    quizContainer.innerHTML = output.join("");
}

function showResults() {

    const answerContainers = quizContainer.querySelectorAll(".answers");

    let numCorrect = 0;

    chosenSet.forEach((currentQuestion, questionNumber) => {

        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        if (userAnswer === currentQuestion.correctAnswer) {

            numCorrect++;

            answerContainers[questionNumber].style.color = "lightgreen";
        } else {

            answerContainers[questionNumber].style.color = "red";
        }
    })
    ;

    set_score(module_name, numCorrect * 10);

    resultsContainer.innerHTML = ` You have answered ${numCorrect} out of ${chosenSet.length} questions correctly. You've earned ${numCorrect * 10} points. `;
}

function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;

    if (currentSlide === 0) {
        previousButton.style.display = "none";
    } else {
        previousButton.style.display = "inline-block";
    }

    if (currentSlide === slides.length - 1) {
        nextButton.style.display = "none";
        submitButton.style.display = "inline-block";
    } else {
        nextButton.style.display = "inline-block";
        submitButton.style.display = "none";
    }
}

function showNextSlide() {
    showSlide(currentSlide + 1);
}

function showPreviousSlide() {
    showSlide(currentSlide - 1);
}