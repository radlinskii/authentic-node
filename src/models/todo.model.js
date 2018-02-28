import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  content: String,
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'User',},
  date: {type: Date, default: Date.now,},
});

module.exports = mongoose.model('Todo',todoSchema, 'todos');
