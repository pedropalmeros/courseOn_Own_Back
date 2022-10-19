require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require( '../database/config.db')

class Server{
    
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/users';
        this.authPath = '/auth';

        //Data Base connection
        this.dataBaseConnect();

        //Middlewares
        this.middlewares();


        // Routes of the application
        this.routes();
    }

    dataBaseConnect(){
        dbConnection();
    }

    middlewares(){
        // CORS
        this.app.use(cors());

        // Parsing
        this.app.use(express.json());

        // public files
        //this.app.use( express.static('public'));

    }


    routes(){
        //this.app.get('/',(req,res)=>{
        //    res.send('Hello World');
        //});

        this.app.use(this.userPath, require('../routes/user.route'));
        this.app.use(this.authPath, require('../routes/auth.route'));

    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('Server running on PORT ', this.port);
        })
    }

}

module.exports = Server