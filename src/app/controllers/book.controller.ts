import express, { Request, Response } from "express";
import { Book } from "../models/book.model";

// create bookRouter
export const bookRouter = express.Router();

// book post api
bookRouter.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const data = await Book.create(body);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
      success: false,
      error,
    });
  }
});

// get all books with genre filter, sorted and limit
bookRouter.get("/", async (req: Request, res: Response) => {
  try {
    const { filter, sort , limit } = req.query;

    const query = filter ? { genre: (filter as string) } : {};
    const sortOrder = sort as string === "asc" ? 1 : -1;
    const numberLimit = parseInt(limit as string) || 10;

    const data = await Book.find(query)
      .sort({ createdAt: sortOrder }) // Sort by createdAt
      .limit(numberLimit);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: "Failed to retrieve books",
      error: error.message,
    });
  }
});

