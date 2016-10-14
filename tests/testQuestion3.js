// Question 2

//Case A
//Test with a = 3, b = 4, c = 5, d = 2
QUnit.module( "testQuestionCase3A", {
  beforeEach: function() {
    sx86.initialize();
  }
});

QUnit.test( "test content of memory address 30", function( assert ) {
  for(var i = 0; i < submissions.length; i++) {
    var original = submissions[i].Q3;
    var userProgram = original.slice(48,-1);
    // input a = 3, b = 4, c = 5, d = 2
    var testInputs = "90019043b00190029044b00190039045b00190049042b001";
    var testProgram = testInputs + userProgram;
    LoadProgram(testProgram);
    sx86_display.run(0);
    assert.equal( sx86.mem.ram[30], 15, submissions[i].studentID + ": the 30th memory address should contain 5" );
  }
});


//Case B
//Test with a = 0, b = 0, c = 0, d = 0
QUnit.module( "testQuestionCase3B", {
  beforeEach: function() {
    sx86.initialize();
  }
});

QUnit.test( "test content of memory address 30", function( assert ) {
  for(var i = 0; i < submissions.length; i++) {
    var original = submissions[i].Q3;
    var userProgram = original.slice(48,-1);
    var testInputs = "90019040b00190029040b00190039040b00190049040b001";
    var testProgram = testInputs + userProgram;
    LoadProgram(testProgram);
    sx86_display.run(0);
    assert.equal( sx86.mem.ram[30], 0, submissions[i].studentID + ": the 30th memory address should contain 0" );
  }
});

//Case C
//Test with a = 3, b = 4, c = 5, d = 2
QUnit.module( "testQuestionCase3C", {
  beforeEach: function() {
    sx86.initialize();
  }
});

QUnit.test( "test content of memory address 30", function( assert ) {
  for(var i = 0; i < submissions.length; i++) {
    var original = submissions[i].Q3;
    var userProgram = original.slice(48,-1);
    // input a = 3, b = 4, c = 5, d = 2
    var testInputs = "91419103b144914290c4b14390c39105b0c490c49102b0c4";
    var testProgram = testInputs + userProgram;
    LoadProgram(testProgram);
    sx86_display.run(0);
    assert.equal( sx86.mem.ram[30], 15, submissions[i].studentID + ": the 30th memory address should contain 5" );
  }
});

//Case D
//Analyze code
QUnit.module( "testQuestionCase3D", {
  beforeEach: function() {
    sx86.initialize();
  }
});

QUnit.test( "the number of instructions should be within range", function( assert ) {
  for(var i = 0; i < submissions.length; i++) {
    var original = submissions[i].Q3;
    //must have made an attempt -- 50% of solution
    // assert.ok( original.length >= 60, submissions[i].studentID + ": there should be greater than 60 instructions to complete this program" );
    // //answer can be done in 128-- give ~20% buffer
    assert.ok( length <= 160, submissions[i].studentID + ": there should be less than 160 instruction characters to complete this program" );
  }
});

QUnit.test( "there can not be repetitive instructions", function( assert ) {
  for(var i = 0; i < submissions.length; i++) {
    var instruction = submissions[i].Q3;
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