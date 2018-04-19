const SerialPort = require('serialport');
const portString = process.env.SERIAL_PORT || 'COM4';
const portOpts = {
    baudRate: 9600
}
console.log(portString);
const port = new SerialPort(portString);
// .catch((err) => console.error(err.message));  // if windows
let toggle = false;
let value = 100;

setInterval(() => {
    let data = port.read();
    if (data) {
        console.log(data.toString().trim());
    }
    toggle ? value = 0 : value = 200;
    toggle = !toggle;
    port.write(value.toString());
}, 2000);
