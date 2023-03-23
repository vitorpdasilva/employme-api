const fs = require('fs')
const router = require('express').Router();
const User = require('../models/User');
const { generateJwtToken, connectToMongoDB } = require('../helpers');
const { GridFSBucket, ObjectID } = require('mongodb');

let db;
(async() => {
  db = await connectToMongoDB()
})();

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
router.route('user/save-pdf')
  .post(async(req, res) => {
    try {
      const bucket = new GridFSBucket(db)
      const pdfBuffer  = fs.readFileSync(req.body.pdf)
      const uploadStream = bucket.openUploadStream(req.body.filename)
      const id = new ObjectID()
      const metaData = {
        userId: req.body.userId,
        filename: req.body.filename,
      }
      uploadStream.id = id;
      uploadStream.once('finish', () => {
        console.log('PDF saved successfully');
        res.json({
          id,
          metaData,
        })
      })
      uploadStream.end(pdfBuffer)
    } catch (err) {
      console.error({ err })
    }
  })
module.exports = router;