
function Question(text, options, correctAnswer) {
    this.text = text;
    this.options = options;
    this.correctAnswer = correctAnswer;
}

Question.prototype.isCorrectAnswer = function (choice) {
    return this.correctAnswer === choice;
}


function Quiz(askQuestions) {
    this.score = 0;
    this.failed = 0;
    this.questions = askQuestions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function () {
    return this.questions[this.questionIndex];
}

Quiz.prototype.hasQuestionEnded = function () {
    return this.questionIndex === this.questions.length;
}

Quiz.prototype.check = function (correctAnswer) {
    if (this.getQuestionIndex().isCorrectAnswer(correctAnswer)) {
        this.score++;
        alert("Correct Answer");
    } else {
        alert("Wrong Answer");
        this.failed++;
    }
    this.questionIndex++;
}

display = () => {
    if (quiz.hasQuestionEnded()) {
        showResult();
    }
    else {
        let showQuestions = document.getElementById("question");
        showQuestions.innerHTML = quiz.getQuestionIndex().text;

        let options = quiz.getQuestionIndex().options;
        for (var i = 0; i < options.length; i++) {
            let choiceElements = document.getElementById("option" + i);
            choiceElements.innerHTML = options[i];
            guess("btn" + i, options[i]);
        }
        showProgress();
    }
};

guess = (id, guess) => {
    let button = document.getElementById(id);
    button.onclick = () => {
        quiz.check(guess);
        display();
    }
};

showProgress = () => {
    let currentQuestionIndex = quiz.questionIndex + 1;
    let element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionIndex + " of " + quiz.questions.length;
};

showResult = () => {
    let compute = "<h1>Result</h1>";
    compute += "<h2 id='score'> You scored: " + quiz.score + "/" + quiz.questions.length + "</h2>";
    compute += "<h2 id='failed'> Failed: " + quiz.failed + "</h2>";
    quiz.failed<2 ? compute += "<h2 id='congrat'> Congratulation You Made it! </h2>" : compute += "<h2 id='congrat'> Please Try Again... </h2>"
    let element = document.getElementById("quiz");
    element.innerHTML = compute;
};

let questions = [
    new Question("How Many States are there in Nigeria?", [12, 34, 45, 36], 36),
    new Question("Who is the current Nigeria Dummy President?", ["Buhari", "Dangote", "David Mark", "Sunny"], "Buhari"),
    new Question("Who Killed Goliath?", ["David", "Samuel", "King Saul", "Jonathan"], "David"),
    new Question("Which is a more robust backend framework?", ["PHP", "Node.js/JS", "ASP.NET", "Clojure"], "Node.js/JS"),
    new Question("What are Sunny's Skill-Set?", ["Web Design", "Embedded System", "IoT", "All"], "All")
];

let quiz = new Quiz(questions);

display();