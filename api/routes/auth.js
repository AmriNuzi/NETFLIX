const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


//Register
router.post("/register", async (req, res) =>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });

    try{
        const user = await newUser.save();
            res.status(201).json(user);
    }catch(err){
        res.status(400).json(err);
    }
    
} );


//Login
router.post("/login", async (req, res)=>{
    try{
        const user = await User.findOne({email: req.body.email});
        !user && res.status(404).json("Worng password or username!");
         
        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRECT_KEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        originalPassword !== req.body.password &&
        res.status(404).json("wrong pass or username");

        const accessToken = jwt.sign({id: user._id, isAdmin: user.isAdmin}, 
            process.env.SECRECT_KEY,
            { expiresIn: "5d"}
            );

        const { password, ...info } = user._doc;

        res.status(200).json({...info, accessToken });
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;