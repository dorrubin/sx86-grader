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
};


var submissions = [correct, incorrect];
var studentRoster = {};
for (var i = 0; i < submissions.length; i++) {
    studentRoster[submissions[i].studentID] = [0,0,0,0,0];
}

var finalResults;

QUnit.config.autostart = false;
QUnit.config.testTimeout = 2000;
require(
    ["tests/testQuestion1", "tests/testQuestion2", "tests/testQuestion3", "tests/testQuestion4"],
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
            student[test.moduleId] += 1;
            //total
            student[0] += 1;
        }
    }
    finalResults = JSON.stringify(studentRoster);
};


