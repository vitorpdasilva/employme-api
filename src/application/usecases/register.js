const ErrorUser = require('../errors/ErroUser')
const User = require('../../domain/entity/user')

async function Register(userRepository, { email, password}) {
  const user = new User(email)
  await user.createPasswordHash(password)
  const userExist = await userRepository.findOneByEmail(user.email)
  if (userExist) {
    throw ErrorUser.AlreadyExists
  }
  const userSaved = await userRepository.register(user)
  return userSaved.toJson()
}

module.exports = {
  Register
}