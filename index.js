const express=require("express");
const app=express();
const path=require("path");
const Chat=require("./models/chat.js");
const methodOverride = require('method-override');
const ExpressError=require("./ExpressError.js");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

const mongoose = require('mongoose');
const { redirect } = require("express/lib/response.js");

main().then(()=>{console.log("connection succesfull")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');

}

const chat1=new Chat({
  from:"vishal",
  to:"chetan",
  msg:"be a fullstack",
  created_at:new Date()
});

// middleware function
function asynclWrap(fn){
  return (function (req,res,next){
      fn(req,res,next).catch((err)=>next(err));
  });
}

// chat1.save().then((res)=>{
//   console.log(res)});


  //index rout to featch the chat's or data
app.get("/chats",asynclWrap (async(req,res)=>{

  let chats=await Chat.find()
   // console.log(chats);
   ab=ab;
  res.render("index.ejs",{chats});
  }));

  app.get("/chats/new",(req,res)=>{
    throw new ExpressError(404,"page not found");
    res.render("new.ejs");
  });


// part of middleware 
  app.get("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    let chat = await chat.findById(id);
    if(!chat){
      next(new ExpressError(404,"page not found"));
    }
    res.render("edit.ejs",{chat});
  })



  //define rout for edit the message
  app.get("/chats/:id/edit",async (req,res)=>{
    let id=req.params.id;
    let chat=await Chat.findById(id);
    
    res.render("edit.ejs",{chat});
  });

  //define the rout to edit the chat
  // it is all most write but some err
  app.put("/chats/:id",async (req,res)=>{
    let id=req.params.id;
    console.log("hello ");
    let {msg: newmsg}=req.body;
    console.log(newmsg);
    //important : who to update the chat
    let newupdateChat=await Chat.findByIdAndUpdate(id,
      {msg:newmsg},
      {runValidators:true,new:true}
    
    );
    console.log(newupdateChat);
    res.redirect("/chats");
  })

  //define the rout for save chat's
  app.post("/chats",(req,res)=>{
    let {from, msg, to}=req.body;
    //console.log(form,msg,to);
    let newchat=new Chat ({
      from:from,
      to:to,
      msg:msg,
      created_at:new Date()
    
    });
    newchat.save().then((res)=>{
      console.log("the chat was save");
    })
    .catch( (err)=>{
      console.log(err);
    })
    res.redirect("/chats");
  })
//destroy rout

app.delete("/chats/:id",async (req,res)=>{
  let {id}=req.params.id;
  let deleted_chat=await Chat.findOneAndDelete(id);
  // console.log(deleted);
  res.redirect("/chats");
});

//error handling middleware 
app.use((err,req,res,next)=>{
let {status=500,message="some error is comming"}=err;
res.status(status).send(message);
})

app.get("/",(req,res)=>{
    res.send("it is working");
})

app.listen(8080,()=>{
    console.log("server is lesten on port 8080");
});
