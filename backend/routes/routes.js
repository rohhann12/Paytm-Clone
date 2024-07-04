const jwt = require("jsonwebtoken");
const { User,Balance } = require("../db/db");
const express = require('express');
const zod = require("zod");
const router = express.Router();
router.use(express.json());
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware/authmiddleware");


const schemaValidate = zod.object({
    username: zod.string().email(),
    password: zod.string().min(5).max(10),
    Fname: zod.string(),
    Lname: zod.string(),
    phoneNum:zod.number(),
    balance:zod.number()
});

const loginSchema = zod.object({
    username: zod.string().email(),
    password: zod.string().min(5).max(10),

});

const changeDetailsSchema = zod.object({
    Fname: zod.string().optional(),
    Lname: zod.string().optional(),
    password:zod.string().optional(),
    phoneNum:zod.number().optional()
});

router.post('/signup', async (req, res) => {
    try {
        const result = schemaValidate.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({ msg: "Invalid input" });
        }
        const Mail= req.body.username
        const ExistingMail= await User.findOne({username:Mail})
        
        if(ExistingMail){
            return res.status(411).json({
                msg:"Username already exists"
            })
        }
        const { username, password, Fname, Lname,phoneNum,balance} = result.data;
      
        const final = await User.create({
            Fname: Fname,
            Lname: Lname,
            username: username,
            password: password,
            phoneNum:phoneNum,
        });
        const userId = final._id;
        await Balance.create({
            userId,
            Balance: 1 + Math.random() * 10000
        })
        const token=jwt.sign({userId},JWT_SECRET)
        res.json({
            message: `User created successfully ${final.Fname}`,
            token: token
        });
    } catch (error) {
        res.status(500).json({
            msg: `Couldn't create user: ${error.message}`
        });
    }
});
1
router.post('/login',async (req,res)=>{
    const result=loginSchema.safeParse(req.body)
    if(!result){
        return res.json({
            msg:"invalid schema"
        })
    }
    const {username,password}=result.data
    const checking=await User.findOne({
        username:username,
        password:password
    })
    if(!checking){
        return res.json({
            msg:"Invalid login creds"
        })
    }else{
    const userId=checking._id
    const token=jwt.sign({userId},JWT_SECRET)
    return res.json({
        msg:`Welcome back ${username}`,
        token:token
    })
    }
})

router.put("/changedetails", authMiddleware, async (req, res) => {
    const { success } = changeDetailsSchema.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

		await User.updateOne({ _id: req.userId}, req.body);
	
    res.json({
        message: "Updated successfully"
    })
})

router.post("/bulk", async (req, res) => {
    const {phoneNum}=req.body
try {
    const users = await User.find({
        phoneNum: { $in: phoneNum } 
    });
        res.json({
            user: users.map(user => ({
                username: user.username,
            msg:`User ${user.Fname}`   
            }))
        })
    }
catch (error) {
    res.json({
        msg:`error aya h${error}`
    })
}
})
   
module.exports = router;
