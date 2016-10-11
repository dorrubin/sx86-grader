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

var correct = {
    studentID: "foo",
    question1: '9000904090a490f85002100180433023b0000000',
    question2: '900a9046b001900f9047b001904ac041908fc08290c291009140900080034033510151421000202d5142900ab004900fb0050000',
    question3: '90019043b00190029044b00190039045b00190049042b0019041c0419082c08290c3c0c39104c104914090008002403a51411000203560c450c5901eb0030000',
    question4: '90019056b0019041c001904790808002402d100280813026600120259116b1020000'
};

var incorrect = {
    studentID: "bar",
    question1: '903F50005000500050005000B0000000',
    question2: '900A904F908490C3B002B043900A904F9100C080C0C15082510351035103B002B0440000',
    question3: '90049043908690C29101B1001004B1011004B1021004B10390019042908390C4C000C041C082C0C3A10091418045403A50041005203560835002905EB0400000',
    question4: '901B9043B0409003C000904790808002403C90818002403C90828002403C90828002403C90848002403C90858002403C90868002403C6001202590D6B0C00000'
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


