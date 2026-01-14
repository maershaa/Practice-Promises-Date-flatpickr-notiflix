import NotifyX from 'notifyx';
import 'notifyx/style.css';

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();
  const form = evt.target;
  const delay = Number(form.elements.delay.value); //первая задержка
  const step = Number(form.elements.step.value); // шаг между нотификашками
  const amount = Number(form.elements.amount.value); //кол-во нотификашек

  for (let position = 1; position <= amount; position++) {
    const finalDelay = delay + step * (position - 1);

    createPromise(position, finalDelay)
      .then(data => {
        NotifyX.success(
          `✅ Fulfilled promise ${data.position} in ${data.delay}ms`,
          {
            duration: 5000,
          }
        );
      })
      .catch(error => {
        NotifyX.error(
          `❌ Rejected promise ${error.position} in ${error.delay}ms`,
          {
            duration: 5000,
            dismissible: true,
          }
        );
      });
  }
}

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        res({ position, delay });
      } else {
        rej({ position, delay });
      }
    }, delay);
  });
}
