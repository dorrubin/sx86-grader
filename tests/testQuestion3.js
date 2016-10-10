// Question 2

//Case A
//Test with a = 3, b = 4, c = 5, d = 2
QUnit.module( "testQuestionCase3A", {
  before: function() {
    sx86.initialize();
    LoadProgram('90019043b00190029044b00190039045b00190049042b0019041c0419082c08290c3c0c39104c104914090008002403a51411000203560c450c5901eb0030000');
    sx86_display.run(0);
  }
});

QUnit.test( "test content of register 30", function( assert ) {
  assert.equal( sx86.mem.ram[30], 15, "the 30th memory address should contain 5" );
});


//Case B
//Test with a = 0, b = 0, c = 0, d = 0
QUnit.module( "testQuestionCase3B", {
  before: function() {
    sx86.initialize();
    var allZeros = "90019040b00190029040b00190039040b00190049040b0019041c0419082c08290c3c0c39104c104914090008002403a51411000203560c450c5901eb0030000";
    LoadProgram(allZeros);
    sx86_display.run(0);
  }
});

QUnit.test( "test double of memory address 30", function( assert ) {
  assert.equal( sx86.mem.ram[30], 0, "the 30th memory address should contain 0" );
});


//Case C
//Analyze code
QUnit.module( "testQuestionCase3C", {
  before: function() {
    sx86.initialize();
    var allZeros = "90019040b00190029040b00190039040b00190049040b0019041c0419082c08290c3c0c39104c104914090008002403a51411000203560c450c5901eb0030000";
    LoadProgram(allZeros);
    sx86_display.run(0);
  }
});

QUnit.test( "there should not be more than 10 instructions", function( assert ) {
    var length = sx86.mem.raw_instruction.length;
    assert.ok( length <= 35, "there should be less than 35 instructions to complete this program" );
});

QUnit.test( "there can not be repetitive instructions", function( assert ) {
    var length = sx86.mem.raw_instruction.length;
    var instruction = sx86.mem.raw_instruction;
    var noDups = true;
    for(var i = 0; i < length - 1; i++) {
        if(instruction[i] == instruction[i + 1]) {
            noDups = false;
        }
    }
  assert.ok(noDups, "there should be no consecutive repeat instructions" );
});