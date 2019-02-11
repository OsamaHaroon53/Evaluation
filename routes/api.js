const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

//class
const classAdd = require('./modules/class/addClass');
const classDelete = require('./modules/class/deleteClass');
const classGet = require('./modules/class/getClasses');
const classPut = require('./modules/class/updateClass');

router.post('/class/add',classAdd);
router.delete('/class/:id',classDelete);
router.get('/classes',classGet);
router.put('/class/:id',classPut);

//Course section
const courseAdd = require('./modules/course/courseAdd');
const courseDelete = require('./modules/course/courseDelete');
const courseGet = require('./modules/course/courseGet');
const coursePut = require('./modules/course/courseUpdate');
const courseNoGet = require('./modules/course/getAllCourseNo');

router.post('/course/add',courseAdd);
router.delete('/course/delete/:id',courseDelete);
router.get('/course/:id',courseGet);
router.put('/course/:id',coursePut);
router.get('/course/courseNo/:program',courseNoGet);

// Account
const signUp = require('./modules/account/signup');
const sendPassword = require('./modules/mail/sendPassword');
const logIn = require('./modules/account/login');
const createCode = require('./modules/account/verificationCode');
const sendCode = require('./modules/mail/sendCode');
const validateCode = require('./modules/account/validateVerificationCode');
const changePassword = require('./modules/account/changePassword');
const getTeacher = require('./modules/account/getTeacher');
const getStudent = require('./modules/account/getStudent');

router.post('/login',logIn);

router.post('/createcode',createCode);
router.post('/sendcode',sendCode);
router.post('/validatecode',validateCode);

router.post('/changepassword',auth,changePassword);

router.post('/admin/signup',signUp);
router.post('/admin/sendpassword',sendPassword);
router.get('/admin/allteacher',getTeacher);
router.get('/admin/allstudent',getStudent);

module.exports = router;