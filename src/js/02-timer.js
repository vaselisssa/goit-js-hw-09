import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

// знаходимо всі елементи
const dateTimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button[data-start]');
let targetDate = Date.now();
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');

//кнопка Start спочатку не активна
startButton.disabled = true;

// об'єкт параметрів
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
      targetDate = selectedDates[0];
    }
  },
};

//функція для кросбраузерного вибору кінцевої дати та часу
flatpickr(dateTimePicker, options);

//функція для підрахунку значень
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

//функція для форматування значень до двохзначного формату
function formatData(value) {
  return value.toString().padStart(2, '0');
}

//функція зворотного відліку і виводу повідомлення про його закінчення
function startTimer() {
  let timer = setInterval(() => {
    let countdown = new Date(dateTimePicker.value) - new Date();

    startButton.disabled = true;
    if (countdown >= 0) {
      let timeObject = convertMs(countdown);

      console.log(timeObject.days);
      daysEl.textContent = formatData(timeObject.days);
      hoursEl.textContent = formatData(timeObject.hours);
      minutesEl.textContent = formatData(timeObject.minutes);
      secondsEl.textContent = formatData(timeObject.seconds);
    } else {
      Notiflix.Notify.success('Countdown finished');
      clearInterval(timer);
    }
  }, 1000);
}

//вішаємо слухача подій на кнопку Start
startButton.addEventListener('click', startTimer);
