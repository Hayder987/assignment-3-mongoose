import express, { Request, Response } from "express";
import { Borrow } from "../models/borrow.model";

export const borrowRouter = express.Router();

// post borrow data
borrowRouter.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const data = await Borrow.create(body);
    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data,
    });
  } catch (error:any) {
    res.status(400).json({
      success: false,
      message: error.message,
      error,
    });
  }
});


