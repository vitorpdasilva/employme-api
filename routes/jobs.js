const router = require('express').Router();
const Job = require('../models/Jobs');

router.route('/jobs')
  .get(function (req, res) {
    Job.find({ id: 0 }, (err, job) => {
      res.json({
        message: 'success',
        job,
      })
    })
  })
  .post((req, res) => {
    res.json({
      message: 'post /jobs'
    })
  });

module.exports = router;