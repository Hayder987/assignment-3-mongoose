import express, { Application, Request, Response } from 'express'
import cors from 'cors';
import { bookRouter } from './app/controllers/book.controller';

const app:Application = express();

// use express middleware
app.use(cors());
app.use(express.json());

// api routes
app.use('/api/books', bookRouter);


// Root route
app.get('/', (req:Request, res:Response)=>{
    res.send("book server is running")
});

export default app;