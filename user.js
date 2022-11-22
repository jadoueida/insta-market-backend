const User = require("../models/User");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const router = require("express").Router();




//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req,res)=>{
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SEC).toString();
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set: req.body
        },{new:true}
        );
        res.status(200).json(updatedUser);
    }catch(err){
        res.status(500).json(err);
    }

});


//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async(req,res)=>{
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted")
    }catch(err){
        res.status(500).json(err)
    }
})



//GET ALL USERS
router.get("/", verifyTokenAndAdmin, async(req,res)=>{
    const query = req.query.new
    try {
        const users = await User.find();
        res.status(200).json(users);

    }catch(err){
        res.status(500).json(err)
    }
});


//GET ALL DRIVERS
router.get("/buyers", verifyTokenAndAdmin, async(req,res)=>{
    const query = req.query.new
    try {
        const users =await User.find({type:"buyer"});
        res.status(200).json(users);

    }catch(err){
        res.status(500).json(err)
    }
});

//GET ALL SELLERS
router.get("/sellers", verifyTokenAndAdmin, async(req,res)=>{
    const query = req.query.new
    try {
        const users =await User.find({type:"seller"});
        res.status(200).json(users);

    }catch(err){
        res.status(500).json(err)
    }
});

//GET ALL DRIVERS
router.get("/drivers", verifyTokenAndAdmin, async(req,res)=>{
    const query = req.query.new
    try {
        const users =await User.find({type:"drivers"});
        res.status(200).json(users);

    }catch(err){
        res.status(500).json(err)
    }
});

/*
/users?types=buyer
/users?types=admin,buyer
const {types } = req.query
const userTypes = types.split(",");
*/
module.exports = router;