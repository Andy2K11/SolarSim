var express = require('express');
var router = express.Router();
const path = require('path');
const SerialPort = require('serialport');

const portString = process.env.SERIAL_PORT || 'COM4';
const portOpts = {
    baudRate: 9600
}

const port = new SerialPort(portString);  // if windows
const readings = {
    'solarVoltage': 0,
    'powerRail': 0,
    'solarCurrent': 0,
    'genHighVoltage': 0,
    'genLowVoltage': 0
};

router.get('/', (req, res, next) => {
    let data = port.read();

    if (data) {
        const END = data.indexOf(';') || data.length;
        let message = data.toString().substr(0, END);
        let values = message.split(',');
        values.map((value, index) => {
            readings[Object.keys(readings)[index]] = value;
        });
    }
    console.log(readings);
    return res.json({
        readings
    });
});

router.post('/', (req, res, next) => {
    let data = req.body.data;
    port.write(data.toString());
});

module.exports = router;
// setInterval(() => {
//     if (data) {
//         console.log(data.toString().trim());
//     }
//     toggle ? value = 0 : value = 200;
//     toggle = !toggle;
//     port.write(value.toString());
// }, 2000);
