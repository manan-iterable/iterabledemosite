'use strict';
// require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const app = express();
const router = express.Router();
//router imports
const firstIndex = require('./routes/firstIndex'); 
const getShoppingCart = require('./routes/getShoppingCart'); 
const getJWT = require('./routes/generatejwt'); 
const trackevent = require('./routes/itblTrackEvent'); 

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/favicon.ico', (req, res) => res.status(204));

router.get('/health', (req, res)=>{
  // let data = {"success":true}
  // res.send(data);
  res.status(200).json({"success":true});
})
router.get('/api/first', firstIndex);
router.get('/api/getUserShoppinCart', getShoppingCart.getShoppingCart);
router.get('/api/checkShopping', getShoppingCart.checkShopping);
router.get('/api/generatejwt', getJWT.generateJWT)
router.post('/api/track-event',trackevent.itblTrackEvent)

app.use(router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   // res.render('error');
//   res.json({ error: err })
// });

module.exports = app;
