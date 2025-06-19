import { Server } from "http";
import app from "./app";
import dotenv from 'dotenv';
import mongoose from "mongoose";
const PORT = process.env.PORT || 5000;

dotenv.config();

let server:Server;

// main server running function
async function main(){

// server listening port 5000;
  server= app.listen(PORT, async()=>{
    try {
    //  connect mongodb atlas
     await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rfkatef.mongodb.net/libraryDB?retryWrites=true&w=majority&appName=Cluster0`)
     console.log('successfully connected with mongoDB')
     
     console.log(`Server Running At Port: ${PORT}`)   
    } catch (error) {
       console.log(error)
    }
    
  })
}

main();