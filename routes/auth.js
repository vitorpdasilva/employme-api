const router = require('express').Router();
const bcrypt = require('bcrypt');
const chalk = require('chalk');
const { v4: uuidv4 } = require('uuid');
const passport = require('passport');
const User = require('../models/User');

router.route('/login')
.post(async (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username }, async (err, user) => {
    console.log({ password, user });
    const match = await bcrypt.compare(password, user.passwordHash);
    if (match) {
      console.log(chalk.green('ok logged in'));
    }
  })

})

router.route('/register')
  .post(async (req, res) => {
    const { username, password, name } = req.body;
    console.log(req.body);
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const userData = { 
        username, 
        passwordHash: hashedPassword, 
        name,
        id: uuidv4(), 
      };
      new User(userData).save();
      res.json({
        message: 'user saved',
      });
      
    } catch(err) {
      res.status(400);
      res.json({
        message: 'Error creating the user, try again.',
        err,
      })
    }
  });

module.exports = router;