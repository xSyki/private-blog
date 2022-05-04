var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./connection');
var cors = require('cors');

var usersRouter = require('./routes/users');
var postsRouter = require('./routes/postsRoutes')

var app = express();
app.use(cors({
  origin: '*'
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, './build')));

app.use('/users', usersRouter);
app.use('/posts', postsRouter);

app.get('/test', (req, res) => {
  res.json({helloWorld: true})
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './build', 'index.html'));
});

module.exports = app;
