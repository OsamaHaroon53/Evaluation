const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')

const courseAdd = require('./modules/course/courseAdd');
const courseDelete = require('./modules/course/courseDelete');
const courseGet = require('./modules/course/courseGet');
const coursePut = require('./modules/course/courseUpdate');
const courseNoGet = require('./modules/course/getAllCourseNo');
const signUp = require('./modules/account/signup');
const sendPassword = require('./modules/mail/sendPassword');
const logIn = require('./modules/account/login');
const createCode = require('./modules/account/verificationCode');
const sendCode = require('./modules/mail/sendCode');
const changePassword = require('./modules/account/changePassword');


router.post('/course/add',courseAdd);
router.delete('/course/delete/:id',courseDelete);
router.get('/course/:id',courseGet);
router.put('/course/:id',coursePut);
router.get('/course/courseNo/:program',courseNoGet);

router.post('/login',logIn);
router.post('/createcode',createCode);
router.post('/sendcode',sendCode);
router.post('/admin/signup',signUp);
router.post('/admin/sendpassword',sendPassword);
router.post('/changepassword',auth,changePassword);


module.exports = router;