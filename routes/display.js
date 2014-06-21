var express = require('express');
var db = require('database').db;
var router = express.Router();

/* GET home page. */

-

router.get('/', function(req, res) {
    console.log("get");
    db.Item.find(function (err, items) {
	items.forEach( function (item) {console.log(item.name)});
    });
    res.render('index', { title: 'Express' });
});

module.exports = router;
