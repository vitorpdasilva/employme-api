const PasswordService = require("../../application/services/password")

class User {
  #email = ''
  #name = ''
  #accessCount = 0
  #passwordHash = ''
  #id = ''
  #username = ''
  #picture = ''
  #general = {}
  #professionalOverview = {}
  #relocation = {}
  #preferences = {}
  #culture = {}
  #social = []
  #education = []
  #jobsApplied = []

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

  set name(name) {
    this.#name = name
  }

  set username(username) {
    this.#username = username
  }

  get passwordHash() {
    return this.#passwordHash
  }

  get accessCount() {
    return this.#accessCount
  }

  get email () {
    return this.#email
  }

  set email(email) {
    this.#email = email
  }

  set picture(picture) {
    this.#picture = picture
  }

  set general(param) {
    this.#general = param
  }

  set professionalOverview(param) {
    this.#professionalOverview = param
  }

  set relocation(param) {
    this.#relocation = param
  }

  set preferences(param) {
    this.#preferences = param
  }

  set culture(param) {
    this.#culture = param
  }

  set jobsApplied(param) {
    this.#jobsApplied = param
  }

  set social(param) {
    this.#social = param
  }

  set education(param) {
    this.#education = param
  }

  increaseAccessCount(value = 1) {
    this.#accessCount += value || 0
  }

  toJson() {
    return {
      name: this.#name,
      id: this.#id,
      email: this.#email,
      passwordHash: this.#passwordHash,
      accessCount: this.#accessCount,
      username: this.#username,
      picture: this.#picture,
      general: this.#general,
      professionalOverview: this.#professionalOverview,
      relocation: this.#relocation,
      preferences: this.#preferences,
      culture: this.#culture,
      social: this.#social,
      education: this.#education,
      jobsApplied: this.#jobsApplied,
    }
  }
}

module.exports = User