const router = require('express').Router();
const User = require('../models/User');
const { generateJwtToken } = require('../helpers/generateJwtToken');

router.route('/user')
  .post(async(req, res) => {
    const user = await User.findOne({ email: req.body.email });
    console.log({ user });
    res.json({
      user
    })
  })
  .patch(async(req, res) => {
    console.log({ req: req.body })
    try {
      const updatedUser = await User.findOneAndUpdate(
        { id: req.body.id }, 
        { ...req.body },
        { new: true }  
      )
      const token = generateJwtToken(updatedUser)
      res.json({
        user: updatedUser,
        token,
      })
    } catch (err) {
      console.error({ err })
    }

  })
module.exports = router;