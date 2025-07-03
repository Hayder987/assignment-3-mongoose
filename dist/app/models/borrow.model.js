"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrow = void 0;
const mongoose_1 = require("mongoose");
// create schema 
const borrowSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
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
}, {
    versionKey: false,
    timestamps: true
});
// create borrow model
exports.Borrow = (0, mongoose_1.model)('Borrow', borrowSchema);
