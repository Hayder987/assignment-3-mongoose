import { Types } from "mongoose";

export interface BorrowI {
    book:Types.ObjectId,
    quantity: number,
    dueDate: Date
};