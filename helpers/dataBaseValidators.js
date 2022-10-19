const User = require('../models/user');
const {request, response } = require('express-validator');
//const Category = require('../models/categories')


const emailExists = async(email = '') => {
    const availableEmail = await User.findOne({email});
    if(availableEmail){
        throw new Error(`The email is no longer available`);
    } 
}

const userExistsById = async(userId) =>{
    const availableUser = await User.findById(userId);
    if(!availableUser){
        throw new Error(`Error: User not found`);
    }
}


const  sameUser = (value, {req, location,path}) =>{
    console.log("value: ", value);
    console.log("req.user", req.user._id.toString());
    if (!(value == req.user._id.toString())){
        throw new Error('You do not have the permisions to perform the request')
    }
    else{
        return true;
    }
}

//const categoryExistsById = async(categoryId) =>{
//    const availableCategory = await Category.findById(categoryId);
//    if(!availableCategory){
//        throw new Error(`Error. Category does not exists`);
//    }
//}

module.exports = {
    emailExists,
    userExistsById,
    sameUser
    //categoryExistsById
}