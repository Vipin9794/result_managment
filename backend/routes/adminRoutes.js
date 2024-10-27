const express = require('express');
const { adminLogin, createOrUpdateResult, viewAllResults } = require('../controllers/adminController');
const router = express.Router();

router.post('/login', adminLogin);
router.post('/result', createOrUpdateResult);
router.get('/results', viewAllResults);

module.exports = router;
