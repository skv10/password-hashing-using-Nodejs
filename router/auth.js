const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../model/user')

router.get('/',(req,res)=>{
  res.send('Hello from router js');
});


router.post('/register',async (req,res)=>{

    const {name,email,phone,work,password,cpassword} = req.body;

    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error:"Please enter all details"});
    }
    console.log(req.body);
 try {
    const userExists = await User.findOne({email:email})
    if(userExists){
       return res.status(422).json({error:"Email already exists"});
    } else if (password != cpassword){
        return res.status(422).json({error:"Password are not matching"});
    } else{
        const user = new User ({name,email,phone,work,password,cpassword});
        const userRegister = await user.save();

        if(userRegister){
            res.status(201).json({message:"user os registered"});
    
        }

    }

     
 } catch (error) {
     console.log(error)
     
 }
});

router.post('/signin',async (req,res)=>{
     try {
         const {email, password }=req.body;
         if(!email ||!password){
             return res.status(404).json({error:"PLease enter the detail"});
         }

         const userLogin = await User.findOne({email:email});

         if(userLogin){
            const isMatch = await bcrypt.compare(password,userLogin.password);

            const token = await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwttoken",token,{
              expires:new Date(Date().now()+86400000),
              httpOnly:true
            });

            if(!isMatch){
                res.status(400).json({error:"Invalid data"})
            }
            else{
                return res.json({msg:userLogin});
            }
         }
         else{
            res.status(400).json({error:"Invalid data"})
         }
     } catch (error) {
         console.log(error)
     }
});


module.exports = router;