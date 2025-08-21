const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const path = require('path')
const escpos = require('escpos')
escpos.USB = require('escpos-usb')

const device = new escpos.USB();
const options = { encoding: "GB18030" }
const printer = new escpos.Printer(device, options)

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  print('Hello World');
});

const print = (text) => {
  device.open(function () {
    printer
      .font('a')
      .align('ct')
      .style('bu')
      .size(1, 1)
      .text(text)
      .cut()
      .close();
  });
}