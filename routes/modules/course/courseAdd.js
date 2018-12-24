const courseModel = require('../../../models/Course');

module.exports = (req, res) => {
    let course = {
        title: req.body.title,
        courseNo: req.body.courseNo,
        creditHour: req.body.creditHour,
        program: req.body.program,
        semester: req.body.semester,
        preRequisite: req.body.preRequisite,
        content: req.body.content,
        BookSuggestion: req.body.BookSuggestion
    }
    
    new courseModel(course)
        .save()
        .then(data => {
            //console.log(data);
            data ? res.status(200).send({
                status: 200,
                data: data
            }) : res.status(304).send('Invalid code');
        })
        .catch(err => {
            console.log('err: ' + err);
            res.status(403).send(err);
        });
};