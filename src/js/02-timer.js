import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
// all modules
import Notiflix from 'notiflix';


const inputEl = document.querySelector("#datetime-picker");
const buttonEl = document.querySelector('button[data-start]');
const dayEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");

let selectedDate = null;
let intervalId = null;

buttonEl.addEventListener("click", onStartTime);
buttonEl.disabled = true;


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        if (selectedDates[0].getTime() <= Date.now()) {
            Notiflix.Notify.failure('Please choose a date in the future');
        } else {
            selectedDate = selectedDates[0].getTime();
            buttonEl.disabled = false;


        }
    },
};

flatpickr(inputEl, options);

function onStartTime() {
    timer.start();
}

function addInterface(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = addInterface(Math.floor(ms / day));
    // Remaining hours
    const hours = addInterface(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addInterface(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addInterface(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
}



console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}


const timer = {
    start() {
        intervalId = setInterval(() => {
            currentDate = Date.now();
            const deltaTime = selectedDate - currentDate;
            timerComponents(convertMs(deltaTime));
            buttonEl.disabled = true;
            inputEl.disabled = true;

            if (deltaTime <= 1000) {
                timer.stop();
                Notiflix.Notify.success(`Congratulations! The timer has stopped!`);
            }
        }, 1000);
    },

    stop() {
        clearInterval(intervalId);
        buttonEl.disabled = false;
        inputEl.disabled = false;
    },
};

// const timer = {
//     start() {
//         intervalId = setInterval(() => {
//             const currentDate = Date.now();
//             const deltaTime = selectedDates - currentDate;
//             timerComponents(convertMs(deltaTime));
//             buttonEl.disabled = true;
//             inputEl.disabled = true;

//             if (deltaTime <= 1000) {
//                 timer.stop();
//                 Notiflix.Notify.success('Congratulations!');
//             }
//             console.log(selectedDates);

//         }, 1000);
//     },

//     stop() {
//         clearInterval(intervalId);
//         buttonEl.disabled = false;
//         inputEl.disabled = false;
//     },
// };



function timerComponents({ days, hours, minutes, seconds }) {
    dayEl.textContent = days;
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;
}

const divD = document.querySelector(".timer");
const div = document.querySelectorAll(".field");


divD.style.display = "flex";
div.forEach(element => {
    element.style.display = "flex";
    element.style.flexDirection = "column";
    element.style.gap = "15px";
    element.style.fontSize = "large";
    element.style.alignItems = "center";
    element.style.paddingRight = "10px";

});