const router = require("express").Router();

const{
    registerUser,
    userLogin,
    userLogout,
    forgotPassword,
    getLoggedUserdetails,
    resetPassword,
    } = require("../controllers/userController");

const { isAuthenticated } = require("../middlewares/auth");




router.post("/register",registerUser)

router.post("/login",userLogin);

router.get("/logout",userLogout);

router.get("/getLoggedUser",isAuthenticated,getLoggedUserdetails);

router.post("/password/forgot",forgotPassword);

router.put("/password/reset/:token",resetPassword);

module.exports = router;