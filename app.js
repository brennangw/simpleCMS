var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var addEdit = require('./routes/addEdit');
var item = require('./routes/item');
var cat = require('./routes/cat');



var db = require('database').db;
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', routes);
app.use('/users', users);
app.use('/addEdit', addEdit);
app.use('/item', item);
app.use('/cat', cats);

app.post('/add', function (req, res) {

    if (String(req.body._id) === ""){
	    console.log("if");
	var newItem = new db.Item({
	    name: req.body.name,
	    info: req.body.info,
	    type: req.body.type,
	    link: req.body.link,
	    picLinks: [req.body.picLink1, req.body.picLink2, req.body.picLink3],
	    cats: [req.body.cat1, req.body.cat2, req.body.cat3, req.body.cat4]
	});
	newItem.save(function () {
	    res.send("saved");
	});
    } else {
	console.log("else: " + req.body.name);
	db.Item.findOne({ name : req.body.name}, function (err, item) {
	    if (err) return console.error(err);
	    if (!item) return res.send("could not find item");
	    console.log("item found");
	    item.name = req.body.name;
	    item.info = req.body.info;
	    item.type = req.body.type;
	    item.link = req.body.link;
	    item.picLinks = [req.body.picLink1, req.body.picLink2, req.body.picLink3];
	    item.cats = [req.body.cat1, req.body.cat2, req.body.cat3, req.body.cat4]
	    item.save(function () {
		res.send("saved");
	    });
	    
	});
    }
});

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});



//adding items



module.exports = app;
