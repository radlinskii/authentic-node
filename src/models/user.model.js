import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: String,
  password: String,
  facebook: Object,
  twitter: Object,
  google: Object,
  todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo',},],
});

module.exports = mongoose.model('User', userSchema, 'users');
