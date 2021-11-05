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
    console.log({ req: req.body });
    const jobs = await Job.find();
    res.json({
      jobs,
    })
  });

module.exports = router;