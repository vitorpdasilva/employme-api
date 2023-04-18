const PasswordService = require("../../application/services/password")

class User {
  #email = ''
  #accessCount = 0
  #passwordHash = ''
  #id = ''

  constructor(email, id = '') {
    this.#email = email
    this.#id = id
  }

  async comparePassword(password) {
    return PasswordService.compare(password, this.#passwordHash);
  }
  
  async createPasswordHash(password) {
    this.#passwordHash = await PasswordService.hash(password)
  }

  set id(id) {
    this.#id = id.toString()
  }

  get id() {
    return this.#id
  }

  /**
   * @param {string} passwordHash
   */
  set passwordHash(passwordHash) {
    this.#passwordHash = passwordHash
  }

  get passwordHash() {
    return this.#passwordHash
  }

  get accessCount() {
    return this.#accessCount
  }

  get email() {
    return this.#email
  }

  increaseAccessCount(value = 1) {
    this.#accessCount += value || 0
  }

  toJson() {
    return {
      id: this.#id,
      email: this.#email,
      passwordHash: this.#passwordHash,
      accessCount: this.#accessCount
    }
  }
}

module.exports = User