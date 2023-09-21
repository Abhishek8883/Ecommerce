

const saveToken = (res,user,statusCode)=>{

    const token  = user.setToken();

    //options for cookie
    const options = {
        expire:new Date(
            Date.now + process.env.COOKIE_EXPIRE*24*60*60*1000
        ),
        httpOnly:true
    }

    user.password = "";

    res.status(statusCode).cookie('token',token,options).json({
        success:true,
        user,
        token
    })
}

module.exports = saveToken;