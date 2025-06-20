import { model, Schema } from "mongoose";
import { BorrowI } from "../interfaces/borrow.interface";
import { Book } from "./book.model";

const borrowSchema = new Schema<BorrowI>({
  book: {
    type: Schema.Types.ObjectId,
    ref: "Book",
    required: [true, 'give book id'],
  },
  quantity: { 
    type: Number, 
    required: [true, 'please enter quantity'], 
    min: [1, 'please give 1 or more positive number, you give {VALUE}'] 
  },
  dueDate: { 
    type: Date, 
    required: [true, 'give return date'] 
  },
},
{
    versionKey:false,
    timestamps: true
}
);


export const Borrow = model('Borrow', borrowSchema);
