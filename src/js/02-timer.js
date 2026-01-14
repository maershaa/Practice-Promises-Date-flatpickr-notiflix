import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/confetti.css';

import NotifyX from 'notifyx';
import 'notifyx/style.css';

const datetimePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

startBtn.disabled = true;
startBtn.addEventListener('click', onStartBtnClick);
let selectedDay = null;

const config = {
  enableTime: true,
  time_24hr: true,

  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();
    selectedDay = selectedDates[0];

    // всегда сначала блокируем кнопку
    startBtn.disabled = true;

    if (selectedDay <= currentDate) {
      NotifyX.error('Please choose a date in the future', {
        duration: 3000,
        dismissible: true,
      });
      return;
    }

    // дата валидна
    startBtn.disabled = false;

    NotifyX.success('Date is valid. Timer is ready.', {
      duration: 2500,
    });
  },
};

flatpickr(datetimePicker, config);

function onStartBtnClick() {
  startBtn.disabled = true;

  const intervalId = setInterval(() => {
    const currentDate = new Date();
    const ms = selectedDay - currentDate;

    let time;

    // если дата достигнута или прошла
    if (ms <= 0) {
      clearInterval(intervalId);
      time = convertMs(0); //Когда таймер закончен → не считаем дальше, останавливаем интервал, принудительно показываем нули.
    } else {
      time = convertMs(ms);
    }

    daysEl.textContent = time.days.toString().padStart(2, '0');
    hoursEl.textContent = time.hours.toString().padStart(2, '0');
    minutesEl.textContent = time.minutes.toString().padStart(2, '0');
    secondsEl.textContent = time.seconds.toString().padStart(2, '0');
  }, 1000);
}
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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
