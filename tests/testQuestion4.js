// Question 2

//Case A
//Test with n = 29
QUnit.module( "testQuestionCase4A", {
  beforeEach: function() {
    sx86.initialize();
  }
});

QUnit.test( "test content of register 22", function( assert ) {
  for(var i = 0; i < submissions.length; i++) {
    var original = submissions[i].question4;
    var userProgram = original.slice(12,-1);
    var testInputs = "9001905db001";
    var testProgram = testInputs + userProgram;
    LoadProgram(testProgram);
    sx86_display.run(0);
    assert.equal( sx86.mem.ram[22], 1, submissions[i].studentID + ": the 22nd memory address should contain 1" );
  }
});


//Case B
//Test with n = 0
QUnit.module( "testQuestionCase4B", {
  beforeEach: function() {
    sx86.initialize();
  }
});

QUnit.test( "test double of memory address 22", function( assert ) {
  for(var i = 0; i < submissions.length; i++) {
    var original = submissions[i].question4;
    var userProgram = original.slice(12,-1);
    var testInputs = "90019040b001";
    var testProgram = testInputs + userProgram;
    LoadProgram(testProgram);
    sx86_display.run(0);
    assert.equal( sx86.mem.ram[22], 0, submissions[i].studentID + ": the 22nd memory address should contain 0" );
  }
});

//Case c
//Test with n = 40
QUnit.module( "testQuestionCase4C", {
  beforeEach: function() {
    sx86.initialize();
  }
});

QUnit.test( "test double of memory address 22", function( assert ) {
  for(var i = 0; i < submissions.length; i++) {
   var original = submissions[i].question4;
    var userProgram = original.slice(12,-1);
    var testInputs = "91419128b144";
    var testProgram = testInputs + userProgram;
    LoadProgram(testProgram);
    sx86_display.run(0);
    assert.equal( sx86.mem.ram[22], 5, submissions[i].studentID + ": the 22nd memory address should contain 5" );
  }
});

//Case C
//Analyze code
QUnit.module( "testQuestionCase4D", {
  beforeEach: function() {
    sx86.initialize();
  }
});

QUnit.test( "there should not be more than 10 instructions", function( assert ) {
  for(var i = 0; i < submissions.length; i++) {
    var original = submissions[i].question4;
    //must have made an attempt -- 50% of solution
    assert.ok( original.length >= 40, submissions[i].studentID + ": there should be greater than 60 instructions to complete this program" );
    //answer can be done in 68-- give ~50% buffer
    assert.ok( length <= 100, submissions[i].studentID + ": there should be less than 160 instruction characters to complete this program" );
  }
});

QUnit.test( "there can not be repetitive instructions", function( assert ) {
  for(var i = 0; i < submissions.length; i++) {
    var instruction = submissions[i].question4;
    var length = instruction.length;
    var noDups = true;
    for(var j = 0; j < length - 4; j += 4) {
      var current = instruction.slice(j, j + 4);
      var next = instruction.slice(j + 4, j + 8);
      if(current == next) {
          noDups = false;
          break;
      }
    }
    assert.ok(noDups, submissions[i].studentID + ": there should be no consecutive repeat instructions" );
  }
});