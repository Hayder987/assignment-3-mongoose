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
exports.bookRouter = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
// create bookRouter
exports.bookRouter = express_1.default.Router();
// book post api
exports.bookRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const data = yield book_model_1.Book.create(body);
        // manually set copies update available false if copies give zero
        if (data) {
            yield data.updateAvailability();
        }
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data,
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
// get all books with genre filter, sorted and limit
exports.bookRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sort, limit } = req.query;
        const query = filter ? { genre: filter } : {};
        const sortOrder = sort === "asc" ? 1 : -1;
        const numberLimit = parseInt(limit) || 10;
        const data = yield book_model_1.Book.find(query)
            .sort({ createdAt: sortOrder }) // Sort by createdAt
            .limit(numberLimit);
        res.status(200).json({
            success: data.length > 0 ? true : false,
            message: data.length > 0 ? "Books retrieved successfully" : "No book Found",
            data: data.length > 0 ? data : [],
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "Failed to retrieve books",
            error: error === null || error === void 0 ? void 0 : error.message,
        });
    }
}));
// get book by id
exports.bookRouter.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const data = yield book_model_1.Book.findById(bookId);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "Failed to retrieve books",
            error,
        });
    }
}));
// update book by id
exports.bookRouter.patch("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const body = req.body;
        const data = yield book_model_1.Book.findByIdAndUpdate(bookId, body, { new: true });
        // update copies update available false if copies give zero
        if (data) {
            yield data.updateAvailability();
        }
        res.status(200).json({
            success: true,
            message: "Books update successfully",
            data,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
            error,
        });
    }
}));
// delete book by id
exports.bookRouter.delete("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const data = yield book_model_1.Book.findByIdAndDelete(bookId);
        res.status(200).json({
            success: true,
            message: "Books Delete successfully",
            data: null,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
            error,
        });
    }
}));
