import express, { Request, Response } from "express";
import { Borrow } from "../models/borrow.model";
import { Book } from "../models/book.model";

export const borrowRouter = express.Router();

// post borrow data
borrowRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { book, quantity, dueDate } = req.body;

    // find book and update copies 
    const updatedBook = await Book.findOneAndUpdate(
      {
        _id: book,
        copies: { $gte: quantity } // ensure enough copies
      },
      {
        $inc: { copies: -quantity } 
      },
      { new: true } 
    );

    // if updated book not null update available status
    if(updatedBook){
      await updatedBook.updateAvailability();
    }

    // ensure actual copy available and updated Book not null then save data 
    let data;
    if(updatedBook){
       data = await Borrow.create(req.body)
    }

    res.status(201).json({
      success: updatedBook?true:false,
      message: updatedBook?"Book borrowed successfully":"Book not found or insufficient copies",
      data:updatedBook?data:null
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
      error,
    });
  }
});

// get Borrowed Books Summary (Using Aggregation)
borrowRouter.get("/", async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookInfo",
        },
      },
      { $unwind: "$bookInfo" },
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookInfo.title",
            isbn: "$bookInfo.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);

    res.json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve summary",
      error,
    });
  }
});
