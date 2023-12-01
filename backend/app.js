const express = require('express')
const app = express();
const errorMiddleware = require("./middlewares/error");
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const fileUpload = require('express-fileupload')
// const path = require('path');
const i18n = require('./i18n/i18n');



//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

//logger
app.use(logger('dev'));

//cookie parser
app.use(cookieParser());


const corsOptions = {
    credentials: true, origin: 'http://localhost:3000', 
}

// cors for cross-origin scripts
app.use(cors(corsOptions));


//i18n for locals
app.use(i18n)


//Routes import
const productRouter = require("./routes/productRoute");
const userRouter = require("./routes/userRoute");
const orderRouter = require("./routes/orderRoute");
const cartRouter = require("./routes/cartRoute")


app.use("/api/v1", productRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", orderRouter);
app.use("/api/v1", cartRouter);



//middleware for errors
app.use(errorMiddleware);

module.exports = app; 