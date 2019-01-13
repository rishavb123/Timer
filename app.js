const express = require('express');
const cp = require('child_process');
const app = express();
const port = 4000;

let openChrome = false;
let shift = 0;
if(process.argv[2] === "--open" || process.argv[2] === "-o")
{
    openChrome = true;
    shift = 1;
}

let hours;
let minutes;
let seconds;
switch (process.argv.length) {
    case 3+shift:
        hours = 0;
        minutes = 0;
        seconds = parseInt(process.argv[2+shift]);
        break;
    case 4+shift:
        hours = 0;
        minutes = parseInt(process.argv[2+shift]);
        seconds = parseInt(process.argv[3+shift]);
        break;
    case 5+shift:
        hours = parseInt(process.argv[2+shift]);
        minutes = parseInt(process.argv[3+shift]);
        seconds = parseInt(process.argv[4+shift]);
        break;
    default:
        hours = 0;
        minutes = 0;
        seconds = 0;
}

const totalTime = ((hours * 60 + minutes) * 60 + seconds) * 1000;
let start = Date.now();

app.use(express.static('.'))

app.get("/time", (req, res) => {
    res.set("Access-Control-Allow-Origin", "*")
    const t = totalTime - Date.now() + start;
    res.send("" + ((t < 0) ? 0 : t));
});

app.get("/stop", (req, res) => {
    res.set("Access-Control-Allow-Origin", "*")
    res.send("Stopping . . .");
    process.exit(0);
});
if(openChrome) {
    console.log("Opening Chrome . . .")
    cp.exec('chrome http://localhost:' + port);
}
let server = app.listen(port, () => console.log(`Timer listening on port ${port}`));
