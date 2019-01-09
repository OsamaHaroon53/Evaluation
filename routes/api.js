const express = require('express');
const router = express.Router();

const courseAdd = require('./modules/course/courseAdd');
const courseDelete = require('./modules/course/courseDelete');
const courseGet = require('./modules/course/courseGet');
const coursePut = require('./modules/course/courseUpdate');
const courseNoGet = require('./modules/course/getAllCourseNo');
const signUp = require('./modules/account/signup');
const sendPassword = require('./modules/mail/sendPassword');

router.post('/course/add',courseAdd);
router.delete('/course/delete/:id',courseDelete);
router.get('/course/:id',courseGet);
router.put('/course/:id',coursePut);
router.get('/course/courseNo/:program',courseNoGet);

router.post('/admin/signup',signUp);
router.post('/admin/sendpassword',sendPassword);


module.exports = router;