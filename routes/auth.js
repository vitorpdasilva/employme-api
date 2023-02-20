const router = require('express').Router();
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/User');
const { responseStatus } = require('../constants');
const jwt = require('jsonwebtoken')

router.route('/login')
.post(async (req, res) => {
  const { password, email } = req.body;
  console.log({ password, email })
  
  try {
    const user = await User.findOne({ email }).exec()
    console.log({ user })
      if (!user) {
        return res.status(responseStatus.notFound).json({
          status: responseStatus.notFound,
          message: 'Invalid user or password',
        })
      }
      bcrypt.compare(password, user.passwordHash, (err, isMatch) => {
        console.log({ err, isMatch })
        if (isMatch) {
          User.findByIdAndUpdate(user.id, { accessCount: user.accessCount + 1 })
          const payload = {
            userId: user.id,
            username: user.username,
          }
          const secret = "secretKey"
          const options = { expiresIn: '364d' }
          const token = jwt.sign(payload, secret, options)
          res.json({
            status: responseStatus.success,
            message: 'Login successful',
            user,
            token,
          });
        } else {
          res.json({
            status: responseStatus.notFound,
            message: 'Invalid credentials',
          });
        }
      });
    
  } catch(err) {
    res.status(400);
    res.json({
      message: 'Error logging in, try again.',
      err,
    })
  }
})

router.route('/register')
  .post(async (req, res) => {
    const { email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 9);
      const userData = { 
        email,
        accessCount: 0, 
        passwordHash: hashedPassword, 
        id: uuidv4(), 
      };

      const user = await User(userData).save();
      delete user.passwordHash;
      res.json({
        message: 'User saved',
        user
      })
      
    } catch(err) {
      res.status(400);
      res.json({
        message: 'Error creating the user, try again.',
        err,
      })
    }
  });

module.exports = router;