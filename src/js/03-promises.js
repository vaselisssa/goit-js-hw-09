import Notiflix from 'notiflix';

//посилання на форму
const form = document.querySelector('.form');

//функція для створення одного промісу
function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}

//функція для виклику функції createPromise стільки разів, з такою затримкою і кроком, які ввів користувач
function onSubmit(e) {
  e.preventDefault();
  const delay = Number(e.target[0].value);
  const step = Number(e.target[1].value);
  const amount = Number(e.target[2].value);
  for (let i = 0; i < amount; i++) {
    createPromise(i + 1, delay + i * step)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}

//додаємо слухача подій на форму
form.addEventListener('submit', onSubmit);
