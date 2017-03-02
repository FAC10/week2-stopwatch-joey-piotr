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
      startTimer(runTimer, getCurrentMs);
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
      resetTimer(stopTimer, showTimer);
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
