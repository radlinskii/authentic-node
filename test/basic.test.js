const assert = require('assert');

describe('Basic Mocha Test', function () {
  it('should fail', function () {
    assert.equal(2,3);
  });
  it('should pass', function () {
    assert.equal(3,3);
  });
});
