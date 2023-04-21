const fs = require('fs')
const router = require('express').Router();
const User = require('../../database/models/User');
const { generateJwtToken, upload } = require('../../../common/helpers');
const { ObjectID } = require('mongodb');

router.route('/user')
  .post(async(req, res) => {
    const user = await User.findOne({ email: req.body.email });
    console.log({ user });
    
    res.json({
      user
    })
  })
  .patch(async(req, res) => {
    console.log({ body: req.body, })
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
  
router.route('/user/save-pdf')
  .post(upload.single('pdf'), async(req, res) => {
    try {
      const pdfBuffer  = fs.readFileSync(req.file.path);
      const id = new ObjectID()
      const metaData = {
        userId: req.body.userId,
        filename: req.body.filename,
      }
      console.log({ pdfBuffer: pdfBuffer.toString('base64'), id, metaData })
    } catch (err) {
      console.error({ err })
    }
    res.json({ ok: true })
  })
module.exports = router;