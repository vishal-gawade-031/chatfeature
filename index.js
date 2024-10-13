const express=require("express");
const app=express();
const path=require("path");

app.use("views",path.join(__dirname,"views"));
app.use("view engine","ejs");
const mongoose = require('mongoose');

main().then(()=>{console.log("connection succesfull")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

}

app.get("/",(req,res)=>{
    res.send("it is working");
})

app.listen(8080,()=>{
    console.log("server is lesten on port 8080");
});
