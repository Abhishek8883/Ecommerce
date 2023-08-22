const app = require("./app");

//uncaught exception
process.on("uncaughtException",(err) => {
    console.log(`Error: ${err.messege}`);
    console.log(`Server closed due to uncaught exception .`);

        process.exit(1);
})


//config
const dotenv = require('dotenv');
dotenv.config({path:"backend/config/config.env"});

//connecting database
const connectDatabase = require('../backend/config/database')
connectDatabase()

const server = app.listen(process.env.PORT,() => {
    console.log(`server is running on ${process.env.PORT}`);
})

//unhandled promise rejections
process.on("unhandledRejection",(err) => {
    console.log(`Error: ${err.messege}`);
    console.log(`Server closed due to unhandled promise rejection.`);

    server.close(() => {
        process.exit(1);
    })
})

