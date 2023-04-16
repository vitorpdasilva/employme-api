const fs = require('fs')
const router = require('express').Router();
const User = require('../models/User');
const UserImage = require('../models/UserImage');
const { generateJwtToken, upload } = require('../helpers');
const { GridFSBucket, ObjectID } = require('mongodb');
const { v4: uuidv4 } = require('uuid');

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
  router.route('/user/image').post(upload.single('picture'), async (req, res) => {
    console.log({ body: req.body, file: req.file })
    
    if (!req.file) {
      return res.status(400).send('No file uploaded.')
    }
    
    const { filename, originalname: originalName, mimetype, size } = req.file;
    const image = new UserImage({
      filename: `${req.body.username}-${uuidv4()}-${filename}`,
      originalName,
      mimetype,
      size,
      createdDate: new Date(),
    });
  
    try {
      await image.save();
  
      const updatedUser = await User.findOneAndUpdate({ id: req.body.id }, { picture: image }, { new: true });
  
      if (!updatedUser) {
        return res.status(404).send('User not found.');
      }
  
      const token = generateJwtToken(updatedUser)
      res.json({
        user: updatedUser,
        token,
      })
    } catch (err) {
      console.error({ err });
      res.status(500).send('Server error.');
    } finally {
      console.log("finally")
    }
  });
router.route('user/save-pdf')
  .post(async(req, res) => {
    try {
      const pdfBuffer  = fs.readFileSync(req.body.pdf)
      const id = new ObjectID()
      const metaData = {
        userId: req.body.userId,
        filename: req.body.filename,
      }
      console.log({ pdfBuffer, id, metaData })
    } catch (err) {
      console.error({ err })
    }
  })
module.exports = router;