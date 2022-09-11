const router = require('express').Router();
const Job = require('../models/Jobs');

router.route('/job/:id/apply')
  .post(async (req, res) => {
    console.log({ req: req.body });

    const { nModified } = await Job.findOne({ id: req.params.id }).updateOne({
      $addToSet: { applicants: req.body.applicantId },
    });

    if (nModified === 0) {
      res.json({
        status: 'error',
        message: 'User has already applied for this position',
      })
    } else {
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