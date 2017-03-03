/* eslint no-undef: 0 */

// *******************************************************************
// Speech
// *******************************************************************
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = true;


let isRecognitionActive = false;
voiceButtonDOM = document.querySelector('.voice__btn');
speechDemoDOM = document.querySelector('.speech-demo');
voiceButtonDOM.addEventListener('click', toggleRecognition);


function toggleRecognition() {
  isRecognitionActive = !isRecognitionActive;
  voiceButtonDOM.classList.toggle('voice__btn--active');

  if (isRecognitionActive) {
    recognition.start();
    recognition.addEventListener('end', recognition.start);
  } else {
    recognition.removeEventListener('end', recognition.start);
    recognition.stop();
    toggleSpeechDemo();
  }
}


function toggleSpeechDemo() {
  speechDemoDOM.style.opacity = '0';
  setTimeout(() => {
    showSpeech('');
    speechDemoDOM.style.opacity = '1';
  }, 1000);
}


recognition.addEventListener('result', e => {
  let transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');

  showSpeech(transcript);

  if (e.results[0].isFinal) {
    analyseSpeech(transcript);
  }
});


function showSpeech(transcript) {
  speechDemoDOM.textContent = transcript;
  speechDemoDOM.scrollTop = speechDemoDOM.scrollTop + 400;
}

const startCommands = ['start', 'begin', 'go'];
const stopCommands  = ['stop', 'break', 'pause'];
const resetCommands = ['reset', 'end', 'finish'];

function analyseSpeech(transcript) {
  if (startCommands.some(command => isInTranscript(command, transcript))) {
    startTimer(runTimer, getCurrentMs);
    highlightIfCommand(startDOM);
  } else if (stopCommands.some(command => isInTranscript(command, transcript))) {
    stopTimer();
    highlightIfCommand(stopDOM);
  } else if (resetCommands.some(command => isInTranscript(command, transcript))) {
    resetTimer(stopTimer, showTimer);
    highlightIfCommand(resetDOM);
  } else if (isInTranscript('thank you', transcript)) {
    timeDisplayDOM.textContent = '🌺 🦋 🙊 🌼 🌻 🦄 🐥 🌸';
  }
}


function isInTranscript(command, transcript) {
  const needle = new RegExp(`(^|\\s)${command}(?![a-z])`, 'i');
  return needle.test(transcript);
}


function highlightIfCommand(button) {
  button.classList.toggle('controls__btn--focus');
  setTimeout(() => {
    button.classList.toggle('controls__btn--focus');
  }, 200);
}
