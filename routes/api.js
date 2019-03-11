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

//section
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

// Account for all
const signUp = require('./modules/account/signup');
const sendPassword = require('./modules/mail/sendPassword');
const logIn = require('./modules/account/login');
const createCode = require('./modules/account/verificationCode');
const sendCode = require('./modules/mail/sendCode');
const validateCode = require('./modules/account/validateVerificationCode');
const changePassword = require('./modules/account/changePassword');
const getProfile = require('./modules/account/getProfile');
const blockUser = require('./modules/account/BlockUser');

router.post('/login',logIn);

router.post('/createcode',createCode);
router.post('/sendcode',sendCode);
router.post('/validatecode',validateCode);

router.post('/changepassword',auth,changePassword);
router.get('/profile',auth,getProfile);
router.post('/blockuser',[auth,admin],blockUser);

router.post('/admin/signup',signUp);
router.post('/admin/sendpassword',sendPassword);

//teacher
const teacherGet = require('./modules/teacher/getTeacher');
const teacherUpdate = require('./modules/teacher/updateTeacher');
const assignCourses = require('./modules/teacher/getAssignCourses');
const assignmentAdd = require('./modules/teacher/assignment/add');
const assignmentGet = require('./modules/teacher/assignment/get');
const resultAdd = require('./modules/teacher/result/add');
const resultGet = require('./modules/teacher/result/get');
const studentAssignmentsGet = require('./modules/teacher/assignment/getStudentAssignment');

router.get('/admin/allteacher',teacherGet);
router.put('/teacher/updateprofile',[auth,teacher],teacherUpdate);
router.get('/teacher/courses',[auth,teacher],assignCourses);
router.post('/teacher/assignment',[auth,teacher],assignmentAdd);
router.get('/teacher/assignments/:class',[auth,teacher],assignmentGet);
router.post('/teacher/result',[auth,teacher],resultAdd);
router.get('/teacher/results/:class',[auth,teacher],resultGet);
router.get('/teacher/studentassignments/:assignment',[auth,teacher],studentAssignmentsGet);

//student
const studentGet = require('./modules/student/getStudent');
const studentUpdate = require('./modules/student/updateStudent');
const studentUpdateForActive = require('./modules/student/updateStudentForActive');
const myCourses = require('./modules/student/getStudentCourses');
const assignmentGetByStudent = require('./modules/student/assignment/get');
const resultGetByStudent = require('./modules/student/result/get');
const assignmentUpload = require('./modules/student/assignment/upload');
const assignmentUploadedGet = require('./modules/student/assignment/getUploadedAssignment');
const studentsGet = require('./modules/student/getStudentBySection');

router.get('/admin/allstudent',studentGet);
router.put('/student/updateprofile',[auth,student],studentUpdate);
router.put('/student/activate',[auth,student],studentUpdateForActive);
router.get('/student/courses',[auth,student],myCourses);
router.get('/student/assignment/:teacher/:class',[auth,student],assignmentGetByStudent);
router.get('/student/result/:teacher/:class',[auth,student],resultGetByStudent);
router.post('/student/assignment',[auth,student],assignmentUpload);
router.get('/student/assignment/:assignment',[auth,student],assignmentUploadedGet);
router.get('/student/:class',[auth],studentsGet);

//timeTable
const TTGet = require('./modules/timeTable/getTT');
const TTSortGet = require('./modules/timeTable/getSortTT');
const TTBySectionsGet = require('./modules/timeTable/getTTBySections');
const TTAdd = require('./modules/timeTable/addTT');

router.get('/admin/timetables',TTGet);
router.get('/admin/sortedtimetables',TTSortGet);
router.get('/admin/timetabledetails/:section/:effectiveDate',TTBySectionsGet);
router.post('/admin/timetable/add',TTAdd);

//Evaluation
const evalautionGet = require('./modules/Evaluation/get');
const evalautionTheoryGet = require('./modules/Evaluation/getTheory');
const evalautionLabGet = require('./modules/Evaluation/getLab');
const evalautionAdd = require('./modules/Evaluation/add');

router.get('/admin/evaluations',[auth,admin],evalautionGet);
router.get('/admin/evaluations/theory/:evaluation',[auth,admin],evalautionTheoryGet);
router.get('/admin/evaluations/lab/:evaluation',[auth,admin],evalautionLabGet);
router.post('/student/evaluation/add',[auth,student],evalautionAdd);

//query
const queryGet = require('./modules/query/get');
const queryAdd = require('./modules/query/add');

router.get('/admin/queries',[auth,admin],queryGet);
router.post('/student/query',[auth,student],queryAdd);

//count
const countGet = require('./modules/getCount/count');

router.get('/admin/countall',[auth,admin],countGet);

//Attendence
const attendenceAdd = require('./modules/attendence/addAttendence');
const attendenceAllGet = require('./modules/attendence/getAllAttendence');
const attendenceGet = require('./modules/attendence/getAttendenceByClass');

router.get('/teacher/allattendence',[auth],attendenceAllGet);
router.get('/teacher/attendence/:class',[auth],attendenceGet);
router.post('/teacher/attendence',[auth,teacher],attendenceAdd);


module.exports = router;