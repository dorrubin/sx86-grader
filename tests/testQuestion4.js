// Question 2

//Case A
//Test with n = 22
QUnit.module( "testQuestionCase4A", {
  before: function() {
    sx86.initialize();
    var n22 = '90019056b0019041c001904790808002402d100280813026600120259116b1020000'
    LoadProgram(n22);
    sx86_display.run(0);
  }
});

QUnit.test( "test content of register 22", function( assert ) {
  assert.equal( sx86.mem.ram[22], 1, "the 22nd memory address should contain 1" );
});


//Case B
//Test with n = 0
QUnit.module( "testQuestionCase4B", {
  before: function() {
    sx86.initialize();
    var n0 = "90019047b0019041c001904790808002402d100280813026600120259116b1020000F18";
    LoadProgram(n0);
    sx86_display.run(0);
  }
});

QUnit.test( "test double of memory address 22", function( assert ) {
  assert.equal( sx86.mem.ram[22], 0, "the 22nd memory address should contain 0" );
});

//Case c
//Test with n = 40
QUnit.module( "testQuestionCase4C", {
  before: function() {
    sx86.initialize();
    var n40 = "90019068b0019041c001904790808002402d100280813026600120259116b1020000";
    LoadProgram(n40);
    sx86_display.run(0);
  }
});

QUnit.test( "test double of memory address 22", function( assert ) {
  assert.equal( sx86.mem.ram[22], 5, "the 22nd memory address should contain 5" );
});

//Case C
//Analyze code
QUnit.module( "testQuestionCase3C", {
  before: function() {
    sx86.initialize();
    var n40 = "90019068b0019041c001904790808002402d100280813026600120259116b1020000";
    LoadProgram(n40);
    sx86_display.run(0);
  }
});

QUnit.test( "there should not be more than 10 instructions", function( assert ) {
    var length = sx86.mem.raw_instruction.length;
    assert.ok( length <= 20, "there should be less than 35 instructions to complete this program" );
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