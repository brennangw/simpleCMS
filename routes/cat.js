var express = require('express');
var router = express.Router();
var db = require('database').db;

/* GET users listing. */
router.get('/:cat', function(req, res) {
    console.log(typeof req.params.cat);
    var cursor = db.Item.find({ cats: { $elemMatch: req.params.cat}});
    cursor.map( function(myDoc) {console.log("myDoc.name: " + myDoc.name)});

});

module.exports = router;
