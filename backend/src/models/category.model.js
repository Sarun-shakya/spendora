import mongoose, { Schema } from 'mongoose';

const categorySchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    }
}, {timestamps: true});

export const Category = mongoose.model("Category", categorySchema);