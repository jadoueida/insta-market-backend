

const Product = require("../models/Product");
const { route } = require("./user");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin, belongsToUser } = require("./verifyToken");
const router = require("express").Router();




//Checks if product belongs to user




//CREATE

router.post("/",verifyTokenAndAdmin, async(req,res)=>{
    verifyToken(req,res,()=>{console.log(req.user.id)})    
    try{
        const newProduct = new Product({
            title: req.body.title,
            desc :req.body.desc,
            img: req.body.img,
            categories: req.body.categories,
            size: req.body.size,
            color:req.body.color,
            price: req.body.price,
            _user: req.user.id
            
        });
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    }catch(err){
        res.status(500).json(err)
    }

});

// //UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req,res)=>{
//     if(req.body.password){
//         req.body.password = CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SEC).toString();
//     }
     try {
       const updatedProduct = await Product.findByIdAndUpdate(req.params.id,{
            $set: req.body
         },{new:true}
        );
        res.status(200).json(updatedProduct);
    }catch(err){
         res.status(500).json(err);
    }

 });


// //DELETE
 router.delete("/:id", verifyTokenAndAuthorization, async(req,res)=>{
    try {
         await Product.findByIdAndDelete(req.params.id)
         res.status(200).json("Product has been deleted")
    }catch(err){
         res.status(500).json(err)
     }
 })



// //GET ALL Products For a Specific Seller
//router.get("/", verifyToken, async(req,res)=>{  
 //   verifyToken(req,res,()=>{console.log(req.user.id)})
 //   const query = req.query.new
 //   try {
 //       const users =await Product.find({_user: req.user.id });
  //      res.status(200).json(users);
 //      }catch(err){
 //        res.status(500).json(err)
  //   }
 //});

 //Get all products of a Seller for buyer
 router.get("/", verifyToken, async(req,res)=>{  
    const query = req.query.new
    try {
        const users =await Product.find({_user: req.headers.sellerid });
        res.status(200).json(users);
       }catch(err){
         res.status(500).json(err)
     }
 });




module.exports = router;
