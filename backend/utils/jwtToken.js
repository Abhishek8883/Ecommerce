const saveToken = (res,user,statusCode=200)=>{

    const token  = user.setToken();

    //options for cookie
    const options = {
        expire:new Date(
            Date.now + process.env.COOKIE_EXPIRE*24*60*60*1000
        ),
        httpOnly:false
    }

    res.status(statusCode).cookie('authorization',token,options).send({
        success:true,
        data:{user,
        accessToken:token}
    })
}

module.exports = saveToken;