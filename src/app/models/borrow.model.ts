import { model, Schema } from "mongoose";
import { BorrowI } from "../interfaces/borrow.interface";

const borrowSchema = new Schema<BorrowI>({
  book: {
    type: Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  quantity: { 
    type: Number, 
    required: true, 
    min: 1 
  },
  dueDate: { 
    type: Date, 
    required: true 
  },
},
{
    versionKey:false,
    timestamps: true
}
);

const Borrow = model('Borrow', borrowSchema);
