const mongoose = require("mongoose");
const note = require("./schemas/note");
const Note = require("./schemas/note");

class Database {
  constructor() {
    this.Url =process.env.MONGODB_URL || 'mongodb+srv://root:2000@notatydb.ey9g0vl.mongodb.net/?retryWrites=true&w=majority';
    //this.Url = "mongodb+srv://root:root@cluster0.vxryvdp.mongodb.net/test?retryWrites=true&w=majority";
    //this.Url = 'mongodb://root:2000@ac-bdk99x2-shard-00-00.ey9g0vl.mongodb.net:27017,ac-bdk99x2-shard-00-01.ey9g0vl.mongodb.net:27017,ac-bdk99x2-shard-00-02.ey9g0vl.mongodb.net:27017/notatydb?ssl=true&replicaSet=atlas-hdelyt-shard-0&authSource=admin&retryWrites=true&w=majority';
  }

  connect() {
    return new Promise((resolve,reject)=>{
        mongoose.connect(this.Url, (err, db) => {
        if (err) throw reject(err);
        resolve("Database created!");
        //db.close();
      })
    });
    
  }

  addNote(note) {
    return new Promise((resolve, reject) => {
      note["createdDate"] = new Date();
      note["updatedDate"] = new Date();
      let newNote = new Note(note);
      newNote
        .save()
        .then((doc) => resolve(doc))
        .catch((err) => reject(err));
    });
  }

  getNotes(){
    return new Promise((resolve,reject)=>{
        Note.find({}).then((Data)=>resolve(Data)).catch((err)=>reject(err));
    });
  }
  getNotesByTitle(noteTitle){
    return new Promise((resolve,reject)=>{
      Note.findOne({title:{$regex:new RegExp(noteTitle,'i')}}).then((Data)=>resolve(Data)).catch((err)=>reject(err));
        });

  }
  getNoteById(id){
    return new Promise((resolve,reject)=>{
      Note.findById(id).then((Data)=>resolve(Data)).catch((err)=>reject(err));
    });
  }

  updateNote(note){
    note["updatedDate"]=new Date;
    return new Promise((resolve,reject)=>{
  Note.findByIdAndUpdate(note["_id"],note).then((Data)=>resolve(Data)).catch((err)=>reject(err));
    });
  }

  deleteNote(id){
    return new Promise((resolve,reject)=>{
  Note.findByIdAndDelete(id).then((Data)=>resolve(Data)).catch((err)=>reject(err));
    });
  }
}




module.exports = Database;
