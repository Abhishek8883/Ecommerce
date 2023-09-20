const express = require('express')
const app = express();
const errorMiddleware = require("./middlewares/error");
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
// const path = require('path');
const i18n = require('./i18n/i18n');

//setting content type for request
// app.use(function (req, res, next) {
//     req.headers['content-type'] = 'application/json';
//     next();
//   });

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//logger
app.use(logger('dev'));
 
//cookie parser
app.use(cookieParser());

//configure path
// app.use(express.static(path.join(__dirname, 'public')));

//cors for cross-origin scripts
app.use(cors())

//i18n for locals
app.use(i18n)


//Routes import
const productRouter = require("./routes/productRoute");
const userRouter = require("./routes/userRoute");


app.use("/api/v1",productRouter);
app.use("/api/v1",userRouter);


//middleware for errors
app.use(errorMiddleware);

module.exports = app; 