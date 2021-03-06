M.AutoInit();
document.addEventListener('DOMContentLoaded', function () {
  var ranges = document.querySelectorAll('input[type=range]');
  M.Range.init(ranges);
});


/**
 * 
 * Conversion
 * 
 */

const ri = (min, max) => Math.floor(min + Math.random() * (max - min + 1));

const frac = (num, den) => `<sup>${num}</sup>&frasl;<sub>${den}</sub>`;

function generateFraction(len = 4) {
  const zeros = ri(1, len);
  const den = 10 ** zeros;
  const num = ri(1, den - 1);
  return [num, den];
}

function F2D() {
  const int = ri(1, 100);
  const [num, den] = generateFraction(5);
  console.log();
  return {
    q: `How do you write ${int} ${frac(num, den.toLocaleString())} as a decimal?`,
    a: int + num / den
  };
}

function D2F() {
  const num = ri(1, 1000);
  const den = 10 ** ri(1, 5);
  return {
    q: `How do you write ${(num / den)} as a fraction?`,
    a: frac(num, den)
  };
}

function P2D() {
  const [num, den] = generateFraction(4);
  const dec = num / den;
  return {
    q: `What is the decimal value of ${100 * num / den}%?`,
    a: dec
  };
}

function F2P() {
  const num = ri(1, 99);
  const den = ri(num, 100);
  return {
    q: `What is the percentage value of ${frac(num, den)}?`,
    a: parseFloat((100 * num / den).toPrecision(4)) + '%'
  };
}

function D2P() {
  const dec = Math.random().toFixed(ri(1, 4));
  return {
    q: `What is the percentage value of ${dec}?`,
    a: parseFloat((100 * dec).toPrecision(4)) + '%'
  };
}

const getChecked = () => [...document.getElementsByName('types')].filter(i => i.checked).map(i => i.id);

document.getElementById('nextQuestion').addEventListener('click', () => {
  const types = getChecked();
  const rand = types[ri(0, types.length - 1)];
  const qna = window[rand]();
  document.getElementById('cardTitle').textContent = document.getElementById(rand).nextElementSibling.textContent;
  document.getElementById('question').innerHTML = qna.q;
  document.getElementById('answer').style.visibility = 'hidden';
  document.getElementById('answer').innerHTML = qna.a;
});

const answerButton = document.getElementById('showAnswer');
answerButton.addEventListener('click', () => document.getElementById('answer').style.visibility = 'visible');

document.getElementById('nextQuestion').click();

/**
 * 
 * Proportion
 * 
 */

const kVal = document.getElementById('kVal');
let kSize = kVal.value;
kVal.addEventListener('input', event => {
  document.getElementById('kVar').style.fontSize = event.target.value + 'em';
  kSize = kVal.value;
})

const xVar = document.getElementById('xVar');
const yVar = document.getElementById('yVar');
const kVar = document.getElementById('kVar');

// 1em in px
const em = parseFloat(getComputedStyle(kVar).fontSize);

const xInt = setInterval(() => {
  xVar.style.transition = 'font-size 1s ease-in-out';
  xVar.style.fontSize = xVar.style.fontSize === '1em' ? '2em' : '1em';
}, 1000);


const yInt = setInterval(() => {
  const xSize = parseFloat(getComputedStyle(xVar).fontSize) / em;
  yVar.style.fontSize = (document.getElementById('relation').checked ? kSize / xSize : kSize * xSize) + 'em';
}, 8);

document.getElementById('relation').addEventListener('click', () => {
  document.getElementById('opVar').textContent = document.getElementById('relation').checked ? '/' : '×';
});
