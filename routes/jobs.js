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
  .post(async (req, res) => {
    console.log({ req });
    const jobs = await Job.find();
    res.json({
      jobs,
      message: 'jobs post success',
    })
  });

module.exports = router;