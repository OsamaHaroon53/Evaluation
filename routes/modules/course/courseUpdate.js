const courseModel = require('../../../models/Course');
const { validatePut } = require('./validation');

module.exports = (req, res) => {
    var { error } = validatePut(req.body);
    if (error !== null) {
        res.status(402).send({
            status: 402,
            error: error,
            msg: "Validation Error"
        });
    }
    else {
        newData = {
            title: req.body.title,
            courseNo: req.body.courseNo,
            creditHour: req.body.creditHour,
            program: req.body.program,
            semester: req.body.semester,
            courseType: req.body.courseType,
            preRequisite: req.body.preRequisite,
            content: req.body.content,
            BookSuggestion: req.body.BookSuggestion
        }

        courseModel.findOneAndUpdate({ _id: req.params.id }, newData)
            .then(data => {
                data ? res.status(200).send({
                    status: 200,
                    data: (()=>{
                        newData["_id"]=req.params.id;
                        return newData;
                    })(),
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
    }
};