const router = require("express").Router() ;
const verify = require("../middlewares/verifyToken");



router.get("/posts",verify,async (req , res) => {
    res.json(
        {
            posts: {
                title: "My first post" , 
                description: "random data"
            }
        }
    );
});

module.exports = router ; 