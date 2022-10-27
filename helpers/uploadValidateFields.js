const path = require('path');
const { v4:uuidv4 } = require('uuid');

const uploadFileProcess = (files, allowedExtensions = ['png','jpg','jpeg','gif','mp4','pdf'],addressFile = '') =>{

    return new Promise((resolve, reject) => {
        const {file} = files;
        const splittedFileName = file.name.split('.');
        const extension = splittedFileName[splittedFileName.length - 1];
    
        // Validate the extension        
        if( !allowedExtensions.includes(extension)){
            return reject(`Invalid extension only the next extensions are allowed: ${allowedExtensions}`)
        }
        
        
        const tempName = uuidv4() + '.'+extension;
        const uploadPath = path.join(__dirname,'../uploads/',addressFile,tempName);
    
        file.mv(uploadPath, (err)=>{
            if(err){
                reject(err);
            }

            resolve(tempName);
        });
    
    });
}

module.exports = {
    uploadFileProcess
}