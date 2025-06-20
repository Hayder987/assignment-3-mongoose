import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
const PORT = 5000;


let server: Server;

// main server running function
async function main() {
  try {
    //  connect mongodb atlas
    await mongoose.connect(
      `mongodb+srv://liberyAdmin:wHgxCiQhfjvYUb3V@cluster0.rfkatef.mongodb.net/libraryDB?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("successfully connected with mongoDB");

    // server listening port 5000;
    server = app.listen(PORT, async () => {
      console.log(`Server Running At Port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
