const ErrorUser = require('../errors/ErroUser')
const User = require('../../domain/entity/user')
const JwtService = require('../services/jwt')
const { v4: uuidv4 } = require('uuid');

async function Register(userRepository, { email, password, name }) {
  const user = new User(email)
  await user.createPasswordHash(password)
  const userExist = await userRepository.findOneByEmail(user.email)
  if (userExist) {
    throw ErrorUser.AlreadyExists
  }
  
  user.id = uuidv4()
  user.name = name
  const userSaved = await userRepository.register(user)
  const token = JwtService.generate(user)
  return {
    user: userSaved.toJson(),
    token
  }
}

module.exports = {
  Register
}