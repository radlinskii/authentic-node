import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  content: String,
  date: {type: Date, default: Date.now,},
});

module.exports = mongoose.model('Todo',todoSchema, 'users');
