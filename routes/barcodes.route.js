// src/routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const barcodeService = require('../services/barcodes.service');

router.route('/qrcode').post(barcodeService.getDataFromQRCode);
// ... other routes

module.exports = router;
