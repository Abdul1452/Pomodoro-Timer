const timerDisplay = document.getElementById("timer");

let workDuration = 25 * 60;
let timeLeft = workDuration;
let timer = null;

function updateTmerDisplay () {
    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0")
    const seconds = String(timeLeft % 60).padStart(2, "0")
    
    timerDisplay.textContent = `${minutes}:${seconds}`;
}

function  startTimer() {
    timer = setInterval(() =>{
        if (timeLeft > 0){
            timer--;
            updateTmerDisplay();
        } else {
            clearInterval(timer);
            timer = null;
            updateTmerDisplay();
            startTimer();
        }
    }, 1000)
}

startTimer();
