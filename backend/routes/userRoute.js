const router = require("express").Router();


const{
    registerUser,
    userLogin,
    userLogout,
    } = require("../controllers/userController")

router.post("/register",registerUser)

router.post("/login",userLogin);

router.get("/logout",userLogout);

module.exports = router;