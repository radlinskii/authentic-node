import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: String,
  password: String,
  githubID: String,
  githubName: String,
  githubEmail: String,
  githubAvatarUrl: String,
});

userSchema.methods.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema, 'users');
