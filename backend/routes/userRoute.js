const router = require("express").Router();

const{
    registerUser,
    userLogin,
    userLogout,
    forgotPassword,
    getLoggedUserdetails,
    resetPassword,
    updateUserPassword,
    updateUserProfile,
    getAllUsers,
    getUserDetails,
    updateUserRole,
    deleteUser
    } = require("../controllers/userController");

const { isAuthenticated, authoriseRoles } = require("../middlewares/auth");
const { ADMIN } = require("../services/constants");


//auth routes

router.post("/register",registerUser)

router.post("/login",userLogin);

router.get("/logout",userLogout);

router.get("/getLoggedUser",isAuthenticated,getLoggedUserdetails);

router.post("/password/forgot",forgotPassword);

router.put("/password/reset/:token",resetPassword);


//user routes

router.put("/password/update",isAuthenticated,updateUserPassword);

router.put("/profile/update",isAuthenticated,updateUserProfile);

router.get("/admin/users",isAuthenticated,authoriseRoles(ADMIN),getAllUsers);

router.route("/admin/user/:id")
    .get(isAuthenticated,authoriseRoles(ADMIN),getUserDetails)
    .put(isAuthenticated,authoriseRoles(ADMIN),updateUserRole)
    .delete(isAuthenticated,authoriseRoles(ADMIN),deleteUser)

module.exports = router; 