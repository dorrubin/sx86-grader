// Question 2

//Case A
//Test with n = 34
QUnit.module( "testQuestionCase4A", {
  beforeEach: function() {
    sx86.initialize();
  }
});

QUnit.test( "test content of memory address 22", function( assert ) {
  var expecting = submissions.length;
  var c = 0;
  for (var i = 0; i < expecting; i++) {
    var original;
    if(submissions[i].Q4) {
      original = submissions[i].Q4;
    }
    else {
      original = "000000000000";
    }
    var userProgram = original.slice(12,-1);
    // input 6 and 7
    var testInputs = "90039162b005";
    var testProgram = testInputs + userProgram;
    var result = LoadProgram(testProgram);
    assert.equal( result[22], 6, submissions[i].studentID + ": the 22nd memory address should contain 6" );
  }
});


//Case B
//Test with n = 0
QUnit.module( "testQuestionCase4B", {
  beforeEach: function() {
    sx86.initialize();
  }
});

QUnit.test( "test content of memory address 22", function( assert ) {
  var expecting = submissions.length;
  for (var i = 0; i < expecting; i++) {
    var original;
    if(submissions[i].Q4) {
      original = submissions[i].Q4;
    }
    else {
      original = "000000000000";
    }
    var userProgram = original.slice(12,-1);
    // input 6 and 7
    var testInputs = "90439100b044";
    var testProgram = testInputs + userProgram;
    var result = LoadProgram(testProgram);
    assert.equal( result[22], 0, submissions[i].studentID + ": the 22nd memory address should contain 0" );
  }
});

//Case c
//Test with n = 40
QUnit.module( "testQuestionCase4C", {
  beforeEach: function() {
    sx86.initialize();
  }
});

QUnit.test( "test content of memory address 22", function( assert ) {
  var expecting = submissions.length;
  for (var i = 0; i < expecting; i++) {
    var original;
    if(submissions[i].Q4) {
      original = submissions[i].Q4;
    }
    else {
      original = "000000000000";
    }
    var userProgram = original.slice(12,-1);
    // input 6 and 7
    var testInputs = "90039068b001";
    var testProgram = testInputs + userProgram;
    var result = LoadProgram(testProgram);
    assert.equal( result[22], 5, submissions[i].studentID + ": the 22nd memory address should contain 5" );
  }
});


//Case D
//Analyze code
QUnit.module( "testQuestionCase4D", {
  beforeEach: function() {
    sx86.initialize();
  }
});

QUnit.test( "the number of instructions should be within range", function( assert ) {
  for(var i = 0; i < submissions.length; i++) {
    var original;
    if(submissions[i].Q4) {
      original = submissions[i].Q4;
    }
    else {
      original = "000000000000";
    }
    //must have made an attempt -- 50% of solution
    // assert.ok( original.length >= 40, submissions[i].studentID + ": there should be greater than 60 instructions to complete this program" );
    //answer can be done in 68-- give ~50% buffer
    assert.ok( length <= 100, submissions[i].studentID + ": there should be less than 160 instruction characters to complete this program" );
  }
});

QUnit.test( "there can not be repetitive instructions", function( assert ) {
  assert.expect(submissions.length);
  for(var i = 0; i < submissions.length; i++) {
    var original;
    if(submissions[i].Q4) {
      original = submissions[i].Q4;
    }
    else {
      original = "000000000000";
    }
    var length = original.length;
    var noDups = true;
    for(var j = 0; j < length - 4; j += 4) {
      var current = original.slice(j, j + 4);
      var next = original.slice(j + 4, j + 8);
      if(current == next) {
          noDups = false;
          break;
      }
    }
    assert.ok(noDups, submissions[i].studentID + ": there should be no consecutive repeat instructions" );
  }
});