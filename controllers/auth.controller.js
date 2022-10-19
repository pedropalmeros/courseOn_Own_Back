const { response, request, json } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/generateWebToken');

const login = async(req = request, res = response ) => {
    const {email, password} = req.body;

    try{
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                msg: "User/Password incorrect - user ",
                status: false
            })
        }

        const validPassword = bcryptjs.compareSync(password, user.password);
        if(!validPassword){
            return res.status(400).json({
                msg: "User/Password incorrect - password",
                status: false
            })
        }

        const token = await generateJWT(user.id);
        
        res.json({
            msg: "login successs", 
            status: true,
            user,
            token
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            msg: "INTERNAL ERROR: Reach out the administrator",
            status: false
        });
    }
}


module.exports = {
    login
}