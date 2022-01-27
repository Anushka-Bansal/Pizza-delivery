const express = require('express');
const router= express.Router();
const jwt=require('jsonwebtoken');
const jwtSecret="asdfrtuyxsde4677dff788"
const signupModel=require('../db/UsersSchema')
const proModel=require('../db/ProductSchema');
const OrderModel=require('../db/OrderSchema')

const nodemailer = require("nodemailer");

//jwt setup
function autenticateToken(req,res,next){
    const authHeader=req.headers['authorization'];
    const token=authHeader && authHeader.split(' ')[1];
    console.log(token);
    if(token==null){
        res.json({"err":1,"msg":"Token not matched"})
    }
    else{
        jwt.verify(token,jwtSecret,(err,data)=>{
            if(err){
                res.json({"err":1,"msg":"Token is invalid"})
            }
            else{
                next();
            }
        })
    }
}

//for signup page
router.post("/signup",(req,res)=>{
    let name=req.body.name;
    let email=req.body.email;
    let password=req.body.password;
    let contact=req.body.contact;

    let ins=new signupModel({email:email,password:password,name:name,contact:contact});
    console.log(ins)
    ins.save((err)=>{
        if(err){
            res.json({"err":1,'msg':"Not Registered"})
        }
        else{
            res.json({"err":0,'msg':'Registered'})
        }
    })
})

//for login page
router.post("/login",(req,res)=>{
    let email=req.body.email;
    let password=req.body.password;
    signupModel.findOne({email:email,password:password},(err,data)=>{
        if(err){
            res.json({"err":1,'msg':"Invalid email or password"})
        }
        else if(data== null){
            res.json({"err":1,'msg':'Fill all the field'})
        }
        else{
            let payload={
                oid:email
            }
            const token=jwt.sign(payload,jwtSecret,{expiresIn:1060000})
            res.json({"err":0,'msg':'Login success',"token":token,"user":data})//token passes to frontend 
        }
    })
});
        
//for menu items
router.get("/products",autenticateToken, async(req,res)=>{
    const products = await proModel.find({});
    res.json(products);
    // res.send("Hello All")
});

router.post("/carddetails", (req, res) => {
    let field = {
        name: req.body.name,
        items:req.body.items,
        cardnumber: req.body.cardnumber,
        total: req.body.total,
    };
    
    let ins = new OrderModel(field);
    ins.save((err) => {
        if (err) {
            res.send("Error");
        } else {
            res.send({ flag: 1, msg: "Details Added" });

            //nodemailer

            let testAccount = nodemailer.createTestAccount();

            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                user: "anushka72112bansal@gmail.com", // generated ethereal user
                pass: "020821births2005", // generated ethereal password
                },
            });

            // send mail with defined transport object
            let info = transporter.sendMail({
                from: "anushka72112bansal@gmail.com", // sender address
                to: "anushka72112bansal@gmail.com", // list of receivers
                subject: `${field.name}`, // Subject line
                text: `Card-No: ${field.cardnumber} Total-Amount: ${field.total}`, // plain text body
                html:`<body>
                <div style="border":"1px solid black">
                <b><span style={"color":"red"}>Thank you for visiting</span></b>
                <p>Image: <img src="../../frontend/public/images/logo.jpg"
                 width="20" height="20" /></p>
                 </div>
                 </body>`
               
            });

            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            }
                    
    });
});

router.get("/orderdetails", (req, res) => {
    // console.log(req.body)
    OrderModel.find({}, (err, data) => {
        if (err) throw err;
        console.log(data)
        res.send(data);
        // console.log(id)
        
    });
});

//for profile items
// router.get("/profile",async(req,res)=>{
//     const profile = await signupModel.find({});
//     res.json(profile)
// })
module.exports=router;