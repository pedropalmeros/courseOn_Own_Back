const { Router } = require('express'); 
const { getAllUsers }       = require('../controllers/user.controller');
const { createNewUser }     = require('../controllers/user.controller');
const { updateUserById }    = require('../controllers/user.controller'); 
const { deleteUserById }    = require('../controllers/user.controller');

const router = Router();

router.get('/', getAllUsers)


// Create a new user 
router.post('/',createNewUser)

// Create a user
router.put('/',createNewUser)

// Update User
router.post('/',updateUserById)

router.delete('/',deleteUserById)

router.patch('/',updateUserById)

module.exports = router;