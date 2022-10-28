const { response } = require('express');

const validateUploadReq = (req, res = response, next) => {

    if(!req.files || Object.keys(req.files).length===0){
        return res.status(400).json({
            stuatus: false,
            msg: "there are NO FILES in the request - middleware"
        });
    }

    next();
}

module.exports = {
    validateUploadReq
}