var questions = [{
    question: "0 + 1",
    answer1: "10",
    answer2: "1",
    answer3: "2",
    answer4: "5",
    correct: "1"
},{
    question: "Add 1",
    answer1: "1",
    answer2: "3",
    answer3: "2",
    answer4: "4",
    correct: "2"
},{
    question: "Multiply by 3",
    answer1: "9",
    answer2: "3",
    answer3: "12",
    answer4: "6",
    correct: "6"
},{
    question: "Add 8",
    answer1: "14",
    answer2: "13",
    answer3: "16",
    answer4: "20",
    correct: "14"
},{
    question: "Multiply by 2",
    answer1: "32",
    answer2: "28",
    answer3: "40",
    answer4: "26",
    correct: "28"
},{
    question: "Divide by 7",
    answer1: "5",
    answer2: "2",
    answer3: "4",
    answer4: "3",
    correct: "4"
},{
    question: "Square it!",
    answer1: "25",
    answer2: "9",
    answer3: "2",
    answer4: "16",
    correct: "16"
}];
var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
var highScorePrint = document.querySelector(".scoresHTML");
var clearHighScore = document.getElementById("reset");

// timer
var time = document.getElementById("timer");
var hst = document.getElementById("highscores");
var timeleft = 50;

function setTime(){
    var timerInterval = setInterval(function() {
        timeleft--;
        console.log(timeleft);
        time.textContent = "Time: " + timeleft;
        if(timeleft === 0){
            clearInterval(timerInterval);
            window.alert("You lost the game :(")
        }
        else if (runningQuestion === 7) {
            clearInterval(timerInterval);
            console.log(timeleft);
            var initials = window.prompt("Your score is: " + timeleft + ". Please add your initials to submit your score." );
            if (initials) {
                // event.stopPropagation();
                console.log("click");
                var finalScore = {initials, timeleft};
                console.log("Final Score: " + finalScore);
                console.log(initials + " your score is: " + timeleft); 
                // Send to localStorage
                highscores.push(finalScore);
                localStorage.setItem("highscores", JSON.stringify(highscores));
                printHighScore();
                timeleft = 50;
                runningQuestion = 0;
                question = 0;
            }
        }
    }, 1000)
}

// start the game
var startButton = document.getElementById("start");
var cardQuestions = document.getElementById("questionCards")
var questioncards = document.getElementsByClassName("questioncards");
startButton.addEventListener("click", startGame);

function startGame(){
        setTime();
        questionnaire();
        console.log("we did it");
}

//Questions
var answer1 = document.getElementById("button1");
var answer2 = document.getElementById("button2");
var answer3 = document.getElementById("button3");
var answer4 = document.getElementById("button4");
var question = document.getElementById("cardtext");
var rightAnswer = document.getElementById("veracity");
var incorrectAnswer = document.getElementById("veracity");
var runningQuestion = 0;

// call the questions to the cards
function questionnaire(){
    var quest = questions[runningQuestion];
    question.textContent = quest.question;
    answer1.textContent = quest.answer1;
    answer2.textContent = quest.answer2;
    answer3.textContent = quest.answer3;
    answer4.textContent = quest.answer4;
}

var answerBtn = document.querySelectorAll(".answerBtn");

for (var i = 0; i < answerBtn.length; i++) {
    answerBtn[i].addEventListener("click", function userAnswer(event) {
        event.stopPropagation();
        if (event.currentTarget.innerText === questions[runningQuestion].correct){
        rightAnswer.textContent = "Correct + 5 sec";
        rightAnswer.setAttribute("style", "color: black", "font-size: 1.5em");
        timeleft = timeleft + 5;
        console.log("correct");
    } else {
        incorrectAnswer.textContent = "Incorrect - 5 sec";
        incorrectAnswer.setAttribute("style", "color: red", "font-size: 1.5em");
        timeleft = timeleft - 5;
        console.log("Incorrect minus 5 seconds");
    }
    console.log(runningQuestion);
    runningQuestion++;
    if (runningQuestion < 7) {
        questionnaire();
    }
});
}

function printHighScore() {
    console.log('im in');
    highscores = scoresSorted(highscores, 'score');
    for (var i = 0; i < highscores.length; i++) {
        console.log(highscores[i].timeleft);
        var home = document.createElement("li"); 
        var words = document.createTextNode(highscores[i].initials + ": " + highscores[i].timeleft)  ; //content of p
        home.appendChild(words);
        highScorePrint.appendChild(home);
    }
}

function scoresSorted(array, key) {
    return array.sort(function(a,b) {
    if (a.timeleft < b.timeleft) {
        return 1;
    }
    return -1;
    });
}

clearHighScore.addEventListener("click", function() {
    console.log("reset")
    localStorage.removeItem("highscores");
    window.location.reload();
});

