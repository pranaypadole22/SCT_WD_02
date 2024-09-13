let timer;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
let lapCount = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

// Format time to MM:SS:MS
function formatTime(ms) {
  const date = new Date(ms);
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');
  const milliseconds = Math.floor(date.getUTCMilliseconds() / 10).toString().padStart(2, '0');
  return `${minutes}:${seconds}:${milliseconds}`;
}

// Function to change the border color dynamically using RGB
function changeColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const randomColor = `rgb(${r}, ${g}, ${b})`;
  display.style.borderColor = randomColor; // Change only the outline color
}

// Start/Stop functionality
startStopBtn.addEventListener('click', () => {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      display.textContent = formatTime(elapsedTime);
      
      // Change the color continuously as the stopwatch progresses
      changeColor();
    }, 100); // Reduced the interval to 100ms to show smooth color transitions
    
    startStopBtn.textContent = 'Stop';
    resetBtn.disabled = false;
    lapBtn.disabled = false;
    isRunning = true;
  } else {
    clearInterval(timer);
    startStopBtn.textContent = 'Start';
    isRunning = false;
  }
});

// Reset functionality
resetBtn.addEventListener('click', () => {
  clearInterval(timer);
  startStopBtn.textContent = 'Start';
  display.textContent = '00:00:00.00';
  elapsedTime = 0;
  isRunning = false;
  resetBtn.disabled = true;
  lapBtn.disabled = true;
  laps.innerHTML = '';
  lapCount = 0;
  display.style.borderColor = '#eeeeee'; // Reset the border to default color
});

// Lap functionality
lapBtn.addEventListener('click', () => {
  lapCount++;
  const lapTime = document.createElement('li');
  lapTime.textContent = `Lap ${lapCount}: ${formatTime(elapsedTime)}`;
  laps.appendChild(lapTime);
});
