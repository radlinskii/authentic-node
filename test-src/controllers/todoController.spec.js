import sinon from 'sinon';
import todoController from '../../lib/controllers/todoController';
import { should, } from 'chai';
should();

describe('TodoController', function () {
  describe('addZeros', function () {
    it('should add zero to number lower than 10', function () {
      todoController.addZeros('1').should.equal('01');
    });
    it('should not add zero to number greater than 10', function () {
      todoController.addZeros('11').should.equal('11');
    });
  });
  describe('Middleware', function () {
    let req;
    let res;
    let next;
    beforeEach(function () {
      req = {
        flash: sinon.spy(),
        isAuthenticated: function () {},
      };
      res = {
        redirect: function () {},
      };
      next = sinon.spy();
    });
    it('should call next if authenticated', function () {
      const isAuthenticated = sinon.stub(req, 'isAuthenticated').returns('true');

      todoController.middleware(req, res, next);

      next.calledOnce.should.be.true;
      isAuthenticated.calledOnce.should.be.true;
    });
    it('should redirect to home if not authenticated', function () {
      const isAuthenticated = sinon.stub(req, 'isAuthenticated').returns(false);
      const mock = sinon.mock(res);

      mock.expects('redirect').once().withExactArgs('/');

      todoController.middleware(req, res, next);

      isAuthenticated.calledOnce.should.be.true;
      mock.verify();
    });
  });
});
