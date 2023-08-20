const app = require("./app");


//config
const dotenv = require('dotenv');
dotenv.config({path:"backend/config/config.env"});


//connecting database
const connectDatabase = require('../backend/config/database')
connectDatabase()

app.listen(process.env.PORT,() => {
    console.log(`server is running on ${process.env.PORT}`);
})

