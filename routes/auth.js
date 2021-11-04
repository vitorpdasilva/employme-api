const router = require('express').Router();
const bcrypt = require('bcrypt');
const chalk = require('chalk');
const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');
router.route('/login')
  .post(async (req, res) => {
    console.log({ req });
    try {
      
    } catch {

    }
  });

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