import { Book } from '../models/book.model.js';
import { User } from '../models/user.model.js';
import mongoose from 'mongoose';

// create book
export const createBook = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name || !description) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }
        const existingBook = await Book.findOne({
            name,
            user: req.user._id
        });

        if (existingBook) {
            return res.status(400).json({
                message: "Book already exists"
            });
        }

        const book = await Book.create({ name, description, user: req.user._id });

        res.status(201).json({
            success: true,
            data: book,
            message: "New book created"
        });

    } catch (error) {
        console.log("Error in createBook controller");
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

// update book
export const updateBook = async (req, res) => {
    try{
        const { id } = req.params;
        const { name, description } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid ObjectId"
            });
        }

        const book = await Book.findById(id);

        if(!book){
            return res.status(404).json({
                message: "Book not found"
            });
        }

        if (book.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "You are not allowed to update this book"
            });
        }

        if(name){
            book.name = name;
        }

        if(description){
            book.description = description;
        }

        const updatedBook = await book.save();

        return res.status(200).json({
            success: true,
            data: updatedBook,
            message: "Book updated successfully"
        });

    }catch(error){
        console.log("Error in updateBook controller", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

// delete book
export const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid ObjectId"
            });
        }

        const book = await Book.findById(id);

        if(!book){
            return res.status(404).json({
                message: "Book not found"
            });
        }

        if (book.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Not allowed to delete this book"
            });
        }

        await book.deleteOne();

        res.status(200).json({
            success: true,
            message: "Book deleted successfully"
        });
    } catch (error) {
        console.log("Error in deleteBook controller", error);
        res.status(500).json({
            message: "Internal server error"
        })
    }
};

// get books
export const getBooks = async (req, res) => {
    try {
        const userId = req.user._id;

        const books = await Book.find({ user: userId });

        if (books.length === 0) {
            return res.status(404).json({
                message: "No books found"
            });
        }

        res.status(200).json({
            success: true,
            data: books,
            message: "Book fetched successfully"
        });
    } catch (error) {
        console.log("Error in getBooks controller", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

//get book by id
export const getBookById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid ObjectId"
            });
        }

        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        if (book.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Not allowed to access this book"
            });
        }

        res.status(200).json({
            success: true,
            data: book,
            message: "Book fetched successfully"
        });

    } catch (error) {
        console.log("Error in getBookById controller", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};