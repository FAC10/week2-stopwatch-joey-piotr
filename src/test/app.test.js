const {
  getCurrentMs,
  pad,
  formatDisplay,
  startTimer,
  resetTimer
} = require('../../public/assets/js/app');


describe('getCurrentMs', () => {
  test('returns truthy value', () => {
    expect(getCurrentMs()).toBeTruthy();
  });

  test('returns number', () => {
    expect(typeof getCurrentMs()).toBe('number');
  });

  test('returns value greater than 0', () => {
    expect(getCurrentMs()).toBeGreaterThan(0);
  });

  test('returns current time', () => {
    expect(getCurrentMs()).toBeLessThan(Date.now() + 1);
  });
});


describe('pad', () => {
  test('returns 05 if n=5', () => {
    expect(pad(5)).toBe('05');
  });

  test('returns string with length 2 if n < 10', () => {
    expect(pad(6)).toHaveLength(2);
  });

  test('returns 10 if n=10', () => {
    expect(pad(10)).toBe(10);
  });
});


describe('formatDisplay', () => {
  test('returns string', () => {
    expect(typeof formatDisplay(0)).toBe('string');
  });

  test('returns string with length 11', () => {
    expect(formatDisplay(23445)).toHaveLength(11);
  });

  test('returns 00:00:00.00 if miliSec=0', () => {
    expect(formatDisplay(0)).toBe('00:00:00.00');
  });

  test('returns 03:25:53.25 if miliSec=12353256', () => {
    expect(formatDisplay(12353256)).toBe('03:25:53.25');
  });
});


describe('startTimer', () => {
  test('runTimer and getCurrentMs are called when startTimer is called', () => {
    let runTimer = jest.fn();
    let getCurrentMs = jest.fn();
    startTimer(runTimer, getCurrentMs);
    expect(runTimer).toHaveBeenCalled();
    expect(getCurrentMs).toHaveBeenCalled();
  });
});


describe('resetTimer', () => {
  test('stopTimer and showTimer are called when resetTimer is called', () => {
    let stopTimer = jest.fn();
    let showTimer = jest.fn();
    resetTimer(stopTimer, showTimer);
    expect(stopTimer).toHaveBeenCalled();
    expect(showTimer).toHaveBeenCalled();
  });
});
