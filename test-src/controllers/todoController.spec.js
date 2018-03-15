import assert from 'assert';
const todoController = require('../../lib/controllers/todoController');
describe('TodoController', function () {
  describe('addZeros', function () {
    it('should add zero to number lower than 10', function () {
      assert.equal('01', todoController.addZeros('1'));
    });
    it('should not add zero to number greater than 10', function () {
      assert.notEqual('011', todoController.addZeros('11'));
    });
  });
});
