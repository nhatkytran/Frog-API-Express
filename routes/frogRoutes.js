const express = require('express');

const {
  convertIDToNumber,
  checkID,
  checkNewFrog,
  getAllFrogs,
  getFrog,
  addFrog,
} = require('../controllers/frogController');

const router = express.Router();

router.param('id', convertIDToNumber);
router.param('id', checkID);

router.route('/').get(getAllFrogs).post(checkNewFrog, addFrog);

router.route('/:id').get(getFrog);

module.exports = router;
