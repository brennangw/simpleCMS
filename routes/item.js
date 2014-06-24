var express = require('express');
var router = express.Router();
var db = require('database').db;

/* GET users listing. */
router.get('/:name', function(req, res) {
    db.Item.findOne({ name : req.params.name}, function (err, item) {
	if (err) return console.error(err);
	if (!item) return res.send("no item found with that name");
	res.render('item', {name: item.name, info: item.info, link: item.link, picLink1: item.picLinks[0] });
    });
});

module.exports = router;
