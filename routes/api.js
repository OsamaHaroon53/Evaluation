const express = require('express');
const router = express.Router();

const courseAdd = require('./modules/course/courseAdd');
const courseDelete = require('./modules/course/courseDelete');
const courseGet = require('./modules/course/courseGet')


router.post('/course/add',courseAdd);
router.delete('/course/delete/:id',courseDelete);
router.get('/course/:id',courseGet);



module.exports = router;