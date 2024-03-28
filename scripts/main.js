
const playSpace = document.getElementById("playSpace");
const startBtn = document.getElementById("startBtn");
var printScore = document.getElementById("score");
var printHighScore = document.getElementById("highScore");

var bombArray = [];
var j = 0;
var randNum = Math.floor(Math.random() * 24);
var randBomb = bombArray[randNum];
var score = 0;
var highScore = 0;

for (i = 0; i < 25; i++) {
    const bombImg = document.createElement("IMG");
    bombImg.src = 'images/bomb.png';
    bombImg.classList.add("bomb");
    playSpace.append(bombImg);
    bombImg.classList.add('bomb' + j++);
    bombArray.push(bombImg);
}

function startGame() {
    var randNum = Math.floor(Math.random() * 24);
    var randBomb = bombArray[randNum];
    randBomb.src = 'images/bombfused.png';
    randBomb.setAttribute('id', 'fusedBomb');
}

function resetGame() {
    bombArray.forEach(bomb => {
        bomb.src = 'images/bomb.png';
        bomb.removeAttribute('id');
    })
}

//Starts Countdown to game start
startBtn.addEventListener("click", (e) => {

    //Start Button Disable 
    startBtn.disabled = true;
    startBtn.classList.add("activestart");

    //Start Timer
    const timer = document.getElementById("timer");
    timer.innerHTML = '3';
    setTimeout((e) => {timer.innerHTML = '2';}, 1000)
    setTimeout((e) => {timer.innerHTML = '1';}, 2000)

    //Starts Game
    setTimeout((e) => {
        timer.innerHTML = '0';

        startGame();

        //Adds eventlisteners for every bomb and keeps track of score

        //FIND A WAY TO REMOVE THE EVENTLISTENER
        bombArray.forEach((bomb) => {
            bomb.addEventListener("click", (e) => {
                if(bomb.getAttribute('id') === 'fusedBomb') {
                    printScore.innerHTML = ++score;
                    resetGame();
                    startGame();
                }
                else {
                    printScore.innerHTML = --score;
                }
            })
        })
    }, 3000)

    //10 Second Timer and Start Button Enable
    setTimeout((e) => {
        var timerUpdate = 10;
        const timerInterval = setInterval(tenSecTimer, 1000);
        function tenSecTimer() {
            timerUpdate--;
            timer.innerHTML = timerUpdate;
            if (timerUpdate === 0) {
                clearInterval(timerInterval);
            }
        }

        //Ends and Resets Game
        setTimeout((e) => {
            startBtn.disabled = false;
            startBtn.classList.remove("activestart");

            resetGame();

            printScore.innerHTML = 0;
            
            if (score > highScore) {
                highScore = score;
                printHighScore.innerHTML = highScore;
            }

            console.log(score)
            console.log(highScore)

            score = 0;

        }, 10000)

    }, 3000)

})
