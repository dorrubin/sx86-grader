// Question 2

QUnit.module( "testQuestion2", {
  // before: function() {
  //   // LoadProgram()
  // }
  beforeEach: function() {
    // prepare something before each test
    sx86.initialize();
    LoadProgram('900a9046b001900f9047b001');
    sx86_display.run(0);
  },
  afterEach: function() {
    // clean up after each test
  },
  after: function() {
    // clean up once after all tests are done
  }
});

QUnit.test( "a basic test example 3", function( assert ) {
  assert.equal( sx86.mem.ram[10], 6, "the 10th memory address should contain 6" );
});

QUnit.test( "a basic test example 3", function( assert ) {
  assert.equal( sx86.mem.ram[15], 2, "the 10th memory address should contain 7" );
});
