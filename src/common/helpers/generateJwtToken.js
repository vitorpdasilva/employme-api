const jwt = require('jsonwebtoken')

const generateJwtToken = (user) => {
  const payload = {
    userId: user.id,
    username: user.username,
  }
  const secret = "secretKey"
  const options = { expiresIn: '364d' }
  const token = jwt.sign(payload, secret, options)
  return token;
};

module.exports = {
  generateJwtToken
}