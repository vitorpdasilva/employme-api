const router = require('express').Router();
const Jobs = require('../models/Jobs');

router.route('/jobs')
  .get(async (req, res) => {
    const jobs = await Jobs.find();
    res.json({
      jobs,
    })
  })
  .post(async (req, res) => {
    const { title, location, locationType, salary } = req;
    console.log({ req, res })
    if (!title || !location || !locationType || !salary) {
      res.status(500).send('Some field wasnt provided')
    }
  })
  ;

module.exports = router;