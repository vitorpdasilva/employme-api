const ErrorUser = require('../errors/ErroUser')
const JwtService = require('../services/jwt')

async function DoLogin(userRepository, { email, password }) {
  const user = await userRepository.findOneByEmail(email)
  if (!user) {
    throw ErrorUser.NotFound
  }
  const isEqual = await user.comparePassword(password)
  if (!isEqual) {
    throw ErrorUser.InvalidCredetials
  }
  user.increaseAccessCount()
  await userRepository.updateAccessCount(user)
  const token = JwtService.generate(user)
  
  return {
    user: user.toJson(),
    token
  }
}

module.exports = {
  DoLogin
}