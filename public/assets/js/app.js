
// *******************************************************************
// State
// *******************************************************************
let isRunning = false;
let animationRequestId;
let startTime = 0;
let passedTime = 0;


// *******************************************************************
// Control
// *******************************************************************
function startTimer() {
  if (isRunning) { return; }
  isRunning = true;
  startTime = getCurrentMs() - passedTime;
  runTimer();
}


function runTimer() {
  passedTime = getCurrentMs() - startTime;
  showTimer(passedTime);
  animationRequestId = window.requestAnimationFrame(runTimer);
}


function stopTimer() {
  if (!isRunning) { return; }
  isRunning = false;
  window.cancelAnimationFrame(animationRequestId);
  animationRequestId = undefined;
}


function resetTimer() {
  if (!isRunning) { return; }
  stopTimer();
  passedTime = 0;
  startTime = 0;
  showTimer(startTime);
}


function getCurrentMs() {
  return Date.now();
}



// *******************************************************************
// View
// *******************************************************************
(function addEventListeners() {
  const startDOM = document.querySelector('.controls__btn--start');
  const pauseDOM = document.querySelector('.controls__btn--pause');
  const resetDOM = document.querySelector('.controls__btn--reset');

  const controlsDOM = document.querySelector('.controls');

  startDOM.addEventListener('click', startTimer);
  pauseDOM.addEventListener('click', stopTimer);
  resetDOM.addEventListener('click', resetTimer);

  ['focusin', 'focusout', 'mouseover'].forEach(event => {
    if (event === 'mouseover') {
      controlsDOM.addEventListener(event, removeEvent, { once: true });
    } else {
      controlsDOM.addEventListener(event, handleFocus);
    }
  });
}());


function handleFocus(e) {
  console.log('focus');
  if (e.target.nodeName === 'BUTTON'); {
    e.target.classList.toggle('controls__btn--focus');
  }
}


function removeEvent(e) {
  this.removeEventListener('focusin', handleFocus);
  this.removeEventListener('focusout', handleFocus);
}


const displayDOM = document.querySelector('.display__time');

function showTimer(miliSec) {
  displayDOM.textContent = formatDisplay(miliSec);
}


function formatDisplay(miliSec) {
  const centiSec = Math.floor((miliSec / 10) % 100);
  const sec      = Math.floor((miliSec / 1000) % 60);
  const min      = Math.floor((miliSec / (1000 * 60)) % 60);
  const hour     = Math.floor((miliSec / (1000 * 60 * 60)) % 100);
  return `${padWithZero(hour)}:${padWithZero(min)}:${padWithZero(sec)}.${padWithZero(centiSec)}`;
}


function padWithZero(n) {
  return n < 10 ? `0${n}` : n;
}


// module.exports = {
//   sum,
//   multiply,
//   addOneAsyncWithCallback
// };
