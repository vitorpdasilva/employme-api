const router = require('express').Router();
const Jobs = require('../models/Jobs');

router.route('/jobs')
  .post(async (req, res) => {
    const jobs = await Jobs.find();
    res.json({
      jobs,
    })
  });

module.exports = router;