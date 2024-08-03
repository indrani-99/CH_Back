require('dotenv').config();
const express=require('express');
const bcrypt=require('bcrypt');
const userRouter=express.Router();
const jwt=require('jsonwebtoken');
const secretKey=process.env.SECRET_KEY;
const { VisitorModel } = require('../model/user.model');

//registration
userRouter.post('/register', async (req,res)=>{
    try{
        const {username, email, password}=req.body;
        const isUserExist=await VisitorModel.findOne({email});
        if(!isUserExist)
        {
            bcrypt.hash(password, 8, async (err,hashPass)=>{
                if(err)
                   return res.send("Password encryption error, Please try again");
                else
                {
                    const newuser=await new VisitorModel({username,email,password:hashPass});
                    newuser.save();
                    res.send("Registration successful");
                }
            })
        }
        else
            res.send("You are already registered! Please login");
    }
    catch(err)
    {
        res.send("Some error occure! Please try again later");
    }
})


//login 
userRouter.post('/login', async (req,res)=>{
    try{
        const {email,password}=req.body;
        const visitor=await VisitorModel.findOne({email});
        if(visitor)
        {
            bcrypt.compare(password, visitor.password, async (err,result)=>{
                if(err)
                   return res.send("Please enter correct password");
                else
                {
                    const token=jwt.sign({userid:visitor._id, username:visitor.username}, secretKey);
                    res.json({msg:"Login successful", token:token});
                }
            })
        }
        else
            res.send("Please register first! then try to login");

    }
    catch(err){
        res.send("Error occure!Please try again");
    }
})

module.exports={
    userRouter
}