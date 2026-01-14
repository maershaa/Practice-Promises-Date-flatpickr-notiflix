const startBtnEl = document.querySelector('[data-start]');
const stopBtnEl = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');
const text = document.querySelector('.currentColor-js');

startBtnEl.addEventListener('click', onStartBtnClick);
stopBtnEl.addEventListener('click', onStopBtnClick);

let timerId = null;

stopBtnEl.disabled = true;
text.style.display = 'none';
function onStartBtnClick() {
  startBtnEl.disabled = true;
  stopBtnEl.disabled = false;

  timerId = setInterval(() => {
    const color = getRandomHexColor();
    bodyEl.style.backgroundColor = color;
    text.textContent = `Current BG color is:${color}`;
    text.style.display = 'inline';

    console.log(`Текущий цвет: ${color}`);
  }, 1000);
}
function onStopBtnClick() {
  clearInterval(timerId);
  timerId = null; // Сбрасываем ID
  stopBtnEl.disabled = true;
  startBtnEl.disabled = false;

  console.log('Смена цвета остановлена');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
