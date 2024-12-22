// Get references to DOM elements
const startButton = document.getElementById('start-btn');
const resetButton = document.getElementById('reset-btn');
const timerDisplay = document.getElementById('timer-display');
const pomodoroCountDisplay = document.getElementById('pomodoro-count');
const breakTimeDisplay = document.getElementById('break-time');

let timer;
let isWorking = true; // True means work session, false means break
let pomodorosCompleted = 0;
let timeRemaining = 1500; // Start with 25 minutes (25 * 60)
let breakTime = 300; // Start with 5 minutes for break (5 * 60)

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secondsLeft = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(secondsLeft).padStart(2, '0')}`;
}

function updateTimerDisplay() {
  if (isWorking) {
    timerDisplay.textContent = formatTime(timeRemaining);
    breakTimeDisplay.textContent = formatTime(breakTime);
  } else {
    timerDisplay.textContent = formatTime(breakTime);
  }
}

function startTimer() {
  startButton.disabled = true;
  resetButton.disabled = false;
  timer = setInterval(() => {
    if (isWorking) {
      timeRemaining--;
      if (timeRemaining <= 0) {
        clearInterval(timer);
        pomodorosCompleted++;
        pomodoroCountDisplay.textContent = pomodorosCompleted;
        isWorking = false;
        timeRemaining = breakTime;
        alert("Work session completed! Take a break.");
      }
    } else {
      breakTime--;
      if (breakTime <= 0) {
        clearInterval(timer);
        isWorking = true;
        breakTime = 300; // Reset to 5-minute break
        timeRemaining = 1500; // Reset to 25-minute work session
        alert("Break time over! Back to work.");
      }
    }
    updateTimerDisplay();
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  isWorking = true;
  timeRemaining = 1500;
  breakTime = 300;
  pomodorosCompleted = 0;
  pomodoroCountDisplay.textContent = pomodorosCompleted;
  updateTimerDisplay();
  startButton.disabled = false;
  resetButton.disabled = true;
}

// Event listeners
startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);

// Initial timer display update
updateTimerDisplay();
