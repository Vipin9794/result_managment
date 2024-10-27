const express = require('express');
const { studentLogin, viewResult } = require('../controllers/studentController');
const router = express.Router();

router.post('/login', studentLogin);
router.get('/result', viewResult);

module.exports = router;
