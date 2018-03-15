import Todo from '../../lib/models/Todo';
import mongoose from 'mongoose';
import { should, } from 'chai';
should();

describe('Todo Model', function () {
  describe('on creation', function () {
    let todo = {};
    const id = new mongoose.Types.ObjectId();
    before(function () {
      todo = new Todo({ _id: id, content: 'test', authorUsername: 'testUser', author: id, date: 'date', });
    });
    todo = new Todo({ _id: id, content: 'test', authorUsername: 'testUser', author: id, date: 'date', });
    it('has a valid id', function () {
      todo._id.should.equal(id);
    });
    it('has a valid content', function () {
      todo.content.should.equal('test');
    });
    it('has a valid authorUsername', function () {
      todo.authorUsername.should.equal('testUser');
    });
    it('has a valid author id', function () {
      todo.author.should.equal(id);
    });
    it('has a valid date', function () {
      todo.date.should.equal('date');
    });
  });
});

