var express = require('express');
var router = express.Router();
var db = require('database').db;


/* GET users listing. */

//this still isnt working have a question on SO about it though.

router.get('/:cat', function(req, res) {
    db.Item.find({"cats": {"$in": req.params.cat}}, function (err, cats) {
        if (err) return console.error(err);
        console.log(JSON.stringify(cats, undefiend, 4));
    });

});

module.exports = router;
