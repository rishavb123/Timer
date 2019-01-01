function getRequest(sub) {
    try {
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", "http://192.168.1.31:4000/" + sub, false);
        xmlHttp.send(null);
        return xmlHttp.responseText;
    } catch (e) {
        return -1;
    }
}
const span = document.getElementById("time");
const audio = new Audio('alert.mp3');
let playCounter = 0;
audio.addEventListener('ended', function() {
    this.currentTime = 0;
    if (timerState == "off" && playCounter < 30) {
        playCounter++;
        this.play();
    } else {
        if (playCounter >= 30)
            timerState = "done";
        playCounter = 0;
    }
}, false);
let timerState = "on";
if (window.innerHeight > window.innerWidth)
    span.innerHTML = "0:00:00";
else
    span.innerHTML = "0:00:00:000";

$('#close').click(() => {
    playCounter = 30;
});

$('#stop').click(() => {
    getRequest('stop');
});

setInterval(() => {
    const time = getRequest('time');
    if (time < 0) {
        $('#timer_done_modal').modal('hide');
        timerState = "disconnected"
        return;
    }
    if (time == 0) {
        if (timerState == "on") {
            timerState = "off";
            $('#timer_done_modal').modal('show');
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