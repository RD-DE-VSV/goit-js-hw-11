import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
  datePicker: document.querySelector("#datetime-picker"),
  startBtn: document.querySelector("[data-start]"),
  daysSpan: document.querySelector("[data-days]"),
  hoursSpan: document.querySelector("[data-hours]"),
  minutesSpan: document.querySelector("[data-minutes]"),
  secondsSpan: document.querySelector("[data-seconds]"),
};

let countdownDate = null;
let intervalId = null;

// Flatpickr configuration
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const now = new Date();

    if (selectedDate <= now) {
      alert("Please choose a future date.");
      refs.startBtn.disabled = true;
    } else {
      countdownDate = selectedDate;
      refs.startBtn.disabled = false;
    }
  },
};

flatpickr(refs.datePicker, options);

// Start timer
refs.startBtn.addEventListener("click", () => {
  if (!countdownDate) return;

  refs.startBtn.disabled = true;
  refs.datePicker.disabled = true;

  intervalId = setInterval(() => {
    const now = new Date().getTime();
    const timeRemaining = countdownDate - now;

    if (timeRemaining <= 0) {
      clearInterval(intervalId);
      updateTimer(0, 0, 0, 0);
      alert("Countdown completed!");
      refs.datePicker.disabled = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeRemaining);
    updateTimer(days, hours, minutes, seconds);
  }, 1000);
});

// Convert milliseconds to days, hours, minutes, seconds
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}

// Update the UI
function updateTimer(days, hours, minutes, seconds) {
  refs.daysSpan.textContent = String(days).padStart(2, "0");
  refs.hoursSpan.textContent = String(hours).padStart(2, "0");
  refs.minutesSpan.textContent = String(minutes).padStart(2, "0");
  refs.secondsSpan.textContent = String(seconds).padStart(2, "0");
}
