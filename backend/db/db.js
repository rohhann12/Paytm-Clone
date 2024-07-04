const mongoose=require("mongoose")
mongoose.connect('mongodb+srv://rohann:rohan@cluster0.xvl6xp0.mongodb.net/')

const UserSchema= new mongoose.Schema({
    phoneNum:{type:Number,
        required:ture
    },
    Fname:{type:String,
        required:true
    },
    Lname:{type:String,
        required:true
    },
    username:{
        type:String,
        required: true,       
    },
    password:{type:String,
        required:true
    },

})

const BalanceSchema=new mongoose.Schema({
    Balance:{type:Number,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId
    }
})

const User=mongoose.model("User",UserSchema)
const Balance=mongoose.model("Balance",BalanceSchema)

module.exports={
    User,
    Balance
}