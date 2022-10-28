const { response, request } = require('express');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const { uploadFileProcess } = require('../helpers/uploadValidateFields');
const { validateUploadReq } = require('../middlewares/validateFile')
const User = require('../models/user');
const Course = require('../models/course');
const path = require('path');

cloudinary.config(process.env.CLOUDINARY_URL);

const uploadFile = async(req,res = response) => {

    try {
        //const pathFile = await uploadFileProcess(req.files,['txt','pdf'],'textos');
        const pathFile = await uploadFileProcess(req.files, undefined, 'imgs');

        res.json({
            status: true,
            name: pathFile
        })

    } catch (error) {
        res.status(400).json({
            status: false,
            msg: error
        })
    }
}

const updateImage = async(req = request, res = response ) => {
    const {collection,id} = req.params;

    let modelById = null;

    switch( collection ){
        case 'users':
            // VALIDATE if the User collection has the id requested.
            console.log('Collection is users');
            modelById = await User.findById(id);
            
            break;
        case 'courses':
            // VALIDATE if the User collection has the id requested.
            console.log('Collection is courses')
            modelById = await Course.findById(id)
            
            break;
        default:
            console.log('default branch')
            return res.status(500).json({msg: 'collection invalid'})
    }

    if (!modelById){
        return res.status(400).json({
            success: false,
            msg: `${collection} with id ${id} does not exists `
        })
    }

    // Delete previous images
    if(modelById.img){
        //Delete the image
        const pathImage = path.join(__dirname,'../uploads',collection,modelById.img);

        if ( fs.existsSync(pathImage) ){
            fs.unlinkSync(pathImage)
        }
    }

    const imageName = await uploadFileProcess( req.files, undefined, collection);
    modelById.img = imageName;

    await modelById.save();

    res.json({
        collection,
        id
    })
}


const updateImageCloudinary = async(req = request, res = response ) => {
    const {collection,id} = req.params;

    let modelById = null;

    switch( collection ){
        case 'users':
            // VALIDATE if the User collection has the id requested.
            console.log('Collection is users');
            modelById = await User.findById(id);
            
            break;
        case 'courses':
            // VALIDATE if the User collection has the id requested.
            console.log('Collection is courses')
            modelById = await Course.findById(id)
            
            break;
        default:
            console.log('default branch')
            return res.status(500).json({msg: 'collection invalid'})
    }

    if (!modelById){
        return res.status(400).json({
            success: false,
            msg: `${collection} with id ${id} does not exists `
        })
    }

    console.log(modelById);
    // Delete previous images
    if(modelById.img){
        const nameImgRaw = modelById.img.split('/');
        const nameImg    = nameImgRaw[nameImgRaw.length-1];
        const [cloudinaryPublicId ] = nameImg.split('.');
        cloudinary.uploader.destroy(cloudinaryPublicId);     
    }

    const { tempFilePath } = req.files.file;
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
    modelById.img = secure_url;

    await modelById.save();

    res.json({
        success: true,
        modelById
    })
}







const getImageByCategoryId = async(req, res = response ) =>{
    const {collection,id} = req.params;

    let modelById = null;

    switch( collection ){
        case 'users':
            // VALIDATE if the User collection has the id requested.
            console.log('Collection is users');
            modelById = await User.findById(id);
            
            break;
        case 'courses':
            // VALIDATE if the User collection has the id requested.
            console.log('Collection is courses')
            modelById = await Course.findById(id)
            
            break;
        default:
            console.log('default branch')
            return res.status(500).json({msg: 'collection invalid'})
    }
    
    if (!modelById) {

        return res.status(400).json({
            success: false,
            msg: `${collection} with id ${id} does not exists `
        })
    }

    // Delete previous images
    if(modelById.img){
        //Delete the image
        const pathImage = path.join(__dirname,'../uploads',collection,modelById.img);

        if ( fs.existsSync(pathImage) ){
            return res.sendFile(pathImage);
        }
    }

    if(collection=='users'){
        console.log('Trying to return the default user image')
        const defaultImage = path.join(__dirname,'../assets/userDefault/user.png')
        //const defaultUerImg = '../assets/userDefault/user.png'
        return res.sendFile(defaultImage)
    }

    res.json({
        msg: 'Placeholder image missing'
    })
}

module.exports = {
    uploadFile,
    updateImage,
    getImageByCategoryId,
    updateImageCloudinary
    
}