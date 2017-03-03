// *******************************************************************
// State
// *******************************************************************
let isRunning = false;
let startTime;
let passedTime = 0;
let animationRequestId;



// *******************************************************************
// Control
// *******************************************************************
function startTimer(runTimer, getCurrentMs) {
  if (isRunning) { return; }
  isRunning = true;
  startTime = getCurrentMs() - passedTime;
  return runTimer();
}


function runTimer() {
  passedTime = getCurrentMs() - startTime;
  showTimer(passedTime);
  return animationRequestId = window.requestAnimationFrame(runTimer);
}


function stopTimer() {
  if (!isRunning) { return; }
  isRunning = false;
  window.cancelAnimationFrame(animationRequestId);
}


function resetTimer(stopTimer, showTimer) {
  stopTimer();
  passedTime = 0;
  startTime = 0;
  showTimer(startTime);
}


function getCurrentMs() {
  return Date.now();
}



// *******************************************************************
// View - Helpers
// *******************************************************************
function handleFocus(e) {
  if (e.target.nodeName === 'BUTTON') {
    e.target.classList.toggle('controls__btn--focus');
  }
}


function removeFocus(e) {
  this.removeEventListener('focusin', handleFocus);
  this.removeEventListener('focusout', handleFocus);
}


const timeDisplayDOM = document.querySelector('.display__time');

function showTimer(miliSec) {
  timeDisplayDOM.textContent = formatDisplay(miliSec);
}


function formatDisplay(miliSec) {
  const centiSec = Math.floor((miliSec / 10) % 100);
  const sec      = Math.floor((miliSec / 1000) % 60);
  const min      = Math.floor((miliSec / (1000 * 60)) % 60);
  const hour     = Math.floor((miliSec / (1000 * 60 * 60)) % 100);
  return `${pad(hour)}:${pad(min)}:${pad(sec)}.${pad(centiSec)}`;
}


function pad(n) {
  return n < 10 ? `0${n}` : n;
}


module.exports = {
  getCurrentMs,
  pad,
  formatDisplay,
  startTimer,
  resetTimer
};
