const courseModel = require('../../../models/Course');
const { validatePut } = require('./validation');

module.exports = (req, res) => {
    var { error } = validatePut(req.body);
    console.log(error)
    if (error !== null) {
        res.status(402).send({
            status: 402,
            error: error,
            msg: "Validation Error"
        });
    }
    else
        courseModel.findByIdAndUpdate(
            req.params.id,
            { runValidators: true },
            {
                title: req.body.title,
                courseNo: req.body.courseNo,
                creditHour: req.body.creditHour,
                program: req.body.program,
                semester: req.body.semester,
                courseType: req.body.courseType,
                preRequisite: req.body.preRequisite,
                content: req.body.content,
                BookSuggestion: req.body.BookSuggestion
            })
            .then(data => {
                data ? res.status(200).send({
                    status: 200,
                    data: data,
                    msg: 'Success: Data Update succesfully'
                }) : res.send({
                    status: 304,
                    msg: 'Fail: Data not found'
                });
            })
            .catch(err => {
                res.status(500).send({
                    status: 500,
                    msg: 'Error: Server Error',
                    error: err
                });
            });
};