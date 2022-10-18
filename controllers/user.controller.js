const {request, response} = require('express'); 

const getAllUsers = (req, res = response ) =>{
    res.json({
        msg: 'get ALL USERS - CONTROLLER'
    })
}

const createNewUser = (req, res = response ) => {
    res.json({
        msg: 'CREATE - POST - NEW USER - CONTROLLER'
    })
}

const updateUserById = (req, res = response ) =>{
    res.json({
        msg: 'updateUserById - CONTROLLER'
    })
}

const deleteUserById = (req, res = response ) =>{
    res.json({
        msg: 'deleteUserById - CONTROLLER'
    })
}


module.exports = {
    getAllUsers,
    createNewUser,
    updateUserById,
    deleteUserById
}