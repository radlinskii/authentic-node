import User from '../../lib/models/User';
import mongoose from 'mongoose';
import { should, } from 'chai';

should();

describe('User Model', function () {
  let user = {};
  const id = new mongoose.Types.ObjectId();
  beforeEach(function () {
    user = new User({
      _id: id,
      username: 'test',
      email: 'test',
      password: 'test',
      githubID: 'test',
      githubName: 'test',
    });
  });
  describe('on creation', function () {
    it('has a valid id', function () {
      user._id.should.equal(id);
    });
    it('has a valid username', function () {
      user.username.should.equal('test');
    });
    it('has a valid email', function () {
      user.email.should.equal('test');
    });
    it('has a valid password', function () {
      user.password.should.equal('test');
    });
    it('has a valid githubID', function () {
      user.githubID.should.equal('test');
    });
    it('has a valid githubName', function () {
      user.githubName.should.equal('test');
    });
  });
  describe('can manage password', function () {
    it('can hash it', function () {
      user.password = user.generateHash(user.password);
      user.password.should.not.equal('test');
    });
    it('can verify it', function () {
      user.password = user.generateHash(user.password);
      user.validPassword('test').should.be.true;
    });
  });
});

