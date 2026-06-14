import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},{timestamps: true});

export const Book = mongoose.model("Book", bookSchema);