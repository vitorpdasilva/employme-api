const router = require('express').Router();
const User = require('../models/User');

router.route('/user')
  .post(async(req, res) => {
    const user = await User.findOne({ email: req.body.email });
    console.log({ user });
    res.json({
      user
    })
  })
  .patch(async(req, res) => {
    console.log({ req })
    
  })
module.exports = router;