// Get references to DOM elements
const startButton = document.getElementById('start-btn');
const resetButton = document.getElementById('reset-btn');
const timerDisplay = document.getElementById('timer-display');
const pomodoroCountDisplay = document.getElementById('pomodoro-count');
const breakTimeDisplay = document.getElementById('break-time-display');
const taskInput = document.getElementById('task-name');
const dailyProgressDisplay = document.getElementById('daily-progress');

let timer;
let isWorking = true; // True means work session, false means break
let pomodorosCompleted = 0;
let dailyPomodoros = 0;
let workTime = 25 * 60; // Default: 25 minutes (converted to seconds)
let breakTime = 5 * 60; // Default: 5 minutes (converted to seconds)

const workAudio = new Audio('work-end-sound.mp3'); // Add your own sound file
const breakAudio = new Audio('break-end-sound.mp3'); // Add your own sound file

// Function to format time into MM:SS format
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

// Function to update the timer display
function updateTimerDisplay() {
  if (isWorking) {
    timerDisplay.textContent = formatTime(workTime);
    breakTimeDisplay.textContent = formatTime(breakTime);
  } else {
    timerDisplay.textContent = formatTime(breakTime);
  }
}

// Function to handle the end of a session (work or break)
function handleSessionEnd() {
  if (isWorking) {
    pomodorosCompleted++;
    dailyPomodoros++;
    pomodoroCountDisplay.textContent = pomodorosCompleted;
    dailyProgressDisplay.textContent = dailyPomodoros;

    workAudio.play(); // Play work session end sound
    alert("Work session completed! Take a break.");
  } else {
    breakAudio.play(); // Play break session end sound
    alert("Break time over! Back to work.");
  }
}

// Function to start the timer
function startTimer() {
  workTime = parseInt(document.getElementById('work-time').value) * 60; // Work time from input (in seconds)
  breakTime = parseInt(document.getElementById('break-time').value) * 60; // Break time from input (in seconds)

  startButton.disabled = true;
  resetButton.disabled = false;

  timer = setInterval(() => {
    if (isWorking) {
      workTime--;
      if (workTime <= 0) {
        clearInterval(timer);
        handleSessionEnd();
        isWorking = false;
        workTime = parseInt(document.getElementById('work-time').value) * 60; // Reset work time
      }
    } else {
      breakTime--;
      if (breakTime <= 0) {
        clearInterval(timer);
        handleSessionEnd();
        isWorking = true;
        breakTime = parseInt(document.getElementById('break-time').value) * 60; // Reset break time
      }
    }
    updateTimerDisplay();
  }, 1000);
}

// Function to reset the timer
function resetTimer() {
  clearInterval(timer);
  isWorking = true;
  workTime = 25 * 60; // Default work time
  breakTime = 5 * 60; // Default break time
  pomodorosCompleted = 0;
  pomodoroCountDisplay.textContent = pomodorosCompleted;
  dailyPomodoros = 0;
  dailyProgressDisplay.textContent = dailyPomodoros;
  updateTimerDisplay();

  startButton.disabled = false;
  resetButton.disabled = true;
}

// Event listeners
startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);

// Initial display update
updateTimerDisplay();
