const router = require('express').Router();
const Job = require('../models/Jobs');

router.route('/job/:id/apply')
  .post(async (req, res) => {
    console.log({ req: req });
    res.json({
      message: `ok got it, ${JSON.stringify(req.body)}`,
    });
  });

router.route('/job/:id')
  .post(async (req, res) => {
    const job = await Job.findOne({ id: req.params.id });
    res.json(
      job,
    )
  })

module.exports = router;