const router = require('express').Router();
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/User');

router.route('/login')
.post(async (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username }, async (err, user) => {
    const match = await bcrypt.compare(password, user.passwordHash);
    if (match) {
      User.findByIdAndUpdate(user.id, { accessCount: user.accessCount + 1 });
      res.json({
        user,
        message: 'success',
      })
    }
  })

})

router.route('/register')
  .post(async (req, res) => {
    const { username, password, name } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
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