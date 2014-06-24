var express = require('express');
var router = express.Router();
var db = require('database').db;

/* GET users listing. */
router.get('/:name', function(req, res) {
    console.log(req.params.name);

    if(String(req.params.name) === "new") {
         return res.render('addEdit',{ title: "Add New Item"}) }//if
    else{

	db.Item.findOne({ name : req.params.name}, function (err, item) {
	if (err) return console.error(err);
	if (!item) return res.send("no item found with that name");
	res.render('addEdit', {
	    id: item._id,
	    nameV: item.name, 
	    infoV: item.info,
	    typeV: item.type,
	    picLink1V: item.picLinks[0],
	    picLink2V: item.picLinks[1],
	    picLink3V: item.picLinks[2],
	    cat1V: item.cats[0],
	    cat2V: item.cats[1],
	    cat3V: item.cats[2],
	    cat4V: item.cats[3],
	    linkV: item.link
	});
    });	
}



    
});

module.exports = router;
