const status = require('http-status')
const router = require('express').Router()
const { DoLogin } = require('../../../application/usecases/do-login')
const { Register } = require('../../../application/usecases/register')
const MongoUserRepository = require('../../repository/mongo/user.repository')

router
  .post('/login', async (req, res) => {
    const { password, email } = req.body
    try {
      const result = await DoLogin(MongoUserRepository, { email, password})
      res.json(result)
    } catch (error) {
      res.status(error.status || status.INTERNAL_SERVER_ERROR)
      res.json({
        message: error.message,
      })
    }
    
  })
  .post('/register', async (req, res) => {
    const { email, password, name } = req.body
    try {
      const user = await Register(MongoUserRepository, { email, password, name })

      res.json(user)
    } catch(error) {
      console.log('Err', error)
      res.status(error.status || status.INTERNAL_SERVER_ERROR)
      res.json({
        message: error.message,
      })
    }
  })

module.exports = router