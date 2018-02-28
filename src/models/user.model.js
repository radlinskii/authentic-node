import mongoose from 'mongoose';
import todoSchema from './todo.model';

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  todos: [todoSchema,],
});

module.exports = mongoose.model('User', userSchema, 'users');
