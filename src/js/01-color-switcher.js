const butStart = document.querySelector("[data-start]");
const butStop = document.querySelector("[data-stop]");
const body = document.querySelector('body');


butStart.addEventListener("click", handleDeClickStart);

butStop.addEventListener("click", handleDeClickStop);



function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}


function handleDeClickStart() {
    butStart.disabled = true;
    butStop.disabled = false;

    timeStart = setInterval(() => {
        document.body.style.background = getRandomHexColor();
    }, 1000);
}


function handleDeClickStop() {
    clearInterval(timeStart);
    butStart.disabled = false;
    butStop.disabled = true;

};

