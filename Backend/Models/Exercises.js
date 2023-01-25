const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const exerciseSchema=new Schema({
    userid:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    set:{
        type:Number,
        required:true
    },
    MaxWeight:{
        type:Number,
        required:true
    },
    notes:{
        type:String,
        required:true
    }
});
const Exercise=mongoose.model('Exercise',exerciseSchema);
module.exports=Exercise;