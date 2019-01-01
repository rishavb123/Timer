const express = require('express');
const cp = require('child_process');
const app = express();
const port = 4000;

let hours;
let minutes;
let seconds;
switch (process.argv.length) {
    case 3:
        hours = 0;
        minutes = 0;
        seconds = parseInt(process.argv[2]);
        break;
    case 4:
        hours = 0;
        minutes = parseInt(process.argv[2]);
        seconds = parseInt(process.argv[3]);
        break;
    case 5:
        hours = parseInt(process.argv[2]);
        minutes = parseInt(process.argv[3]);
        seconds = parseInt(process.argv[4]);
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

cp.exec('chrome http://localhost:' + port);
let server = app.listen(port, () => console.log(`Timer listening on port ${port}`));