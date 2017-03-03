# Stopwatch with Voice Control

Live version: https://fac10.github.io/week2-stopwatch-joey-piotr/

A practical stopwatch to get the job done. Perfect for every timing situation including cooking, sports, games and work tasks. The app can also be operated with voice (only in Chrome).

Example commands:

#####Start

'start', 'begin', 'go', 'let's go'

#####Stop

'stop', 'pause', 'break'

#####Reset

'reset', 'end', 'finish'

<img src="./src/graphics/screencast.gif" width="275px" height="auto">

<!-- ***************************************************** -->
## Getting started

```sh
git clone https://github.com/FAC10/week2-stopwatch-joey-piotr.git
cd REPO
npm install

#1. Start the development server with Browsersync reloading
npm run dev

#2. Open this url in your browser: http://localhost:3000

#3. You can run tests in separate terminal tab
npm test
```


<!-- ***************************************************** -->
## Testing - [Jest](https://facebook.github.io/jest/) (Piotr)

<img src="https://cdn.slant.co/1440ece6-1968-4c44-8b4c-8a61e397770b/-/format/jpeg/-/progressive/yes/-/preview/480x480/" width="275px" height="auto">

- "Zero configuration" testing platform
- Installed as an npm module
- No need to add testing library in html `<script>` tags
- Watch mode runs only test related to changed files
- [Test Javascript with Jest - 4min video on egghead.io](https://egghead.io/lessons/javascript-test-javascript-with-jest)

### How to set up Jest?

1. Install jest-cli npm module
```sh
npm install jest-cli --save-dev
```

2. Edit your `package.json`

```javascript
"scripts": {
  "test": "jest --coverage",
  "test:watch": "npm run test -- --watch"
}

// Optionally add:
"jest": {
   "collectCoverage": true,
   "notify": true
}
```


### How to use Jest?

```javascript

// Function to be tested:
function pad(n) {
  return n < 10 ? `0${n}` : n;
}

pad(5); // '05'
pad(10); // 10

// Tests:
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
```


<!-- ***************************************************** -->
## Request Animation Frame (Joey)

- requestAnimationFrame vs setInterval / setTimeout
- tracking time using JS Date object



<!-- ***************************************************** -->
## Speech Recognition (Piotr)





<!-- ***************************************************** -->
## Tech stack
* Node
* Vanilla JavaScript
* ES6
* Flexbox
* Jest
* Browsersync
