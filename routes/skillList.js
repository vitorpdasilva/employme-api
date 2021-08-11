const router = require('express').Router();
const SkillList = require('../models/SkillList');
router.route('/skill-list')
  .get(async(req, res) => {
    const skillList = await SkillList.find();
    res.json({
      message: 'test success',
      skillList
    })
  })
module.exports = router;