const { request, response } = require("express");

const validateAdminRole = (req = request, res = response, next ) => {
    const user = req.user; 

    if( !user){
        return res.status(500).json({
            msg: 'user not found - check validate Token'
        })
    }

    if(user.role !== 'ADMIN_ROLE'){
       return res.status(401).json({
            msg: `${user.name} is not ADMINISTRATOR - Action denied`
       });
    }

    next();
}


module.exports = {
    validateAdminRole
}