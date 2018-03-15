import sinon from 'sinon';
import profileController from '../../lib/controllers/profileController';
import { should, } from 'chai';
should();

describe('profileController', function () {
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
      profileController.middleware(req, res, next);
      next.calledOnce.should.be.true;
      isAuthenticated.calledOnce.should.be.true;
    });
    it('should redirect to home if not authenticated', function () {
      const isAuthenticated = sinon.stub(req, 'isAuthenticated').returns(false);
      const mock = sinon.mock(res);
      mock.expects('redirect').once().withExactArgs('/');
      profileController.middleware(req, res, next);
      isAuthenticated.calledOnce.should.be.true;
      mock.verify();
    });
  });
});
