
if(process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}
const isProduction = process.env.NODE_ENV === "production";

var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

var index = require("./routes/index");
var books = require("./routes/books");
var mongoose = require('mongoose');
var Books = require('./models/books');

const app = express();

const dburl = process.env.MONGODB_URI;


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


app.use("/", index);
app.use("/books", books);

mongoose.connect(dburl, function (err) {
  // var testingBook = new Books ({
  //   title: 'HARRY POTTER AND THE GOBLET',
  //   author: 'JK ROWLING',
  //   summary: 'the fourth book',
  //   ratings: [
  //       {
  //           detail: 'might be the very best yet',
  //           numberOfStars: 4,
  //       }
  //   ],
  // });
  // testingBook.save(function(err) {
  //       if (err) throw err;
  //       console.log('Book successfully saved.');
  //   });
  
 if (err) throw err;
console.log('Successfully connected');
 });

 
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app
