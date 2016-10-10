// Question 1

//Case A
//No unique inputs
QUnit.module( "testQuestionCase1A", {
  before: function() {
    sx86.initialize();
    LoadProgram('9000904090a490f85002100180433023b0000000');
    sx86_display.run(0);
  }
});

QUnit.test( "test the content of address 2016", function( assert ) {
  assert.equal( sx86.mem.ram[2016], 2016, "the 2016th memory address should contain 2016" );
});


//Case B
//No unique inputs
QUnit.module( "testQuestionCase1B", {
  before: function() {
    sx86.initialize();
    LoadProgram('9000904090a490f85002100180433023b0000000');
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