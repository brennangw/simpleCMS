var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var addItem = require('./routes/addItem');


var simpledb = require('mongoose-simpledb');
var db = simpledb.init();

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

app.post('/add', function (req, res) {
    console.log("add reached");
    console.log(req.body.name);

    var newItem = new db.Item({
	
	name: req.body.name,
	info: req.body.info,
	link: req.body.link
	

    });
    newItem.save(function () {
	res.send("saved");
    });




        //koda.name.first = req.param('firstName');
        //koda.name.last = req.param('lastName');
        //koda.age = parseInt(req.param('age'));
        //koda.save();
        //res.send("added");
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
