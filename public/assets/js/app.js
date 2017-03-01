
// *******************************************************************
// State
// *******************************************************************
let currentTimer = 35999600;
let interval;
let isRunning = false;

// *******************************************************************
// Control
// *******************************************************************
function runTimer() {
  // if (isRunning) { return; }
  console.log('started');
  // isRunning = true;
  currentTimer++;
  showTimer(currentTimer);
  window.requestAnimationFrame(runTimer);

  //
  // interval = setInterval(() => {
  //   currentTimer++;
  //   showTimer(currentTimer);
  // }, 10);
}

// function handleUpdate() {
//   currentTimer++;
//   showTimer(currentTimer);
// }

function stopTimer() {
  if (!isRunning) { return; }
  clearInterval(interval);
  // console.log('pause');
}

function resetTimer() {
  if (!isRunning) { return; }
  isRunning = false;
  stopTimer();
  currentTimer = 0;
  showTimer(currentTimer);
}



// *******************************************************************
// View
// *******************************************************************
const displayDOM = document.querySelector('.display__time');

function addEventListeners() {
  const startDOM = document.querySelector('.controls__btn--start');
  const pauseDOM = document.querySelector('.controls__btn--pause');
  const resetDOM = document.querySelector('.controls__btn--reset');

  startDOM.addEventListener('click', runTimer);
  pauseDOM.addEventListener('click', stopTimer);
  resetDOM.addEventListener('click', resetTimer);
}


function showTimer(centiSeconds) {
  displayDOM.textContent = formatDisplay(centiSeconds);
}


function formatDisplay(centiSeconds) {
  const centiSec = centiSeconds % 100;
  const sec  = Math.floor((centiSeconds / 100) % 60);
  const min  = Math.floor((centiSeconds / (100 * 60)) % 60);
  const hour = Math.floor((centiSeconds / (100 * 60 * 60)) % 100);
  return `${padWithZero(hour)}:${padWithZero(min)}:${padWithZero(sec)}:${padWithZero(centiSec)}`;
}


function padWithZero(n) {
  return n < 10 ? `0${n}` : n;
}

addEventListeners();


// module.exports = {
//   sum,
//   multiply,
//   addOneAsyncWithCallback
// };
