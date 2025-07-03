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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRouter = void 0;
const express_1 = __importDefault(require("express"));
const borrow_model_1 = require("../models/borrow.model");
const book_model_1 = require("../models/book.model");
exports.borrowRouter = express_1.default.Router();
// post borrow data
exports.borrowRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book, quantity, dueDate } = req.body;
        // find book and update copies 
        const updatedBook = yield book_model_1.Book.findOneAndUpdate({
            _id: book,
            copies: { $gte: quantity } // ensure enough copies
        }, {
            $inc: { copies: -quantity }
        }, { new: true });
        // if updated book not null update available status
        if (updatedBook) {
            yield updatedBook.updateAvailability();
        }
        // ensure actual copy available and updated Book not null then save data 
        let data;
        if (updatedBook) {
            data = yield borrow_model_1.Borrow.create(req.body);
        }
        res.status(201).json({
            success: updatedBook ? true : false,
            message: updatedBook ? "Book borrowed successfully" : "Book not found or insufficient copies",
            data: updatedBook ? data : null
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            error,
        });
    }
}));
// get Borrowed Books Summary (Using Aggregation)
exports.borrowRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrow_model_1.Borrow.aggregate([
            // create a group by book id 
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" },
                },
            },
            // find data on books collection using _id
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookInfo",
                },
            },
            // unwind bookinfo array
            { $unwind: "$bookInfo" },
            // display totalQuantity, bookInfo.title, bookInfo.isbn
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve summary",
            error,
        });
    }
}));
