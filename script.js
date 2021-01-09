function ri(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

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
    q: `How do you write ${int} and ${num} / ${den.toLocaleString()} as a decimal?`,
    a: int + num / den
  };
}

function D2F() {
  const num = ri(1, 1000);
  const den = 10 ** ri(1, 5);
  return {
    q: `How do you write ${(num / den)} as a fraction?`,
    a: `${num} / ${den}`
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
    q: `What is the percentage value of ${num} / ${den}?`,
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

function getChecked() {
  return [...document.getElementsByName('types')].filter(i => i.checked).map(i => i.id);
}

document.getElementById('nextQuestion').addEventListener('click', () => {
  const types = getChecked();
  const rand = types[Math.floor(Math.random() * types.length)];
  const qna = window[rand]();
  document.getElementById('question').textContent = qna.q;
  document.getElementById('answer').style.visibility = 'hidden';
  document.getElementById('answer').textContent = qna.a;
});

const answerButton = document.getElementById('showAnswer');
answerButton.addEventListener('click',()=>{
  document.getElementById('answer').style.visibility = 'visible'
});