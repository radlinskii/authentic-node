import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  content: String,
  authorUsername: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', },
  date: String,
});

module.exports = mongoose.model('Todo',todoSchema, 'todos');
