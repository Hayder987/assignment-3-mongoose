"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
// create book schema according interface BookI
const bookSchema = new mongoose_1.Schema({
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
        uppercase: true,
        enum: {
            values: [
                "FICTION",
                "NON_FICTION",
                "SCIENCE",
                "HISTORY",
                "BIOGRAPHY",
                "FANTASY",
            ],
            message: "genre will be fiction, non_fiction, science, history, biography, fantasy, you give {VALUE}",
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
    available: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timestamps: true
});
// create a interface for available status update when copies getting 0
bookSchema.methods.updateAvailability = function () {
    return __awaiter(this, void 0, void 0, function* () {
        this.available = this.copies > 0;
        yield this.save();
    });
};
// create book model
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
