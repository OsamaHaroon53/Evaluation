const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const teacher = require('../middleware/teacher');
const student = require('../middleware/student');

//program
const programPut = require('./modules/program/updateProgram');
const programAdd = require('./modules/program/addProgram');
const programDelete = require('./modules/program/deleteProgram');
const programGet = require('./modules/program/getPrograms');
const programIDGet = require('./modules/program/getProgramsSemesters');
const programSemesterGet = require('./modules/program/getSemesters');

router.put('/program',[programPut],programAdd);
router.post('/program/add',programAdd);
router.delete('/program',programDelete);
router.get('/programs',programGet);
router.get('/programswithid',programIDGet);
router.post('/programs/semesters',programSemesterGet);

//Class section
const sectionAdd = require('./modules/section/addSection');
const sectionDelete = require('./modules/section/deleteSection');
const sectionGet = require('./modules/section/getSections');
const sectionPut = require('./modules/section/updateSection');
const sectionByProgramGet = require('./modules/section/getSectionsByProgramID');

router.post('/section/add',sectionAdd);
router.delete('/section/:id',sectionDelete);
router.get('/sections',sectionGet);
router.put('/section/:id',sectionPut);
router.get('/sectionsbyprogram/:id',sectionByProgramGet);

//Course section
const courseAdd = require('./modules/course/courseAdd');
const courseDelete = require('./modules/course/courseDelete');
const courseGet = require('./modules/course/courseGet');
const coursePut = require('./modules/course/courseUpdate');
const courseNoGet = require('./modules/course/getAllCourseNo');
const coursesGet = require('./modules/course/getAllCourses');

router.post('/course/add',courseAdd);
router.delete('/course/delete/:id',courseDelete);
router.get('/course/:id',courseGet);
router.put('/course/:id',coursePut);
router.get('/course/courseNo/:program',courseNoGet);
router.get('/courses',coursesGet);

// Account
const signUp = require('./modules/account/signup');
const sendPassword = require('./modules/mail/sendPassword');
const logIn = require('./modules/account/login');
const createCode = require('./modules/account/verificationCode');
const sendCode = require('./modules/mail/sendCode');
const validateCode = require('./modules/account/validateVerificationCode');
const changePassword = require('./modules/account/changePassword');

router.post('/login',logIn);

router.post('/createcode',createCode);
router.post('/sendcode',sendCode);
router.post('/validatecode',validateCode);

router.post('/changepassword',auth,changePassword);

router.post('/admin/signup',signUp);
router.post('/admin/sendpassword',sendPassword);

//teacher
const teacherGet = require('./modules/teacher/getTeacher');
const teacherUpdate = require('./modules/teacher/updateTeacher');

router.get('/admin/allteacher',teacherGet);
router.put('/teacher/updateprofile',[auth,teacher],teacherUpdate);

//student
const studentGet = require('./modules/student/getStudent');
const studentUpdate = require('./modules/student/updateStudent');

router.get('/admin/allstudent',studentGet);
router.put('/student/updateprofile',[auth,student],studentUpdate);

//timeTable
const TTGet = require('./modules/timeTable/getTT');
const TTAdd = require('./modules/timeTable/addTT');

router.get('/admin/timetables',TTGet);
router.post('/admin/timetable/add',TTAdd);

//Evaluation
const evalautionGet = require('./modules/Evaluation/get');
const evalautionAdd = require('./modules/Evaluation/add');

router.get('/admin/evaluations',[auth,admin],evalautionGet);
router.post('/admin/evaluation/add',[auth,student],evalautionAdd);

module.exports = router;