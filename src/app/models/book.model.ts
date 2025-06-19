import { model, Schema } from "mongoose";
import { BookI } from "../interfaces/book.interface";

// create book schema according interface BookI
const bookSchema = new Schema<BookI>(
{
  title: {
    type: String,
    required: [true, 'title is required'],
  },
  author: {
    type: String,
    required: [true, 'author is required'],
  },
  genre: {
    type: String,
    required: [true, "genre is required"],
    uppercase:true,
    enum: {
      values: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
      message:
        "genre will be fiction, non_fiction, science, history, biography, fantasy, you give {VALUE}",
    },
  },
  isbn: {
    type: String,
    required: [true, "isbn is required"],
    unique: [true, "already this number added as isbn"],
  },
  description: {
    type: String,
    default: "A brief summary or description of the book",
  },
  copies: {
    type: Number,
    required: [true, "Copies are required"],
    min: [0, "Copies must be a positive number"],
  },
  available:{
    type: Boolean,
    default: true
  }
},
{
    versionKey:false,
    timestamps: true
}
);

// create book model
export const Book = model("Book", bookSchema);
