var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var addItem = require('./routes/addItem');
var display = require('./routes/display');
var item = require('./routes/item');




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
app.use('/addItem', addItem);
app.use('/display', display);
app.use('/item', item);

app.post('/add', function (req, res) {

    console.log(req.body.picLink1);

    var newItem = new db.Item({
	name: req.body.name,
	info: req.body.info,
	link: req.body.link,
	picLinks: [req.body.picLink1, req.body.picLink2, req.body.picLink3],
	cats: [req.body.cat1, req.body.cat2, req.body.cat3, req.body.cat4, req.body.cat5]
    });
    newItem.save(function () {
	res.send("saved");
    });
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
