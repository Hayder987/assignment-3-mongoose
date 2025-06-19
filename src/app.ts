import express, { Application, Request, Response } from 'express'

const app:Application = express();

// use express middleware
app.use(express.json());


// common/default route
app.get('/', (req:Request, res:Response)=>{
    res.send("book server is running")
});

export default app;