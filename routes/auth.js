const router = require('express').Router();
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/User');
const { responseStatus } = require('../constants');

router.route('/login')
.post(async (req, res) => {
  const { password, email } = req.body;
  console.log({ password, email });
  User.findOne({ email }, async (err, user) => {
    bcrypt.compare(password, user.passwordHash, (err, isMatch) => {
      console.log({ err, isMatch })
      if (isMatch) {
        User.findByIdAndUpdate(user.id, { accessCount: user.accessCount + 1 })
        res.json({
          status: responseStatus.success,
          message: 'Login successful',
          user,
        });
      } else {
        res.json({
          status: responseStatus.error,
          message: 'Invalid credentials',
        });
      }
    });
  })
})

router.route('/register')
  .post(async (req, res) => {
    const { username, password, name } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 9);
      const userData = { 
        username,
        accessCount: 0, 
        passwordHash: hashedPassword, 
        name,
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