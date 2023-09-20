const router = require("express").Router();

const{
    registerUser,
    userLogin,
    userLogout,
    forgotPassword,
    getLoggedUserdetails,
    } = require("../controllers/userController");

const { isAuthenticated } = require("../middlewares/auth");




router.post("/register",registerUser)

router.post("/login",userLogin);

router.get("/logout",userLogout);

router.post("/forgotPassword",forgotPassword);

router.get("/getLoggedUser",isAuthenticated,getLoggedUserdetails);

module.exports = router;