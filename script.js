const timerDisplay = document.getElementById("timer");
const statusDisplay = document.getElementById("status");
const cyclesDisplay = document.getElementById("cycles");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

let workDuration = 0.2 * 60; // seconds
let breakTime = 0.1 * 60;
let isWorkTime = true;
let timeLeft = workDuration;
let timer = null;
let completedCycles = 0;

function updateTimerDisplay() {
    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0")
    const seconds = String(timeLeft % 60).padStart(2, "0")
    
    timerDisplay.textContent = `${minutes}:${seconds}`;
}

function updateCycleDisplay() {
    cyclesDisplay.textContent = `Cycles completed: ${completedCycles}`;
}

function toggleStatus() {
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? workDuration : breakTime;
    statusDisplay.textContent = isWorkTime ? "Focus Time" : "Break Time";

}

function startTimer() {
    if (timer !== null) {
        return;
    }

    timer = setInterval(() =>{
        if (timeLeft > 0){
            timeLeft--;
            updateTimerDisplay();
        } else {
            clearInterval(timer);
            timer = null;
            if (isWorkTime) {
                completedCycles++;
                updateCycleDisplay();
            }
            toggleStatus();
            updateTimerDisplay();
        }
    }, 1000)
}

function pauseTimer() {
    clearInterval(timer);
    timer = null;
} 


function resetTimer() {
    pauseTimer();
    isWorkTime = true;
    completedCycles = 0;
    timeLeft = workDuration;
    statusDisplay.textContent = "Focus Time";
    updateTimerDisplay();
    updateCycleDisplay();
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
