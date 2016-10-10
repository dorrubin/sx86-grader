// Question 2

//Case A
//Test input 6 and 7
QUnit.module( "testQuestionCase2A", {
  before: function() {
    sx86.initialize();
    LoadProgram('900a9046b001900f9047b001');
    sx86_display.run(0);
  }
});

QUnit.test( "test double of memory address 10", function( assert ) {
  assert.equal( sx86.mem.ram[10], 6, "the 10th memory address should contain 12" );
});

QUnit.test( "test triple of memory address 15", function( assert ) {
  assert.equal( sx86.mem.ram[15], 7, "the 15th memory address should contain 21" );
});

//Case B
//Test input 0 and 0
QUnit.module( "testQuestionCase2B", {
  before: function() {
    sx86.initialize();
    LoadProgram('900a9040b001900f9040b001');
    sx86_display.run(0);
  }
});

QUnit.test( "test double of memory address 10", function( assert ) {
  assert.equal( sx86.mem.ram[10], 0, "the 10th memory address should contain 0" );
});

QUnit.test( "test double of memory address 15", function( assert ) {
  assert.equal( sx86.mem.ram[15], 0, "the 10th memory address should contain 0" );
});

//Case C
//Analyze code
QUnit.module( "testQuestionCase2C", {
  before: function() {
    sx86.initialize();
    LoadProgram('900a9040b001900f9040b001');
    sx86_display.run(0);
  }
});

QUnit.test( "there should not be more than 10 instructions", function( assert ) {
    var length = sx86.mem.raw_instruction.length;
    assert.ok( length <= 10, "there should be less than 10 instructions to complete this program" );
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