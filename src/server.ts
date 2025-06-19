import { Server } from "http";
import app from "./app";

const PORT = process.env.PORT || 5000;

let server:Server;

// main server running function
async function main(){

// server listening port 5000;
  server= app.listen(PORT, ()=>{
    console.log(`Server Running At Port: ${PORT}`)
  })
}

main();