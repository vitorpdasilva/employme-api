const mongoose = require('mongoose');

const AuthRegisterSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
});

const AuthLoginSchema = new mongoose.Schema({
  username: String,
  password: String,
});

module.exports = mongoose.model('AuthRegister', AuthRegisterSchema, "users");
module.exports = mongoose.model('AuthLogin', AuthLoginSchema);
