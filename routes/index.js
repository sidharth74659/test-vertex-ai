
const barcodeRouter = require('./barcodes.route');
const receiptRouter = require('./receipt.route');

const routers = [barcodeRouter, receiptRouter];

module.exports = routers;