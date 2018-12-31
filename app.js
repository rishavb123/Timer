const express = require('express');
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

app.listen(port, () => console.log(`Timer listening on port ${port}`));