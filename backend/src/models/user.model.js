import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: 8
    },
    profile: {
        url: {
            type: String
        },
        public_id: {
            type: String, 
        }
    },
},{timestamps: true});

export const User = mongoose.model("User", userSchema);