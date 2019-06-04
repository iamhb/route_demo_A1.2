var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var port = Number(process.env.PORT || '3000');
var http=require('http');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mongoose  = require('mongoose');
var app = express();


var create= require('./routes/create');
/*var  delete= require('./routes/delete');
var  update= require('./routes/update');*/
var  read  = require('./routes/read');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.get('/', function(req,res){
	res.sendFile("./public/index.html");
});

// app.get('*', function(){
// 	console.log("Hello!!");
// 	next()
// })
//var modelVar = require('./public/models/dbmodel').dd;
var db = mongoose.connect('mongodb://localhost:27017/hbdbdemo' ,{ useNewUrlParser: true });

app.get('/api/showData', read.showData);

app.post('/api/addData',create.addData);


app.post('/api/removeData',function(req,res){
  console.log("In Server Remove");
  console.log("values:" + req.body.remVar);

    modelVar.remove( {"fname": req.body.remVar },function (err, docs) {
                    if(err)
                        {
                            res.status(500).json(err);
                        }
                    else if(docs)
                        {
                            console.log(docs);
                            console.log("del successfully");
                            res.status(200).json(docs);
                        }
});
  });

app.post('/api/updateData', function(req, res){
  console.log(" in update api ");
  console.log("values:");
  console.log(req.body.oldValue + " " + req.body.newValue);

 modelVar.updateOne( {"fname": req.body.oldValue },{ $set:{"fname": req.body.newValue} },function (err, docs) {
                    if(err)
                        {
                            res.status(500).json(err);
                        }
                    else if(docs)
                        {
                            console.log(docs);
                            console.log("Updated successfully");
                            res.status(200).json(docs);
                        }
}); 


});






// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


var server = http.createServer(app).listen(port,function(){
  console.log("server listening at "+port);
});

module.exports = app;

// code from server.js


