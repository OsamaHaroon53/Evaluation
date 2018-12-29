const express = require('express');
const router = express.Router();

const courseAdd = require('./modules/course/courseAdd');
const courseDelete = require('./modules/course/courseDelete');
const courseGet = require('./modules/course/courseGet');
const coursePut = require('./modules/course/courseUpdate')


router.post('/course/add',courseAdd);
router.delete('/course/delete/:id',courseDelete);
router.get('/course/:id',courseGet);
router.put('/course/:id',coursePut);



module.exports = router;