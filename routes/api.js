const courseAdd = require('./modules/course/courseAdd');
const express = require('express');
const router = express.Router();

router.post('/course/add',courseAdd);

module.exports = router;