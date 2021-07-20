const router = require('express').Router();

router.route('/jobs')
  .get(function (req, res) {
    res.json({ message: 'get jooooobs' })
  })
  .post((req, res) => {
    res.json({
      message: 'post /jobs'
    })
  });

module.exports = router;