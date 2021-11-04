const mongoose = require('mongoose');

const AuthRegisterSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
});

const AuthLoginSchema = new mongoose.Schema({
  username: String,
  password: String,
});

module.exports = mongoose.model('AuthRegister', AuthRegisterSchema);
module.exports = mongoose.model('AuthLogin', AuthLoginSchema);
