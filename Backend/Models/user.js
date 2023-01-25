const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const userSchema=new Schema({
    userid:{
        type:String,
        required:true
    },
    fullname:{
        type:String,
        required:true
    }
});
const User=mongoose.model('User',userSchema);
module.exports=User;