import express, { Application, Request, Response } from 'express'
import cors from 'cors';
import { bookRouter } from './app/controllers/book.controller';
import { borrowRouter } from './app/controllers/borrow.controller';

const app:Application = express();

// use express middleware
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}));
app.use(express.json());
// api routes
app.use('/api/books', bookRouter);
app.use('/api/borrow', borrowRouter);

// Root route
app.get('/', (req:Request, res:Response)=>{
    res.send("book server is running")
});

export default app;