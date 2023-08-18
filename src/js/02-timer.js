import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';



const refs = {
    dateInput: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}

refs.startBtn.setAttribute("disabled", "")
let intervalId;
let isActive = false;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      
      if (selectedDates[0] < Date.now()) {
        refs.startBtn.setAttribute("disabled", "")
        return Notify.failure("Please choose a date in the future", {position: "center-center",clickToClose: true, fontSize: '26px', width: 'fit-content'})
      }
      if (isActive) {
        Notify.warning('timer is running, need restart the page',{position: "center-center",clickToClose: true, fontSize: '26px', width: 'fit-content'})
        return
      }
      refs.startBtn.addEventListener('click', () => {
        isActive = true
        refs.startBtn.setAttribute("disabled", "")
        Notify.success('Timer have been start', {position: "center-center",clickToClose: true, fontSize: '26px', width: 'fit-content'})
        intervalId = setInterval(()=> {
            const timeToRender = convertMs(selectedDates[0] - Date.now());
            renderClock(timeToRender)},1000)
      })
      
      refs.startBtn.removeAttribute('disabled')
     
    },
  };

  flatpickr(refs.dateInput, options)

  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }
  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

  function renderClock ({days, hours, seconds, minutes}) {
    refs.days.innerHTML = days
    refs.hours.innerHTML = hours
    refs.minutes.innerHTML = minutes
    refs.seconds.innerHTML = seconds
  }



