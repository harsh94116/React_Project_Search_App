const express = require("express");
const cors = require('cors')
const mongoose = require('mongoose');
const projcetModel = require("./Models/projectModel");
const app = express();
const PORT = 4000;

app.use(cors())
app.use(express.json());

const connectToDatabase = async()=>{
    try{
        await mongoose.connect('mongodb+srv://manoharharsh7:SZoBPJYWa0nBRoc4@cluster0.jmrlegk.mongodb.net/MY_DB');
        console.log("Connected to DB");
    }
    catch(err){
        console.log(err);
    }
};


const startServer = async()=>{


    await connectToDatabase();

    app.get("/",(req,res)=>{
        res.send("Hello server is running");
    });
    
    app.get("/allProjectData",async(req,res)=>{
        try{
            const projectData = await projcetModel.find({});
            res.json({projectData: projectData,Err:null});
         }
         catch(err){
            console.log(err);
            res.json({projectData: null,Err:err.message});
         }
    
    });

    app.get("/projectByTitle/:title",async(req,res)=>{
        try{
            const title = req.params.title;
            if(!title){
                res.json({projectData: projectData,Err:'Please pass atleast one title as param in api'});
                return;
            }
            const regexPattern = new RegExp(title, 'i');
            const projectData = await projcetModel.find({"Project.Title":{ $regex: regexPattern}});
            res.json({projectData: projectData,Err:null});
         }
         catch(err){
            console.log(err);
            res.json({projectData: null,Err:err.message});
         }
    
    });
    
    app.listen(PORT,()=>{
      console.log(`Server is listening on port ==> ${PORT}`);
    });
}

startServer();

