// src/routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const receiptService = require('../services/receipt.service');

router.route('/extractReceiptDetails').post(receiptService.extractReceiptDetails);
// ... other routes

module.exports = router;
