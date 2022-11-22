const jwt = require("jsonwebtoken")
const Product = require("../models/Product")



const verifyToken = async(req,res,next) =>{
    const authHeader = req.headers.token
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC, (err,user)=>{
            if(err) res.status(403).json("Token not valid!");
            req.user = user;
            next();
        });
    }else{
        return res.status(401).json("You are not authenticated!");
    }
};


const verifyTokenAndAuthorization = (req,res,next) =>{
    verifyToken(req,res,()=>{
        console.log(req.user.id.toString())
        Product.findById(req.params.id, function(err, product) {
            console.log(product._user.toString()) 
        if(req.user.id.toString()=== product._user.toString()){
            next();
        }else{
            res.status(403).json("You are not allowed to do that, These Products are not yours!")
        }
    })
        });
};


const verifyTokenAndAdmin = (req,res,next) =>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next();
        }else{
            res.status(403).json("You are not allowed to do that!");
        }
    });
};



module.exports = {verifyToken, verifyTokenAndAuthorization,verifyTokenAndAdmin};