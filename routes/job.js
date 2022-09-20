const router = require('express').Router();
const Job = require('../models/Jobs');
const User = require('../models/User')
const { responseStatus } = require('../constants');

router.route('/job/:id/apply')
  .post(async (req, res) => {
    
    const { nModified } = await Job.updateOne({ id: req.params.id }, {
      applicants: req.body.applicantId 
    });
    
    if (nModified === 0) {
      return res.json({
        status: responseStatus.error,
        message: 'User has already applied for this position',
      })
    }

    const userUpdate = await User.findOneAndUpdate(
      { id: req.body.applicantId},
      { $push: { jobsApplied: req.params.id } }
    )

    if (userUpdate) {
      res.json({
        status: responseStatus.success,
        message: 'Application sucessful',
      });
    } else {
      res.json({
        status: responseStatus.error,
        message: 'User not found',
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