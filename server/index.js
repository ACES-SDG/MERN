const express = require("express");
const mongoose = require("mongoose");
const FormModel = require("./models/Form")
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://Pass:veryeasy@dataform.qryhwgr.mongodb.net/Form?retryWrites=true&w=majority",{
    useNewUrlParser:true,
}); 
app.get("/read",async(req,res)=>{
    FormModel.find({},(err,result)=>{
        if(err){
            res.send(err);
        }
        res.send(result);
    })
})
app.delete('/delete/:id', async(req,res)=>{
    const id= req.params.id;
    await FormModel.findByIdAndRemove(id).exec()
    res.send('deleted');
}

)

// app.put('/update',async(req,res)=>{
//     const newName = req.body.name;
//     const id = req.body.id;
// try{
//     await FormModel.findById(id,(err, updatedForm)=>{
//         updatedForm.name = newName;
//         updatedForm.save();
//         res.send('updated');
//     });
// }catch (err){
// console.log(err);   
// }

// });
app.put("/update",async(req,res)=>{
    const newName = req.body.newName;
    const id = req.body.id;
   
    try{
        await FormModel.findById(id,(err,uForm)=>{
            uForm.name= newName;
            uForm.save();
            res.send("updated")
        });
    }catch(err){
        console.log(err)
    }
});

app.post("/insert",async(req,res)=>{
    const name = req.body.name;
    const number = req.body.number;
    const form = new FormModel({
        name:name,number:number

    });
    try{
        await form.save();
        res.send("inserted")
    }catch(err){
        console.log(err)
    }
});
app.listen(3001,()=>{
    console.log("server runnine on 3001....");
})