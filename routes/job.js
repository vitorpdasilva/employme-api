const router = require('express').Router();
const Job = require('../models/Jobs');
const User = require('../models/User')

router.route('/job/:id/apply')
  .post(async (req, res) => {
    console.log({ req: req.body, params: req.params, type: typeof req.params.id });

    // const { nModified } = await Job.updateOne({ id: Number(req.params.id) }, {
    //   applicants: req.body.applicantId 
    // });
    const { nModified } = await Job.updateOne({ id: Number(req.params.id) }, {
      $push: { applicants: req.body.applicantId }
    });
    
    console.log({ nModified })
    
    if (nModified === 0) {
      return res.json({
        status: 'error',
        message: 'User has already applied for this position',
      })
    }
    const userUpdate = await User.findOneAndUpdate({ id: req.body.applicantId }, {
      $push: { appliedIds: req.params.id } 
    })

    console.log({ userUpdate })

    if (userUpdate) {
      res.json({
        status: 'success',
        message: 'Application sucessful',
      });
    }
    
     
    
    
  });

router.route('/job/:id')
  .post(async (req, res) => {
    const job = await Job.findOne({ id: req.params.id }, { applicants: 0 });
    res.json(
      job,
    )
  })

module.exports = router;