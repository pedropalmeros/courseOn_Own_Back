const {request, response} = require('express'); 
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const getAllUsers = async(req, res = response ) =>{
    const allUsers = await User.find();
    res.json({
        msg: 'All users requested',
        allUsers
    })
}

const createNewUser = async(req, res = response ) => {
    const {google, id, name, email, password,preferenceTags } = req.body;

    const user = User({name, email});

    if(password){
        const salt = bcryptjs.genSaltSync(10);
        user.password = bcryptjs.hashSync(password,salt);
    }

    if(preferenceTags){
        user.preferenceTags = preferenceTags;
    }
    
    await user.save();

    res.json({
        msg: 'New user has been created',
        user
    })

}

const updateUserById = (req, res = response ) =>{
    res.json({
        msg: 'updateUserById - CONTROLLER'
    })
}

const deleteUserById = async(req, res = response ) =>{
    console.log('Hello from deleteUserById')
    const userAuth = req.user;
    const user = await User.findByIdAndDelete(userAuth.id);

    res.json({
        msg: 'delete USER - CONTROLLER',
        user
    })


}


module.exports = {
    getAllUsers,
    createNewUser,
    updateUserById,
    deleteUserById
}