const app = require("./app");
const cloudinary  = require("cloudinary")

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

//cloudinary
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
})
 

const server = app.listen(process.env.PORT,() => {
    console.log(`Server is running on port : ${process.env.PORT}`);
})
//unhandled promise rejections
process.on("unhandledRejection",(err) => {
    console.log(`Error: ${err.messege}`);
    console.log(`Server closed due to unhandled promise rejection.`);

    server.close(() => {
        process.exit(1);
    })
})

