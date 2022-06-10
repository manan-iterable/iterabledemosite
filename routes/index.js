var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/first', function(req, res, next) {
  res.send(`This is index page.`);
});

module.exports = router;
