module.exports = async function createCourseNo(courseNo, { program }) {
    return { 
        courseNo: program + '-' + courseNo
    };
}