const mongoose = require('mongoose');
const Chat=require("./models/chat.js");

//connection of mongoose
main().then(()=>{console.log("connection succesfull")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');

}
//to insert the data
let allchats =
[
    {
        from:"vishal",
        to:"tvs",
        msg:"hello",
        created_at:new Date()
    },
    {
        from:"kushal",
        to:"rahual",
        msg:"hottle",
        created_at:new Date()
    },
    {
        from:"vivek",
        to:"kumar",
        msg:"it guy",
        created_at:new Date()
    },
    {
        from:"baba",
        to:"kaka",
        msg:"good morning",
        created_at:new Date()
    },
    {
        from:"nena",
        to:"chetan",
        msg:"by chetan",
        created_at:new Date()
    }

];

Chat.insertMany(allchats);
  
