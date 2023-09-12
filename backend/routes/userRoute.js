const router = require("express").Router();


const{
    registerUser,
    userLogin,
    userLogout,
    forgotPassword,
    } = require("../controllers/userController")

router.post("/register",registerUser)

router.post("/login",userLogin);

router.get("/logout",userLogout);

router.post("/forgotPassword",forgotPassword);

module.exports = router;