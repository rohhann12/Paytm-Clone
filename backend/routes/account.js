const express=require('express')
const {Balance}=require('../db/db');
const mongoose=require("mongoose")
const { authMiddleware } = require('../middleware/authmiddleware');
const router=express.Router();

router.post("/checkBalance",async(req,res)=>{
    const {userId}=req.body
    const output=await Balance.findOne({userId})
    if(output){
        res.status(200).json({
            msg:`Your current balance is${output.Balance}`
        })
    }else{
        res.status(411).json({
            msg:"Invalid cred couldnt fetch data"
        })
    }
})

router.post("/transfer",authMiddleware,async (req,res)=>{
    //to aur from to leleiuya accoutn mei to ke liye uski userid lenge
    const session = await mongoose.startSession();
    session.startTransaction();
    const { amount, to } = req.body;
    const account=await Balance.findOne({userId:req.userId}).session(session)
    if(!account || account.Balance<amount){
       
        res.json({
            msg:"insufficient balance"
        })
    }
    const toAccount=await Balance.findOne({
        userId:to
    }).session(session)

    if(!toAccount){
        await session.abortTransaction();
        res.json({
            msg:"User not found"
        })
    }

    await Balance.updateOne({userId:req.userId},{ $inc: { balance: -amount } }).session(session);
    await Balance.updateOne({userId:to},{ $inc: { balance: amount } }).session(session);

    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
})

module.exports=router;