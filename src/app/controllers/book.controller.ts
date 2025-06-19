import express, { Request, Response } from "express";
import { Book } from "../models/book.model";

// create bookRouter
export const bookRouter = express.Router();

bookRouter.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const data = await Book.create(body);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
      success: false,
      error,
    });
  }
});
