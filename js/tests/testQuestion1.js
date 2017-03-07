// Question 1

//Case A
//No unique inputs
QUnit.module( "testQuestionCase1A", {
  beforeEach: function() {
    sx86.initialize();
  }
});

QUnit.test( "test the content of address 2016", function( assert ) {
  // var expecting = submissions.length;
  // assert.expect(expecting);
  // var done = assert.async(expecting);
  for (var i = 0; i < submissions.length; i++) {
    var result = LoadProgram(submissions[i].Q1);
    assert.equal( result[2016], 2016, submissions[i].studentID + ": the 2016th memory address should contain the value 2016" );
  }
  // done();
});


//Case B
//Analyze Code
QUnit.module( "testQuestionCase1B", {
  beforeEach: function() {
    sx86.initialize();
  }
});

QUnit.test( "the program should be within range of number of instructions", function( assert ) {
  // var expecting = submissions.length;
  // assert.expect(expecting);
  for(var i = 0; i < submissions.length; i++) {
    var original = submissions[i].Q1;
    //must have made an attempt -- 50% of solution
    assert.ok( original.length >= 20, submissions[i].studentID + ": there should be greater than 20 instructions characters to complete this program" );
    // //answer can be done in 40-- give 20% buffer
    assert.ok( original.length <= 50, submissions[i].studentID + ": there should be less than 50 instructions characters to complete this program" );
  }
});

QUnit.test( "there can not be repetitive instructions", function( assert ) {
  var expecting = submissions.length;
  assert.expect(expecting);
  for(var i = 0; i < submissions.length; i++) {
    var length = submissions[i].Q1.length;
    var instruction = submissions[i].Q1;
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