function getTime() {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://192.168.1.31:4000/time", false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}
const span = document.getElementById("time");
const audio = new Audio('alert.mp3');
audio.addEventListener('ended', function() {
    this.currentTime = 0;
    if (timerState == "off")
        this.play();
}, false);
let timerState = "on";
if (window.innerHeight > window.innerWidth)
    span.innerHTML = "0:00:00";
else
    span.innerHTML = "0:00:00:000";
setInterval(() => {
    const time = getTime();
    if (time == 0) {
        if (timerState == "on") {
            timerState = "off";
            audio.play();
        }
    } else {
        timerState = "on";
    }
    let ms = Math.floor(time % 1000);
    let seconds = Math.floor((time / 1000) % 60);
    let minutes = Math.floor((time / 60000) % 60);
    let hours = Math.floor((time / 3600000));
    if ((seconds + "").length < 2)
        seconds = "0" + seconds;
    if ((minutes + "").length < 2)
        minutes = "0" + minutes;
    switch ((ms + "").length) {
        case 1:
            ms = "00" + ms;
            break;
        case 2:
            ms = "0" + ms;
            break;
    }
    if (window.innerHeight > window.innerWidth)
        span.innerHTML = `${hours}:${minutes}:${seconds}`;
    else
        span.innerHTML = `${hours}:${minutes}:${seconds}:${ms}`;

}, 10);