// визначаэмо посилання на елементи
const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

// додавання класу для стилізаціїт кнопок
refs.startBtn.classList.add('btn');
refs.stopBtn.classList.add('btn');

//спочатку кнопка stop не активна
refs.stopBtn.disabled = true;

// встановлюємо таймер зміни кольору
let timerId = null;

//функція ля генерування випадкового кольору
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

//встановлюємо слухача подій на кнопку start
// кнопка start стає неактивною, кнопка stop стає активною, запускається setInterval зі зміною кольору
refs.startBtn.addEventListener('click', () => {
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;

  timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

//встановлюємо слухача подій на кнопку stop
// відключається setInterval, кнопка start стає активною, кнопка stop стає неактивною

refs.stopBtn.addEventListener('click', () => {
  clearInterval(timerId);

  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
});
