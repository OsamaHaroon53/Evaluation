const Timetable = require('../../../models/Timetable');

module.exports = async function (req, res, next) {
    
    await Timetable.aggregate([
        {
            $lookup:{
                from: "sections",
                localField: "section",
                foreignField: "_id",
                as: "section"
            }
        },
        {
            $lookup:{
                from: "programs",
                localField: "section.program",
                foreignField: "_id",
                as: "program"
            }
        },
        { 
            $addFields: { 
                program: { $arrayElemAt: [ "$program", 0 ] },
                section: { $arrayElemAt: [ "$section", 0 ] }
            } 
        },
        {
            $group: {
                _id: { effectiveDate: "$effectiveDate", program: "$program" },
                sections: {
                    $addToSet: {
                        section: "$section",
                        // course: "$course",
                        // teacher: "$teacher",
                        // day: "$day",
                        // batch: "$batch",
                        // startTime: "$startTime",
                        // endTime: "$endTime",
                        // endTime: "$endTime",
                        // labTeacher: "$labTeacher",
                        // labEndTime: "$labEndTime",
                        // labStartTime: "$labStartTime",
                        // labDay: "$labDay"
                        
                    }
                }
            }
        },
        {
            $project: {
                program: "$_id.program",
                effectiveDate: "$_id.effectiveDate",
                sections: "$sections",
                _id : 0,
            }
        }
    ], function (err, result) {
        if (err) {
            res.status(500).send({
                status: 500,
                msg: "Server Error",
                error: err
            })
            return;
        }
        res.status(200).send({
            status: 200,
            msg: "Get TimeTables Succesfully",
            data: result
        });
    });
}