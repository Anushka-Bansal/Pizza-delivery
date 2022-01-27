const mongoose = require('mongoose');
const proSchema=new mongoose.Schema({
    name:{type:String,required:true,unique:true},
    image:{type:String,required:true},
    price:{type:String,required:true}
})
module.exports=mongoose.model("items",proSchema)
