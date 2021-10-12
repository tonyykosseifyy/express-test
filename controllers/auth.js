const User = require("../models/userSchema.js") ;



exports.register = async ( req , res ) => {
    const { name , email , password } = req.body ;
    try {
        const user = new User({ name , email , password }) ;
        const newUser = await user.save()
        newUser._id = null ;
        return res.status(201).json(newUser) ;
    } catch (err) {
        return res.status(400).send(err)
    }
};

