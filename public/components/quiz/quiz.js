const module_name = "quiz";

let score = 0;

let totalAnswers = 0;

let chosenSet = [];

let answers = [];

let slides = [];

let currentSlide = 0;

const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");

let scoreObj = new Score(module_name);
scoreObj.initScore();

let dataService = new DataService();

const questions = [
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
            c: "Did you say something?"
        },
        correctAnswer: "b"
    },
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
            c: "Is not well known as there are few Christians in Japan. "
        },
        correctAnswer: "b"
    }
];


function buildQuiz() {

    chosenSet = [];

    nextQuizButton.style.display = "none";

    chosenSet.push(questions[Math.floor(Math.random() * questions.length)]);
    chosenSet.push(questions[Math.floor(Math.random() * questions.length)]);


    const word = dataService.getRandomWord();

    // const shuffled = array.sort(() => .5 - Math.random());// shuffle  
    // let selected =shuffled.slice(0,n) ; //get sub-array of first n elements AFTER shuffle

    let translatedWord;
    dataService.translateText(word, translation => {
        translatedWord = translation;

        // console.log(translatedWord);

        let translationQuestion;
        translationQuestion = {
            question: 'Choose the right translation for: ' + translatedWord,
            answers: {
                a: dataService.getRandomWord(),
                b: dataService.getRandomWord(),
                c: word
            },
            correctAnswer: "c"
        };

        // console.log(translationQuestion);

        chosenSet.push(translationQuestion);

        // console.log(chosenSet);

        const output = [];

        chosenSet.forEach((currentQuestion, questionNumber) => {
            // console.log(currentQuestion);
            answers = [];
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
        // console.log(output);
        quizContainer.innerHTML = output.join("");

        score = 0;

        currentSlide = 0;
        slides = document.querySelectorAll(".slide");

        showSlide(0);

        resultsContainer.innerHTML = " ";

        submitButton.addEventListener("click", showResults);
        previousButton.addEventListener("click", showPreviousSlide);
        nextButton.addEventListener("click", showNextSlide);
        nextQuizButton.addEventListener("click", buildQuiz);
    });
}

function showResults() {

    const answerContainers = quizContainer.querySelectorAll(".answers");

    let numCorrect = 0;

    chosenSet.forEach((currentQuestion, questionNumber) => {

        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        totalAnswers++;
        if (userAnswer === currentQuestion.correctAnswer) {

            numCorrect++;
            score++;
            answerContainers[questionNumber].style.color = "lightgreen";

        } else {

            answerContainers[questionNumber].style.color = "red";
        }
    });

    submitButton.style.display = "none";
    nextQuizButton.style.display = "inline-block";

    scoreObj.updateScore(score);

    resultsContainer.innerHTML = ` You have answered ${numCorrect} out of ${chosenSet.length} questions correctly. You've earned ${score} points. `;
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