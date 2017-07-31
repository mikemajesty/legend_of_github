const express = require('express');
const router = express.Router();

router.use('/streak', require('./streak/router'));

router.use('/*', (req, res) => {
  res.status(404).send();
});

module.exports = router;