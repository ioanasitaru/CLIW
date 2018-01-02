const myQuestions = [
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
        question: "Check the numeral that matches the Japanese word: sanjū",
        answers: {
            a: "300",
            b: "30",
            c: "3"
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

function buildQuiz() {

    const output = [];

    myQuestions.forEach((currentQuestion, questionNumber) => {

        const answers = [];

        for (letter in currentQuestion.answers) {
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

    myQuestions.forEach((currentQuestion, questionNumber) => {

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

    resultsContainer.innerHTML = ` You have answered ${numCorrect} out of ${myQuestions.length} questions correctlys. You've earned ${numCorrect * 10} points. `;
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