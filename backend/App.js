const express=require('express');
const mongoose=require('mongoose');
const PORT=9988;
const app=express();
const cors = require('cors')

//data parsing
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

//db connection
const db="mongodb://localhost:27017/pizza_menu";
const connectDB=async()=>{
    try{
        await mongoose.connect(db,{useNewUrlParser : true});
        console.log("MongoDb Connected");
    }
    catch(err){
        console.log(err.message);
    }
}
connectDB();
//end

const postRoutes=require('./routes/postRoutes');
app.use("/api/posts",postRoutes)

app.listen(PORT,(err)=>{
    if(err) throw err;
    console.log(`Work on ${PORT}`)
})