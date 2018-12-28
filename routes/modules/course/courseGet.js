const courseModel = require('../../../models/Course');
const objectid = require('mongoose').Types.ObjectId;;

var programs = ['BSSE', 'BSCS', 'MCS', 'PGD', 'MS', 'Phd', 'MS/Phd'];

module.exports = (req, res) => {
    var id = req.params.id;
    //find a course
    if (id.length == 24 && objectid.isValid(id)) {
        courseModel.findById(id)
            .select("-__v")
            .then(data => {
                data ? res.send({
                    status: 200,
                    data: data,
                    msg: 'Success: Data send succesfully'
                }) : res.send({
                    status: 304,
                    msg: 'Fail: Data not found'
                });
            })
            .catch(err => {
                console.log('err: ' + err);
                res.send({
                    status: 500,
                    msg: 'Error: Server Error',
                    error: err
                });
            });
    }
    // find semester wise courses
    else if (id.length > 2 && id.length < 7) {
        let program = id.slice(1) == "MSPhd" ? "MS/Phd" : id.slice(1);
        validate(program, id.charCodeAt(0))
            ?
            courseModel.find({ program: program, semester: Number(id[0]) })
                .select("-__v -program -semester -preRequisite -content -BookSuggestion")
                .then(data => {
                    data.length ? res.send({
                        status: 200,
                        data: {
                            program: program,
                            semester: id[0],
                            courses: data
                        },
                        msg: 'Success: Data send succesfully'
                    }) : res.send({
                        status: 304,
                        msg: 'Fail: Data not found'
                    })
                })
                .catch(err => {
                    console.log('err: ' + err);
                    res.send({
                        status: 500,
                        msg: 'Error: Server Error',
                        error: err
                    });
                })
            : res.send({
                status: 402,
                msg: 'Validation error'
            });
    }
    else {
        res.send({
            status: 402,
            msg: 'Validation error:'
        });
    }

};

function validate(program, semesterASCII) {
    flag = false;
    if (semesterASCII > 48 && semesterASCII < 57) {
        programs.forEach(x => {
            if (x == program)
                flag = true;
        });
    }
    return flag;
}