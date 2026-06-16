import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const transactionSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ["online", "check", "cash", "card"],
        required: true
    },
    transactionType: {
        type: String,
        enum: ["cashIn", "cashOut"],
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    remarks: {
        type: String
    },
    receipt: {
        url: {
            type: String
        },
        public_id: {
            type: String,
        }
    }
}, { timestamps: true });

export const Transaction = mongoose.model("Transaction", transactionSchema);