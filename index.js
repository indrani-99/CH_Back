require('dotenv').config();
const express=require("express");
const { connectionWithDB } = require('./src/config/db');
const { userRouter } = require('./src/routes/user.routes');
const app=express();
const port=process.env.PORT;
const cors=require('cors');
app.use(cors());
app.use(express.json());

app.use('/user',userRouter);
app.get('/', (req,res)=>{
    res.send("Home route");
})
app.listen(port, async ()=>{
    await connectionWithDB();
    console.log(`Server is running at ${port} port`);
})