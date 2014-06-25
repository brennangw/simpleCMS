var express = require('express');
var router = express.Router();
var db = require('database').db;

/* GET users listing. */
router.get('/:cat', function(req, res) {

    var cursor = db.items.find({ cats: { $elemMatch: req.params.cat}});
    

});

module.exports = router;
