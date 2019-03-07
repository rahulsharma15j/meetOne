const express = require('express');
const app = express();
const http = require('http');
const fs = require('fs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');

const appConfig = require('./config/appConfig');
const appErrorHandler = require('./app/middlewares/appErrorHandler');
const modelsPath = './app/models';
const routesPath = './app/routes';
/**
 * Middlewares
 */
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(appErrorHandler.globalErrorHandler);



/**
 * Creating server and database connection.
 */
const server = http.createServer(app);
server.listen(appConfig.port,()=>{
    console.log(`Server is listening on port: ${appConfig.port}`);
    mongoose.connect(appConfig.dbUri,{ useNewUrlParser: true },(error)=>{
        if(error){
           console.log(`Database connection error: ${error}`);
        }else{
           console.log(`Database connection successfull`);
        }
    });
});

/**
 * Boostrap models
 */
fs.readdirSync(modelsPath).forEach((file)=>{
   if(~file.indexOf('.js')) require(modelsPath + '/' + file);
});

/**Boostrap routes */
fs.readdirSync(routesPath).forEach((file)=>{
   if(~file.indexOf('.js')){
     require(routesPath + '/' + file).setRouter(app);
   }
});
app.use(appErrorHandler.globalNotFoundHandler);



module.exports = app;