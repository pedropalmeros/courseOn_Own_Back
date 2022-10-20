const { response, request, json } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT }  = require('../helpers/generateWebToken');
const { googleValidator } = require('../helpers/googleValidator');

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
        return res.status(500).json({
            msg: "INTERNAL ERROR: Reach out the administrator",
            status: false
        });
    }
}

const googleSignIn = async (req,res = response) => {
    const {id_token} = req.body;

    try {
        const {name,email,picture} = await googleValidator(id_token); 

        let userGoogleAuth = await User.findOne({email});

        if(!userGoogleAuth){
            const data = {
                name,
                email,
                password: 'not needed',
                img: picture,
                google: true
            }

            userGoogleAuth = new User(data);
            await userGoogleAuth.save();

        }

        const token = await generateJWT( userGoogleAuth.id);

        res.json({
            userGoogleAuth,
            token,
            success: true
        });



    } catch(error){
        console.log(error);
        res.status(400).json({
            success: false,
            msg: 'Invalid Token'
        })
    }
}


module.exports = {
    login,
    googleSignIn
}