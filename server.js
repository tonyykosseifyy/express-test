// IMPORTING 
const express = require("express") ;
require("dotenv").config() ;
const mongoose = require("mongoose") ;
const cors = require("cors") ;
const authRoutes = require("./routes/auth.js") ;

// DECLARING .ENV VARIABLES 
const port = process.env.PORT ;

// INITIALIZE APP 
const app = express() ;

// MIDDLEWARES 
app.use(express.json()) ;
app.use(cors()) ;


// ROUTES 
app.use("/api" , authRoutes ) ;

//  MONGOOSE CONNECTION 
mongoose.connect(
    process.env.MONGOOSE_URI , 
    { useNewUrlParser: true, useUnifiedTopology: true } , 
    () => console.log("DB connected")
);


app.listen( port , () => console.log(`Server is up and running on port: ${port}`));