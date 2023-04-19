const ErrorUser = require('../errors/ErroUser')
const User = require('../../domain/entity/user')
const JwtService = require('../services/jwt')

async function Register(userRepository, { email, password, name }) {
  const user = new User(email)
  await user.createPasswordHash(password)
  const userExist = await userRepository.findOneByEmail(user.email)
  if (userExist) {
    throw ErrorUser.AlreadyExists
  }
  
  // TODO: check this. If we remove this line, Mongo will throw an error because the id is empty and it's required to save the user
  user.id = `${Math.random() * 123456}-${Math.random() * 123456}`
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