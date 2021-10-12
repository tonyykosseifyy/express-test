const User = require("../models/userSchema.js") ;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



exports.register = async ( req , res ) => {
    const { name , email , password } = req.body ;

    // CHECK FOR EMAIL 
    const exist = await User.findOne({ email }) ;
    if (exist) return res.status(400).send("Email already taken , Sign in instead !");

    // HASH PASSWORD 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password , salt) ;

    try {
        const user = new User({ name , email , password : hashedPassword }) ;
        const newUser = await user.save()
        return res.status(201).json(newUser) ;
    } catch (err) {
        return res.status(400).send(err)
    }
};

exports.login = async ( req , res ) => {
    const { email , password } = req.body ;

    // CHECK IF EMAIL EXIST TO LOGIN 
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("Email not Registered, Please register then login") ;

    // CHECK IF PASSWORD IS CORRECT 
    const correctPass = await bcrypt.compare(password , user.password) ;
    if (!correctPass) return res.status(400).send("Password is wrong");
    
    // GENERATING THE TOKEN 
    const token = await jwt.sign({ _id : user._id } , process.env.TOKEN_SECRET ) ;
    return res.header("auth-header" , token).send(token);
    
};

