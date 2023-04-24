const User = require('../../../domain/entity/user')
const UserModel = require('../../database/models/User')

class MongoUserRepository {

  static async findOneByEmail(email) {
    const userDb = await UserModel.findOne({ email }).exec()
    if (!userDb) {
      return null
    }
    
    const user = new User(userDb.email)
    user.name = userDb.name
    user.username = userDb.username
    user.passwordHash = userDb.passwordHash
    user.id = userDb._id
    user.increaseAccessCount(userDb.accessCount)
    user.picture = userDb.picture
    user.general = userDb.general
    user.professional = userDb.professional
    user.relocation = userDb.relocation
    user.preferences = userDb.preferences
    user.culture = userDb.culture
    user.social = userDb.social
    user.jobsApplied = userDb.jobsApplied
    user.education = userDb.education
    return user
  }

  static async updateAccessCount(user) {
    console.log({ accessCount: user.accessCount })
    await UserModel.findByIdAndUpdate(user.id, { accessCount: user.accessCount })
  }

  static async register(user) {
    // eslint-disable-next-line no-unused-vars
    const { ...userJson} = user.toJson()
    await UserModel(userJson).save()
    
    return user
  }
}

module.exports = MongoUserRepository