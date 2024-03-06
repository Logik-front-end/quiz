let startButton = document.getElementById('startButton');
let quizHeading = document.getElementById('quizHeading');
let questionField = document.querySelector('.question');
let answerButtons = document.querySelectorAll('.answer');
let scoreField = document.getElementById('score');
let timer = document.getElementById('timer');
let timeLeftDisplay = document.getElementById('timeLeft');
let restartButton = document.createElement('button');
let quizScreen = document.querySelector(".quiz")
let endScreen = document.querySelector(".end")
let endtext = document.querySelector(".end span")
let endRestartBtn = document.querySelector(".end button")

restartButton.innerHTML = "Restart Quiz";
restartButton.style.display = "none";

let questions = [
	{ question: "23 - 7", correct: "16", answers: ["6", "2", "10", "3", "16"] },
	{ question: "2 + 2", correct: "4", answers: ["6", "2", "10", "3", "4"] },
	{ question: "2 + 3", correct: "5", answers: ["6", "4", "10", "3", "5"] },
	{ question: "3 + 5", correct: "8", answers: ["6", "4", "10", "3", "8"] },
	{ question: "10 * 2", correct: "20", answers: ["15", "25", "20", "30", "18"] },
	{ question: "12 / 3", correct: "4", answers: ["3", "2", "5", "4", "6"] },
	{ question: "7 + 9", correct: "16", answers: ["13", "14", "16", "18", "20"] },
	{ question: "5 - 3", correct: "2", answers: ["1", "2", "4", "3", "5"] },
];

let totalAnswersGiven = 0;
let correctAnswers = 0;
let currentQuestion;
let timerInterval;

startButton.addEventListener('click', startQuiz);

function startQuiz() {
	startButton.style.display = "none";
	endScreen.style.display = "none"
	quizScreen.style.display = "block"
	quizHeading.style.display = "block";
	questionField.style.display = "block";
	document.querySelector('.answers').style.display = "flex";
	timer.style.display = "block";
	displayQuestion();
}

function displayQuestion() {
	currentQuestion = questions[Math.floor(Math.random() * questions.length)];
	questionField.innerHTML = currentQuestion.question;

	let shuffledAnswers = currentQuestion.answers.sort(() => Math.random() - 0.5);

	for (let i = 0; i < answerButtons.length; i++) {
		answerButtons[i].innerHTML = shuffledAnswers[i];
		answerButtons[i].style.backgroundColor = "white";
		answerButtons[i].disabled = false;
	}

	startTimer();
}

function startTimer() {
	let timeLeft = 15;

	timerInterval = setInterval(function () {
		timeLeftDisplay.innerHTML = timeLeft;

		if (timeLeft <= 0) {
			clearInterval(timerInterval);
			handleTimeout();
		}

		timeLeft--;
	}, 1000);
}

function handleTimeout() {
	totalAnswersGiven++;
	console.log("Incorrect");
	displayNextQuestion();
}

function displayNextQuestion() {
	clearInterval(timerInterval);

	if (totalAnswersGiven < questions.length) {
		displayQuestion();
	} else {
		quizScreen.style.display = "none"

		timer.style.display = "none";

		let percentage = (correctAnswers / questions.length) * 100;

		endScreen.style.display = "block"
		endtext.innerHTML = percentage.toFixed(2)
	}
}

restartButton.addEventListener('click', function () {
	totalAnswersGiven = 0;
	correctAnswers = 0;
	restartButton.style.display = "none";
	startQuiz();
});

for (let i = 0; i < answerButtons.length; i++) {
	answerButtons[i].addEventListener('click', function () {
		if (answerButtons[i].innerHTML == currentQuestion.correct) {
			answerButtons[i].style.backgroundColor = "lightgreen";
			correctAnswers++;
			console.log("Correct");
		} else {
			answerButtons[i].style.backgroundColor = "lightcoral";
			console.log("Incorrect");
		}

		setTimeout(() => {
			totalAnswersGiven++;
			displayNextQuestion();
		}, 1000);

		for (let j = 0; j < answerButtons.length; j++) {
			answerButtons[j].disabled = true;
		}
	});
}

endRestartBtn.addEventListener("click", function () {
	totalAnswersGiven = 0;
	correctAnswers = 0;
	startQuiz()
})