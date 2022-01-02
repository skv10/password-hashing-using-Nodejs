const dotenv= require('dotenv');
const express = require('express');
const app = express();
dotenv.config({path:'./config.env'})
const PORT = process.env.PORT;
require('./db/conn');

app.use(express.json())



app.use(require('./router/auth'));


const middleware = (req,res,next)=>{
    console.log('Hello my middlewaRE');
    next();

}



app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`);
});