import express, { Request, Response } from "express";
import { Book } from "../models/book.model";

// create bookRouter
export const bookRouter = express.Router();

// book post api
bookRouter.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const data = await Book.create(body);

     // manually set copies update available false if copies give zero
    if(data){
      await data.updateAvailability()
    }

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
      error,
    });
  }
});

// get all books with genre filter, sorted and limit
bookRouter.get("/", async (req: Request, res: Response) => {
  try {
    const { filter, sort, limit } = req.query;

    const query = filter ? { genre: filter as string } : {};
    const sortOrder = (sort as string) === "asc" ? 1 : -1;
    const numberLimit = parseInt(limit as string) || 10;

    const data = await Book.find(query)
      .sort({ createdAt: sortOrder }) // Sort by createdAt
      .limit(numberLimit);

    res.status(200).json({
      success: data.length > 0 ? true : false,
      message:
        data.length > 0 ? "Books retrieved successfully" : "No book Found",
      data: data.length > 0 ? data : [],
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: "Failed to retrieve books",
      error:error?.message,
    });
  }
});

// get book by id
bookRouter.get("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const data = await Book.findById(bookId);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: "Failed to retrieve books",
      error,
    });
  }
});

// update book by id
bookRouter.patch("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const body = req.body;
    const data = await Book.findByIdAndUpdate(bookId, body, { new: true });
    
    // update copies update available false if copies give zero
    if(data){
      await data.updateAvailability()
    }

    res.status(200).json({
      success: true,
      message: "Books update successfully",
      data,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
      error,
    });
  }
});

// delete book by id
bookRouter.delete("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const data = await Book.findByIdAndDelete(bookId);

    res.status(200).json({
      success: true,
      message: "Books Delete successfully",
      data: null,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
      error,
    });
  }
});
