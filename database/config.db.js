const mongoose = require('mongoose');

const dbConnection = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('DB ready online');
    }catch(error){
        console.log(error);
    }
}

module.exports = {
    dbConnection
}