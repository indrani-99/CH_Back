const jwt=require('jsonwebtoken');
const secretKey=process.env.SECRET_KEY;
const auth=(req,res,next)=>{
    const token=req.headers.authorization.split(" ")[1];

    jwt.verify(token,secretKey, (err,result)=>{
        if(err)
            res.send(err);
        else
        {
            req.body.username=result.username;
            req.body.userid=result.userid;
            next();
        }
    })
}
module.exports={auth};