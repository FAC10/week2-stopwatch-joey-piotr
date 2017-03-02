// *******************************************************************
// View - Event listeners
// *******************************************************************
const startDOM = document.querySelector('.controls__btn--start');
const stopDOM = document.querySelector('.controls__btn--stop');
const resetDOM = document.querySelector('.controls__btn--reset');

(function addEventListeners() {

  const controlsDOM = document.querySelector('.controls');

  startDOM.addEventListener('click', startTimer.bind(null, runTimer, getCurrentMs));
  stopDOM.addEventListener('click', stopTimer);
  resetDOM.addEventListener('click', resetTimer.bind(null, stopTimer, showTimer));

  ['focusin', 'focusout', 'mouseover'].forEach(event => {
    if (event === 'mouseover') {
      controlsDOM.addEventListener(event, removeFocus);
    } else {
      controlsDOM.addEventListener(event, handleFocus);
    }
  });
}());
