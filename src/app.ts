import express, { Application, Request, Response } from 'express'
import cors from 'cors';

const app:Application = express();

// use express middleware
app.use(cors());
app.use(express.json());


// Root route
app.get('/', (req:Request, res:Response)=>{
    res.send("book server is running")
});

export default app;