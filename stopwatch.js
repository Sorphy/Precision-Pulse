const minutesLabel = document.getElementById('minutes');
const secondsLabel = document.getElementById('seconds');
const millisecondsLabel = document.getElementById('milliseconds');

const pulseButton = document.getElementById('start');
const terminateButton = document.getElementById('stop');
const suspendButton = document.getElementById('pause');
const resurgeButton = document.getElementById('reset');

const lapList = document.getElementById("laplist");

let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let interval;

pulseButton.addEventListener("click", startTimer);
terminateButton.addEventListener("click", stopTimer);
suspendButton.addEventListener("click", pauseTimer);
resurgeButton.addEventListener("click", resetTimer);

function startTimer() {
    interval = setInterval(updateTimer, 10);
    pulseButton.disabled = true;
}

function stopTimer() {
    clearInterval(interval);
    addToLapList();
    resetTimerData();
    pulseButton.disabled = false;
}

function pauseTimer() {
    clearInterval(interval);
    pulseButton.disabled = false;
}

function resetTimer() {
    clearInterval(interval);
    resetTimerData();
    pulseButton.disabled = false;
}

function updateTimer() {
    milliseconds++;
    if (milliseconds === 100) { // 1000 milliseconds => 1 second
        milliseconds = 0;
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
    }
    displayTimer();
}
function displayTimer() {
    millisecondsLabel.textContent = padTime(milliseconds);
    secondsLabel.textContent = padTime(seconds);
    minutesLabel.textContent = padTime(minutes);
}
function padTime(time) {
    return time.toString().padStart(2, '0');
}
function resetTimerData() {
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    displayTimer();
}
function addToLapList() {
    const lapTime = `${padTime(minutes)}:${padTime(seconds)}:${padTime(milliseconds)}`;

    const listItem = document.createElement('li');
    listItem.innerHTML = `<span>Lap ${lapList.childElementCount + 1}: </span>${lapTime}`;
    lapList.appendChild(listItem);
}