const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const noteSchema=Schema({
    title:{type:String,required:true},
    content:{type:String,required:true},
    createdDate:{type:Date,required:true},
   updatedDate:{type:Date,required:true}
});
//there are diferent between schema and modle
module.exports=mongoose.model('Note',noteSchema);
