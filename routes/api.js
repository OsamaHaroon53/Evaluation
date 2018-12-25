const express = require('express');
const router = express.Router();

const courseAdd = require('./modules/course/courseAdd');
const courseDelete = require('./modules/course/courseDelete');
const courseGet = require('./modules/course/courseGet')


router.post('/course/add',courseAdd);
router.post('/course/delete/:id',courseDelete);
router.post('/course',courseGet);



module.exports = router;