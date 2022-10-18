const { request,response } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validateJWT = async(req = request, res = response, next) =>{
    const token = req.header('userTok');

    if( !token ){
        return res.status(400).json({
            msg: 'No token'
        })
   }

    try{
        const {id} = jwt.verify(token,process.env.SECRETORPIRVATEKEY);
  
       const user = await User.findById(id);

       if( !user){
        return res.status(401).json({
            msg: 'Invalid Token - user not in DB'
        })
       }


       if(!user.status){
        return res.status(401).json({
            msg: 'Invalid Token - user status - false'
        })
       }
       req.user = user;

        next();
   }
    catch(error){
        return res.status(400).json({
            msg: "Error in the Token validation"
        })
    }
}


module.exports = {
    validateJWT
}