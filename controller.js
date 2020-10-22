class Question{
    
    constructor(text, options, answer){
        this.text = text;
        this.options=options;
        this.answer=answer;
    }
    
    iscorrectAnswer(choice){
        return this.answer === choice;
    }
}

class Quiz{

    constructor(question){
        this.failed =0;
        this.score = 0;
        this.questionIndex = 0;
        this.question=question;
    }
    
    getQuestionIndex(){
        return this.question[this.questionIndex];
    }
    
    isEnded(){
        return this.questionIndex === this.question.length;
    }
    
    check(answer){
        if(this.getQuestionIndex().iscorrectAnswer(answer)){
            this.score++;
        }else{
            this.failed++;
            alert("Wrong Answer");
        }
        this.questionIndex++;
    }
}

let display = () => {
    if (quiz.isEnded()) {
        showScores();
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
}

guess = (id, guess) => {
    let button = document.getElementById(id);
    button.onclick = () => {
        quiz.check(guess);
        display();
    }
}

showProgress = () => {
    let currentQuestionIndex = quiz.questionIndex + 1;
    let element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionIndex + " of " + quiz.question.length;
}

showScores = () => {
    let compute = "<h1>Result</h1>";
    compute += "<h2 id='score'> You scored: " + quiz.score + "/" + quiz.question.length + "</h2>";
    compute += "<h2 id='failed'> Failed: " + quiz.failed + "</h2>";
    quiz.failed<2 ? compute += "<h2 id='congrat'> Congratulation You Made it! </h2>" : compute += "<h2 id='congrat'> Please Try Again... </h2>"
    let element = document.getElementById("quiz");
    element.innerHTML = compute;
    notifyMe();
}

let questions = [
    new Question("How Many States are there in Nigeria?", [12, 34, 45, 36], 36),
    new Question("Who is the current Nigeria Dummy President?", ["Buhari", "Dangote", "David Mark", "Sunny"], "Buhari"),
    new Question("Who Killed Goliath?", ["David", "Samuel", "King Saul", "Jonathan"], "David"),
    new Question("Which is a more robust backend framework?", ["PHP", "Node.js/JS", "ASP.NET", "Clojure"], "Node.js/JS"),
    new Question("What are Sunny's Skill-Set?", ["Web Design", "Embedded System", "IoT", "All"], "All"),
    new Question("How Many confirmed death in Lagos Genocide", [12, 56, 67, "Unknown"], "Unknown")
];

let quiz = new Quiz(questions);

function notifyMe(){

    if(!('Notification' in window)){
        alert("This browser does not support sysem notification");
    }else if(Notification.permission === "granted"){
        notify();
    }else if(Notification.permission !== 'denied'){
        Notification.requestPermission(function(permision){
            if(permision === 'granted'){
                notify();
            }
        });
    }   

    function notify(){

        var notification = new Notification('TITLE OF NOTIFICATION', {
            icon: "http:///some_avatar.jpg",
            body: "You are in our notice List"
        });

        notification.onclick = function(){
            window.open("https://hallmarkitsolutions.com");
        };
        setTimeout(notification.close.bind(notification), 10000);
    }
}

display();