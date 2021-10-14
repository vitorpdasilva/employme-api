const router = require('express').Router();
const User = require('../models/User');

router.route('/user')
  .post(async(req, res) => {
    console.log({ req });
    const user = await User.find();
    console.log({ user });
    res.json({
      message: 'test success',
      user
    })
  })
module.exports = router;