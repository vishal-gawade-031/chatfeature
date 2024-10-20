const { type } = require('express/lib/response');
const mongoose = require('mongoose');

//we have define the schema 
const chatschema = new mongoose.Schema({
    
    from:{
            type:String,
            require:true
         },
    to:{
            type:String,
            require:true
        },
    msg:{
        type:String,
        maxLength:50
       },
    created_at:{
        type:Date,
        require:true
    }
})

const Chat=mongoose.model("chat",chatschema);
module.exports=Chat; 