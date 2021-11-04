const router = require('express').Router();
const bcrypt = require('bcrypt');
const {AuthRegister, AuthLogin } = require('../models/Auth'); 

router.route('/login')
  .post(async (req, res) => {
    console.log({ req });
    try {
      
    } catch {

    }
  });

router.route('/register')
  .post(async (req, res) => {
    const { username, password, firstName, lastName } = req?.body;
    console.log({ req });
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const registerUser = await AuthRegister.save
      
    } catch {

    }
  });

module.exports = router;