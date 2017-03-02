
// *******************************************************************
// State
// *******************************************************************
let isRunning = false;
let animationRequestId;
let startTime;
let passedTime = 0;


// *******************************************************************
// Control
// *******************************************************************
function startTimer() {
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


function resetTimer() {
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
const startDOM = document.querySelector('.controls__btn--start');
const stopDOM = document.querySelector('.controls__btn--stop');
const resetDOM = document.querySelector('.controls__btn--reset');

(function addEventListeners() {

  const controlsDOM = document.querySelector('.controls');

  startDOM.addEventListener('click', startTimer);
  stopDOM.addEventListener('click', stopTimer);
  resetDOM.addEventListener('click', resetTimer);

  ['focusin', 'focusout', 'mouseover'].forEach(event => {
    if (event === 'mouseover') {
      controlsDOM.addEventListener(event, removeFocus);
    } else {
      controlsDOM.addEventListener(event, handleFocus);
    }
  });
}());


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



// *******************************************************************
// Speech
// *******************************************************************
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = true;


recognition.start();
recognition.addEventListener('end', recognition.start);


recognition.addEventListener('result', e => {
  const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');

  if (e.results[0].isFinal) {
    handleSpeech(transcript);
  }
});


function handleSpeech(transcript) {
  console.log(transcript);
  switch (transcript) {
    case 'start':
    case 'begin':
    case 'go':
    case 'let\'s go':
      startTimer();
      showOnSpeech(startDOM);
      break;
    case 'stop':
    case 'pause':
    case 'break':
      stopTimer();
      showOnSpeech(stopDOM);
      break;
    case 'reset':
    case 'end':
    case 'finish':
      resetTimer();
      showOnSpeech(resetDOM);
      break;
    case 'thank you':
      timeDisplayDOM.textContent = '🌻 🌼 🌸 🌺 🍀';
      break;
    default:
      handleUnknownTranscript();
  }
}


function showOnSpeech(button) {
  button.classList.toggle('controls__btn--focus');
  setTimeout(() => {
    button.classList.toggle('controls__btn--focus');
  }, 200);
}


const currentText = new SpeechSynthesisUtterance();


function handleUnknownTranscript() {
  const potentialAnswers = [
    'Could you repeat this please?',
    'Sorry, I didn\t catch this',
    'I\'m not 100% sure what you meant'
  ];
  currentText.text = potentialAnswers[Math.floor(Math.random() * potentialAnswers.length)];
  speechSynthesis.cancel();
  speechSynthesis.speak(currentText);
}








// module.exports = {
//   sum,
//   multiply,
//   addOneAsyncWithCallback
// };
