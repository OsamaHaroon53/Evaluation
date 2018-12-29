let programs = ['BSSE', 'BSCS', 'MCS', 'PGD', 'MS', 'Phd']
var coupled = function(courseNo,program){
    if(program === programs[0]){
        return 'CS(SE)'+'-'+courseNo;
    }
    else if(program === program[4]  || program === programs[5]){
        return 'MSCS'+'-'+courseNo;
    }
    else if(program === program[2]){
        return 'CS'+'-'+courseNo;
    }
    else {
        return program+'-'+courseNo;
    }
}
module.exports = coupled;