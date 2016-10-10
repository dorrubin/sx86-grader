// Initialization
var LoadProgram = function(input_instructions){
    program = [];
    // load the instructions
    program = input_instructions.match(/.{1,4}/g);
    for (var i = 0; i < program.length; i++) {
      if ((program[i] !== '') || (program[i] !== ' ') || (program[i] !== '\n')) {
        program[i] = parseInt(program[i],16);
      }
    }
    // clears flags, ram, regsisters
    sx86.clear();
    // take machine code into ram
    sx86_display.load_program(program);
};

var results = [];
var filenames = ["sample1", "sample2"];

// for(var i = 0; i < filenames.length; i++) {
    QUnit.config.autostart = false;
    QUnit.config.testTimeout = 50;
    require(
      [ "tests/testQuestion1", "tests/testQuestion2", "tests/testQuestion3", "tests/testQuestion4"],
      function() {
        QUnit.start();
      }
    );

    QUnit.jUnitReport = function(report) {
        report.results.name = filenames[0];
        results.push(report);
    };
// }