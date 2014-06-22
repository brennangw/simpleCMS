var express = require('express');
var router = express.Router();
var db = require('database').db;

/* GET users listing. */
router.get('/', function(req, res) {
  res.send(req.params.name);
});

module.exports = router;
