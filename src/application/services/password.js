const util = require('util')
const bcrypt = require('bcrypt')
const compare = util.promisify(bcrypt.compare)
const hash = util.promisify(bcrypt.hash)

class PasswordService {
  static async compare(password, expectedPassword) {
    try {
      const isMatch = await compare(password, expectedPassword)
      if (!isMatch) {
        throw new Error('Password doesnt match')
      }
      return true
    } catch(err) {
      console.log('Err', err)
      return false
    }
  }

  static async hash(password) {
    return hash(password, 9);
  }
}

module.exports = PasswordService