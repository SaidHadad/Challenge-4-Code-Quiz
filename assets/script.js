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

//Questions
var answer1 = document.getElementById("button1");
var answer2 = document.getElementById("button2");
var answer3 = document.getElementById("button3");
var answer4 = document.getElementById("button4");
var question = document.getElementById("cardtext");
var veracityP = document.getElementById("veracity");
var runningQuestion = 0;

// timer
var time = document.getElementById("timer");
var hst = document.getElementById("highscores");
var timeleft = 50;
//game start
var startButton = document.getElementById("start");
var cardQuestions = document.getElementById("questionCards")
var questioncards = document.getElementsByClassName("questioncards");
document.querySelector('.questionsContainer').classList.add("disable_a_href");

function startGame(){
    if (timeleft != 50)
    {
        timeleft = 50;
        console.log("replay");
        startButton.value = "Start"
        window.location.reload();
    }
    else {    
        setTime();
        questionnaire();
        document.querySelector('.questionsContainer').classList.remove("disable_a_href");
        console.log("we did it");
    }
}

// timer function 
function setTime(){
    var timerInterval = setInterval(function() {
        timeleft--;
        time.textContent = "Time: " + timeleft;
        if(timeleft === 0){
            clearInterval(timerInterval);
            window.alert("You lost the game :(")

        }
        else if (runningQuestion === 7) {
            clearInterval(timerInterval);
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
                runningQuestion = 0;
                question = 0;
                startButton.value = "Try Again";
            }
        }
    }, 1000)
}

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
console.log(answerBtn);
for (var i = 0; i < answerBtn.length; i++) {
    answerBtn[i].addEventListener("click", function userAnswer(event) {
        event.stopPropagation();
        if (event.currentTarget.innerText === questions[runningQuestion].correct){
        veracityP.textContent = "Correct + 5 sec";
        veracityP.setAttribute("style", "color: black", "font-size: 1.5em");
        timeleft = timeleft + 5;
        console.log("correct");
    } else {
        veracityP.textContent = "Incorrect - 5 sec";
        veracityP.setAttribute("style", "color: red", "font-size: 1.5em");
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

// function to print the highscores (work in progress)
function printHighScore() {
    console.log('im in');
    highscores = scoresSorted(highscores, 'score');
    for (var i = 0; i < highscores.length; i++) {
        console.log(highscores[i].timeleft);
        var home = document.createElement("li"); 
        var words = document.createTextNode(highscores[i].initials + ": " + highscores[i].timeleft);
        home.appendChild(words);
        highScorePrint.appendChild(home);
    }
}

// function to sort the scores 
function scoresSorted(array, key) {
    return array.sort(function(a,b) {
    if (a.timeleft < b.timeleft) {
        return 1;
    }
    return -1;
    });
}

// clear button 
clearHighScore.addEventListener("click", function() {
    console.log("reset")
    localStorage.removeItem("highscores");
    window.location.reload();
});

// start the game
startButton.addEventListener("click", startGame);

