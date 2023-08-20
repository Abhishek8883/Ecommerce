const express = require('express')
const app = express();
const errorMiddleware = require("./middlewares/error");


//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//middleware for errors
app.use(errorMiddleware);

//Routes import
const productRouter = require("./routes/productRoute");
app.use("/api/v1",productRouter);

module.exports = app; 