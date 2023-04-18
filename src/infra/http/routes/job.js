const router = require('express').Router()
const Jobs = require('../../database/models/Jobs');
const User = require('../../database/models/user');

const { responseStatus } = require('../../../../constants')

router
  .post('/:id/apply', async (req, res) => {
    const { nModified } = await Jobs.updateOne({ id: req.params.id }, {
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
  })
  .post('/:id', async (req, res) => {
    const job = await Jobs.findOne({ id: req.params.id }, { applicants: 0 });
    res.json(job)
  })

module.exports = router;