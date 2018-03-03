import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: String,
  password: String,
  facebook: Object,
  twitter: Object,
  google: Object,
});

module.exports = mongoose.model('User', userSchema, 'users');
