const {request, response } = require('express-validator');
const User = require('../models/user');
const Course = require('../models/course');

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
    if (!(value == req.user._id.toString())){
        throw new Error('You do not have the permisions to perform the request')
    }
    else{
        return true;
    }
}

const courseExistsById = async(courseId ,{req, location, path }) =>{
    const courseById = await Course.findById(courseId);
    if(courseById === null){
        console.log('course does not exists')
        throw new Error('Course unavailable')
    }else{
        console.log('course exists');
        console.log(courseById);
        req.courseById = courseById;
        return true;
    }
}

const isAuthorRequest = async(courseId, {req, location, paht}) =>{
    const courseById = await Course.findById(courseId);
    const idUserToken = req.user._id.toString();
    const courseAuthorId = courseById.user.toString();

    if (idUserToken != courseAuthorId){
        throw new Error('Only the Course Author can perform this action')
    }
}

const zeroStudents = async(courseId, {req, location, paht}) =>{
    const courseById = await Course.findById(courseId);
    console.log('students enrolled in the course: ',courseById.enrolledStudents);
    if(courseById.enrolledStudents >= 1){
        throw new Error('At least one student is enrolled in the course ');
    }
}

const isCollectionValid = ( collection = '', validCollections = []) =>{
    console.log('collection: ', collection);
    console.log('validCollections: ',validCollections)
    if( !validCollections.includes(collection)){
        console.log(`Collection ${collection} is not in ${validCollections}`);
        throw new Error(`Collection ${collection} is not in ${validCollections}`)
    }
    return true;
}

module.exports = {
    emailExists,
    userExistsById,
    sameUser,
    courseExistsById,
    isAuthorRequest,
    zeroStudents,
    isCollectionValid
}