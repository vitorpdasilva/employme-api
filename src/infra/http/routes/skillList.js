const router = require('express').Router();
const SkillList = require('../../database/models/SkillList');

router.route('/skill-list')
  .post(async(req, res) => {
    const skillList = await SkillList.find();
    res.json({
      message: 'test success',
      skillList
    })
  })
module.exports = router;