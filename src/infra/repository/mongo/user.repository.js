const User = require('../../../domain/entity/user')
const UserModel = require('../../database/models/user')

class MongoUserRepository {

  static async findOneByEmail(email) {
    const userDb = await UserModel.findOne({ email }).exec()
    if (!userDb) {
      return null
    }
    const user = new User(userDb.email)
    user.passwordHash = userDb.passwordHash
    user.id = userDb._id
    user.increaseAccessCount(userDb.accessCount)
    return user
  }

  static async updateAccessCount(user) {
    console.log('ID', user.accessCount)
    await UserModel.findByIdAndUpdate(user.id, { accessCount: user.accessCount })
  }

  static async register(user) {
    // eslint-disable-next-line no-unused-vars
    const { id: _, ...userJson} = user.toJson()
    const userDb = await UserModel(userJson).save()
    user.id = userDb._id
    return user
  }
}

module.exports = MongoUserRepository