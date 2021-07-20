const router = require('express').Router();
const Job = require('../models/Jobs');

router.route('/jobs')
  .get(function (req, res) {
    Job.find({ id: 0 }, (err, job) => {
      console.log({ job });
      res.json({
        message: 'success',
        job,
        err,
      })
    })
  })
  .post((req, res) => {
    res.json({
      message: 'post /jobs'
    })
  });

module.exports = router;