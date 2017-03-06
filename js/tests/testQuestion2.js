// Question 2

//Case A
//Base Case: Test input 6 and 7
QUnit.module( "testQuestionCase2A", {
  beforeEach: function() {
    sx86.initialize();
  }
});

QUnit.test( "test the content of address 10 and 15", function( assert ) {
  var expecting = submissions.length;
  var done = assert.async(expecting);
  var c = 0;
  var interval = setInterval(function() {
    var original;
    if(submissions[c].Q2) {
      original = submissions[c].Q2;
    }
    else {
      original = "000000000000000000000000";
    }
    var userProgram = original.slice(24,-1);
    // input 6 and 7
    var testInputs = "900a9046b001900f9047b001"; // code to place input 6 and 7 in the registers
    var testProgram = testInputs + userProgram;
    var result = LoadProgram(testProgram);
    // 12 - result of doubling 6
    assert.equal( result[10], 12, submissions[c].studentID + ": the 10th memory address should contain 12" );
    // 21 - result of tripling 7
    assert.equal( result[15], 21, submissions[c].studentID + ": the 15th memory address should contain 21" );
    done();
    c++;
    if(c == expecting) {
      clearInterval(interval);
    }
  }, 25);
});

//Case B
//Corner Case: Test input 0 and 0
QUnit.module( "testQuestionCase2B", {
  beforeEach: function() {
    sx86.initialize();
  }
});

QUnit.test( "test the content of address 10 and 15", function( assert ) {
  var expecting = submissions.length;
  var done = assert.async(expecting);
  var c = 0;
  var interval = setInterval(function() {
    var original;
    if(submissions[c].Q2) {
      original = submissions[c].Q2;
    }
    else {
      original = "000000000000000000000000";
    }
    var userProgram = original.slice(24,-1);
    // input 6 and 7
    var testInputs = "900a9040b001900f9040b001"; // code to place input 0 and 0 in the registers
    var testProgram = testInputs + userProgram;
    var result = LoadProgram(testProgram);
    // 0 - result of doubling 0
    assert.equal( result[10], 0, submissions[c].studentID + ": the 10th memory address should contain 12" );
    // 0 - result of tripling 0
    assert.equal( result[15], 0, submissions[c].studentID + ": the 15th memory address should contain 21" );
    done();
    c++;
    if(c == expecting) {
      clearInterval(interval);
    }
  }, 25);
});

//Case C
//Test load from memory: Test input 6 and 7
QUnit.module( "testQuestionCase2C", {
  beforeEach: function() {
    sx86.initialize();
  }
});

QUnit.test( "test double of memory address 10 and triple of 15", function( assert ) {
  for(var i = 0; i < submissions.length; i++) {
    var original;
    if(submissions[i].Q2) {
      original = submissions[i].Q2;
    }
    else {
      original = "000000000000000000000000";
    }
    var userProgram = original.slice(24,-1);
    // input 6 and 7
    var testInputs = "904a90c6b043910f9087b102";
    var testProgram = testInputs + userProgram;
    var result = LoadProgram(testProgram);
    sx86_display.run(0);
    assert.equal( result[10], 12, submissions[i].studentID + ": the 10th memory address should contain 12" );
    assert.equal( result[15], 21, submissions[i].studentID + ": the 15th memory address should contain 21" );
  }
});

//Case D
//Analyze code
QUnit.module( "testQuestionCase2D", {
  beforeEach: function() {
    sx86.initialize();
  }
});

QUnit.test( "the program should be within range of number of instructions", function( assert ) {
  for(var i = 0; i < submissions.length; i++) {
    var original;
    if(submissions[i].Q2) {
      original = submissions[i].Q2;
    }
    else {
      original = "000000000000000000000000";
    }
    //must have made an attempt -- 50% of solution
    // assert.ok( original.length >= 50, submissions[i].studentID + ": there should be greater than 50 instruction characters to complete this program" );
    // //answer can be done in 100-- give 20% buffer
    assert.ok( original.length <= 120, submissions[i].studentID + ": there should be less than 120 instruction characters to complete this program" );
  }
});

QUnit.test( "there can not be repetitive instructions", function( assert ) {
  for(var i = 0; i < submissions.length; i++) {
    var length = submissions[i].Q2.length;
    var instruction = submissions[i].Q2;
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