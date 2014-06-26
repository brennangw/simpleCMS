var express = require('express');
var router = express.Router();
var db = require('database').db;


/* GET users listing. */

//this still isnt working have a question on SO about it though.

router.get('/:cat', function(req, res) {
    db.Item.find({"cats": {"$in": [req.params.cat]}}, function (err, cats) {
        if (err) return console.error(err);
        cats.map(function (item) {
            console.log(item.name)
        })
        var cat = req.params.cat;
        res.render('cat', {cats: cats, cat: cat, path: '../../item/'});

        //console.log(JSON.stringify(cats));

    });

});

module.exports = router;
