import express from 'express';
import { Transaction } from '../models/transaction.model.js';
import { Book } from '../models/book.model.js';
import { Category } from '../models/category.model.js';
import mongoose from 'mongoose';
import { uploadOnCloudinary, deleteOnCloudinary } from '../config/cloudinary.js';
import { generateTransactionPDF } from "../config/pdf.js";

// create transaction
export const createTransaction = async (req, res) => {
    try {
        const {
            book,
            category,
            paymentMethod,
            transactionType,
            date,
            amount,
            remarks
        } = req.body;

        if (
            !book ||
            !category ||
            !paymentMethod ||
            !transactionType ||
            !date ||
            !amount
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const existingBook = await Book.findOne({
            _id: book,
            user: req.user._id
        });

        if (!existingBook) {
            return res.status(400).json({
                message: "Book not found"
            });
        }

        const existingCategory = await Category.findOne({
            _id: category,
            user: req.user._id
        });

        if (!existingCategory) {
            return res.status(400).json({
                message: "Category not found"
            });
        }

        if (date) {
            const inputDate = new Date(date);
            const today = new Date();

            today.setHours(23, 59, 59, 999);

            if (inputDate > today) {
                return res.status(400).json({
                    success: false,
                    message: "Future dates are not allowed",
                });
            }
        }

        let receiptData = { url: "", public_id: "" };
        if (req.file) {
            const imageData = await uploadOnCloudinary(req.file.path);
            if (imageData) {
                receiptData.url = imageData.url;
                receiptData.public_id = imageData.public_id;
            }
        }

        const transaction = await Transaction.create({
            user: req.user._id,
            book,
            category,
            paymentMethod,
            transactionType,
            date,
            amount,
            remarks,
            receipt: receiptData
        });

        res.status(201).json({
            success: true,
            date: transaction,
            message: "Transaction created successfully",
        });
    } catch (error) {
        console.log("Error in createTransaction controller", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

// get all transaactions
export const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user._id }).populate("category", "name").sort({ createdAt: -1 });;

        if (transactions.length === 0) {
            return res.status(200).json({
                success: true,
                data: [],
                message: "No transactions found"
            });
        }
        res.status(200).json({
            success: true,
            data: transactions,
            message: "Transactions fetched successfully"
        });
    } catch (error) {
        console.log("Error in getTransactions controller", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

// get transaction by id
export const getTransactionById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid ObjectId"
            });
        }

        const transaction = await Transaction.findById(id).populate("book", "name").populate("category", "name");

        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found"
            });
        }

        if (transaction.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Not allowed to access this transaction"
            });
        }

        res.status(200).json({
            success: true,
            data: transaction,
            message: "Transaction fetched successfully"
        });
    } catch (error) {
        console.log("Error in getTransactionById controller", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

// update transaction
export const updateTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            category,
            paymentMethod,
            transactionType,
            date,
            amount,
            remarks
        } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid ObjectId"
            });
        }

        const transaction = await Transaction.findOne({
            _id: id,
            user: req.user._id
        });

        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found"
            });
        }

        if (paymentMethod) {
            transaction.paymentMethod = paymentMethod;
        }

        if (transactionType) {
            transaction.transactionType = transactionType;
        }

        if (date) {
            const inputDate = new Date(date);
            const today = new Date();

            today.setHours(23, 59, 59, 999);

            if (inputDate > today) {
                return res.status(400).json({
                    success: false,
                    message: "Future dates are not allowed",
                });
            }

            transaction.date = inputDate;
        }

        if (amount !== undefined) {
            transaction.amount = amount;
        }

        if (remarks !== undefined) {
            transaction.remarks = remarks;
        }

        if (category) {
            const existingCategory = await Category.findOne({
                _id: category,
                user: req.user._id,
            });

            if (!existingCategory) {
                return res.status(404).json({
                    success: false,
                    message: "Category not found",
                });
            }

            transaction.category = category;
        }

        if (req.file) {
            // Delete old image on Cloudinary if exists
            if (transaction.receipt?.public_id) {
                await deleteOnCloudinary(transaction.receipt.public_id);
            }

            // Upload new image
            const imageData = await uploadOnCloudinary(req.file.path);
            if (imageData) {
                transaction.receipt = {
                    url: imageData.url,
                    public_id: imageData.public_id
                };
            }
        }
        const updatedTransaction = await transaction.save();

        res.status(200).json({
            success: true,
            data: updatedTransaction,
            message: "Transaction updated successfully"
        });
    } catch (error) {
        console.log("Error in updateTransaction controller", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

// delete transaction
export const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid ObjectId"
            });
        }

        const transaction = await Transaction.findOne({
            _id: id,
            user: req.user._id,
        });

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found",
            });
        }

        await transaction.deleteOne();

        res.status(200).json({
            success: true,
            message: "Transaction deleted successfully"
        });
    } catch (error) {
        console.log("Error in deleteTransaction controller", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

// get transactions pdf
export const downloadBookTransactionPDF = async (req, res) => {
    try {
        const { bookId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Book ID",
            });
        }

        const transactions = await Transaction.find({
            user: req.user._id,
            book: bookId,
        })
            .populate("category", "name")
            .sort({ date: -1 });

        if (!transactions.length) {
            return res.status(404).json({
                success: false,
                message: "No transactions found for this book",
            });
        }

        generateTransactionPDF(transactions, res);
    } catch (error) {
        console.log("Book PDF error:", error);

        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
