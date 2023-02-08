const express=require("express");
const cors=require("cors");
const bodyParser=require("body-parser");

const app=express();
 const Database=require("./Database");
 const db= new Database();
              
 app.use(cors());
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({extended:false}));

 

 app.post('/notes',(req,res)=>{
 const body=req.body;
db.addNote(body).then((Data)=>res.send(Data)).catch((err)=>res.status(500).send(err));
 
 });


 app.get('/notes/',(req,res)=>{
    const {title}=req.query;
    if(title){
        db.getNotesByTitle(title).then((Data)=>res.send([Data])).catch((err)=>res.status(500).send(err));
    }
    else
  db.getNotes().then((Data)=>res.send(Data)).catch((err)=>res.status(500).send(err))});

app.get('/notes/:id',(req,res)=>{
    const {id}=req.params;
    db.getNoteById(id).then((Data)=>{
        if(!Data) res.status(404).send("note not found");
       else res.send(Data);
    })
    .catch((err)=>res.status(500).send(err));
});

app.put('/notes',(req,res)=>{
    db.updateNote(req.body).then((Data)=>{
        if(!Data) res.status(404).send("note not found");
       else res.send(Data);
    })
    .catch((err)=>res.status(500).send(err));
});


app.delete('/notes/:id',(req,res)=>{
    const {id}=req.params;
    db.deleteNote(id).then((Data)=>{
        if(!Data) res.status(404).send("note not found");
       else res.send(Data);
    })
    .catch((err)=>res.status(500).send(err));
});
 const port=process.env.PORT||5000;

 db.connect().then((data)=>{ app.listen(port,()=> console.log(` server has started on port ${port}....\n ${data}`))
}).catch((err)=>console.log(err));

