// JavaScript code for the breathwork app
// Initialize variables
var totalDuration = 300;  // Default duration in seconds (5 minutes)
var breathDuration = 6;   // Default breath cycle duration in seconds
var soundFiles = [
  "http://breathepgh.com/wp-content/uploads/2024/02/Gong1.wav",
  "http://breathepgh.com/wp-content/uploads/2024/02/Gong2.wav"
];
var volume = 1.0;
var timerInterval;
var startTime;

var animationElement = document.getElementById('breathingAnimation');

// Function to update the timer display
function updateTimer(elapsedTime) {
  var minutes = Math.floor(elapsedTime / 60);
  var seconds = elapsedTime % 60;
  document.getElementById('timer').innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

// Update the breathing animation
function playBreathingAnimation(inhale) {
  animationElement.innerText = inhale ? 'Breathe In' : 'Breathe Out';

  if (inhale) {
      animationElement.innerText = 'Breathe In';
      animationElement.classList.add('inhale');
      animationElement.classList.remove('exhale');
    } else {
      animationElement.innerText = 'Breathe Out';
      animationElement.classList.add('exhale');
      animationElement.classList.remove('inhale');
  };
};

// Function to handle breathwork timer logic
function breathworkTimerLogic() {
  // Update the timer
  var elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  updateTimer(elapsedTime);

  // Calculate breath cycle index
  var breathCycleIndex = Math.floor(elapsedTime / breathDuration) % 2;

  // Inhale/Exhale
  var isInhale = breathCycleIndex === 0;

  // Play the sound
  if (elapsedTime % breathDuration === 0) {
    var audio = new Audio(soundFiles[isInhale ? 1 : 0]);
    audio.volume = volume;
    audio.play();
  };

  // Update the breathing animation
  playBreathingAnimation(isInhale);

  // Check if the total duration has been reached
  if (elapsedTime >= totalDuration) {
    // Stop the timer
    stopTimer();
    document.getElementById('breathingAnimation').classList.remove('inhale');
    document.getElementById('breathingAnimation').classList.remove('exhale');
  };
};

// Event listener for the Start button
document.getElementById('startBtn').addEventListener('click', function () {
  // Disable the Start button and enable the Stop button
  document.getElementById('startBtn').disabled = true;
  document.getElementById('stopBtn').disabled = false;

  document.getElementById('breathingAnimation').classList.remove('exhale');
  document.getElementById('breathingAnimation').classList.add('inhale');

  // Get the selected duration and interval from the dropdowns
  totalDuration = parseInt(document.getElementById('duration-select').value) * 60;
  breathDuration = Math.round(parseFloat(document.getElementById('interval-select').value)); // Round to the nearest whole number

  // Initialize the start time
  startTime = Date.now();

  // Set up the timer interval for breathwork logic
  timerInterval = setInterval(breathworkTimerLogic, 1000); // Update every second
});

// Event listener for the Stop button
document.getElementById('stopBtn').addEventListener('click', function () {
  // Enable the Start button and disable the Stop button
  document.getElementById('startBtn').disabled = false;
  document.getElementById('stopBtn').disabled = true;

  // Clear breathing animation
  document.getElementById('breathingAnimation').classList.remove('inhale');
  document.getElementById('breathingAnimation').classList.remove('exhale');

  // Clear the timer interval
  clearInterval(timerInterval);

  // Reset the timer display
  document.getElementById('timer').innerText = '00:00';
  animationElement.innerText = 'Breathe In';
});
