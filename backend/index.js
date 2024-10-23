const express = require("express");
const cors = require("cors");
const mainRouter = require("./routes/index");
// Load environment variables
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());


app.get("/",(req,res)=>{
    res.send("I'm alive")
})



app.use("/api/v1/", mainRouter )


app.listen(8080,()=>{
    console.log("Server is running at port 8080")
})