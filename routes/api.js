const express = require('express');
const router = express.Router();

const courseAdd = require('./modules/course/courseAdd');
const courseDelete = require('./modules/course/courseDelete')

router.post('/course/add',courseAdd);
router.post('/course/delete/:id',courseDelete);


module.exports = router;