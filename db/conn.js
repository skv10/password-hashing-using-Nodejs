const dotenv= require('dotenv');
const mongoose = require('mongoose');
dotenv.config({path:'./config.env'})
const DB =process.env.DB

mongoose.connect(DB,{
    useNewUrlParser:true,
}).then(()=>{
    console.log(`connection Successfull`);
}).catch((err)=>{
    console.log(`connection unsuccessfull`);
    console.log(err);
});
