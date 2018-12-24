const courseModel = require('../../../models/Course');

module.exports = (req, res) => {
    let course = {
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

    new courseModel(course)
        .save()
        .then(data => {
            res.status(200).send({
                status: 200,
                data: data,
                msg: 'Success: Data save succesfully'
            })
        })
        .catch(err => {
            console.log('err: ' + err);
            if (err['code'] && err['code'] == 11000) {
                console.log(err.code);
                res.status(409).send({
                    status: 400,
                    msg: 'Error: Duplicate course number'
                });
            }
            else if (err['errors'] && err['message'] && err['_message']) {
                res.status(402).send({
                    status: 500,
                    error: err['message'],
                    msg: err['_message']
                });
            }
            else
                res.status(500).send({
                    status: 500,
                    msg: 'Error: Server Error',
                    error: err
                });
        });
};

a = 
{
    "status": 500,
    "msg": "Error: Server Error",
    "err":
    {
        "errors":
        {
            "title":
            {
                "message": "course title required",
                "name": "ValidatorError",
                "properties":
                {
                    "message": "course title required",
                    "type": "required", "path": "title", "value": ""
                },
                "kind": "required", "path": "title", "value": ""
            },
            "creditHour": { "message": "3+11 is not a valid course credit hour!", "name": "ValidatorError", "properties": { "isAsync": true, "message": "3+11 is not a valid course credit hour!", "type": "user defined", "path": "creditHour", "value": "3+11" }, "kind": "user defined", "path": "creditHour", "value": "3+11" }
        },
         "_message": "course validation failed", 
         "message": "course validation failed: title: course title required, creditHour: 3+11 is not a valid course credit hour!", "name": "ValidationError"
    }
}