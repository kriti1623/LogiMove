const express = require("express");
const userRouter = require("./user");
const userdashboardRouter = require('./userDashboard')
const router = express.Router();

router.get("/",(req,res)=>{
    res.send("I'm deep wla user")
})
router.use("/user", userRouter);
router.use('/dashboard',userdashboardRouter)

module.exports = router;
