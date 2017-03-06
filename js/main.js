// Initialization
var LoadProgram = function(input_instructions) {
    program = [];
    // load the instructions
    program = input_instructions.match(/.{1,4}/g);
    for (var i = 0; i < program.length; i++) {
        if ((program[i] !== '') || (program[i] !== ' ') || (program[i] !== '\n')) {
            program[i] = parseInt(program[i], 16);
        }
    }
    // clears flags, ram, regsisters
    sx86.clear();
    // take machine code into ram
    sx86_display.load_program(program);
    sx86_display.run(0);
    return sx86.mem.ram;
};

var submissions = JSON.parse(sample_data);
var studentRoster = {};
for (var i = 0; i < submissions.length; i++) {
    studentRoster[submissions[i].studentID] = {
        student_id: submissions[i].studentID,
        total: 0,
        Q1: 0,
        Q2: 0,
        Q3: 0,
        Q4: 0
    };
}

var finalResults;

QUnit.config.autostart = false;
require(
    ["js/tests/testQuestion1", "js/tests/testQuestion2", "js/tests/testQuestion3", "js/tests/testQuestion4"],
    function() {
        QUnit.start();
    }
);

QUnit.jUnitReport = function(report) {
    for (var i = 0; i < report.tests.length; i++) {
        var test = report.tests[i];
        var passed_students = test.passed_students;
        for(var j = 0; j < passed_students.length; j++) {
            var student = studentRoster[passed_students[j]];
            // specific question
            student[("Q" + test.moduleId)] += 1;
            //total
            student["total"] += 1;
        }
    }
    finalResults = JSON.stringify(studentRoster);
};

var Q1flags = [];
var Q2flags = [];
var Q3flags = [];
var Q4flags = [];
var plagarism = function() {
    for(var i = 0; i < submissions.length - 1; i++) {
        for(var j = i+1; j < submissions.length; j++) {
            if(submissions[i].Q1 == submissions[j].Q1 && submissions[i].Q1 !== "") {
                Q1flags.push([submissions[i].studentID, submissions[j].studentID]);
            }
            if(submissions[i].Q2 == submissions[j].Q2 && submissions[i].Q2 !== "") {
                Q2flags.push([submissions[i], submissions[j]]);
            }
            if(submissions[i].Q3 == submissions[j].Q3 && submissions[i].Q3 !== "") {
                Q3flags.push([submissions[i], submissions[j]]);
            }
            if(submissions[i].Q4 == submissions[j].Q4 && submissions[i].Q4 !== "") {
                Q4flags.push([submissions[i], submissions[j]]);
            }
        }
    }
};

// plagarism();

