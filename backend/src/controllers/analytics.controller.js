import express from 'express';
import { Transaction } from '../models/transaction.model.js';
import mongoose from 'mongoose';

export const getDashboardStats = async (req, res) => {
    try {
        const transactions = await Transaction.find({
            user: req.user._id,
        });

        let totalIncome = 0;
        let totalExpense = 0;

        transactions.forEach((t) => {
            if (t.transactionType === "cashIn") {
                totalIncome += t.amount;
            } else if (t.transactionType === "cashOut") {
                totalExpense += t.amount;
            }
        });

        const balance = totalIncome - totalExpense;

        const recentTransactions = await Transaction.find({
            user: req.user._id,
        })
            .populate("category", "name")
            .sort({ date: -1 })
            .limit(5);

        res.status(200).json({
            success: true,
            data: {
                totalIncome,
                totalExpense,
                balance,
                totalTransactions: transactions.length,
                recentTransactions,
            },
        });
    } catch (error) {
        console.log("Error in getDashboarrdStats controller", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const getBookSummary = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Book ID",
            });
        }

        const transactions = await Transaction.find({
            user: userId,
            book: id,
        });

        let totalIncome = 0;
        let totalExpense = 0;

        transactions.forEach((t) => {
            if (t.transactionType === "cashIn") {
                totalIncome += t.amount;
            } else {
                totalExpense += t.amount;
            }
        });

        return res.status(200).json({
            success: true,
            data: {
                totalIncome,
                totalExpense,
                balance: totalIncome - totalExpense,
                totalTransactions: transactions.length,
            },
        });
    } catch (error) {
        console.log("Error in getBookSummary controller", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const getMonthlyReport = async (req, res) => {
    try {
        const userId = req.user._id;

        const { month, year } = req.query;

        if (!month || !year) {
            return res.status(400).json({
                success: false,
                message: "Month and year are required",
            });
        }

        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59, 999);

        const transactions = await Transaction.find({
            user: userId,
            date: { $gte: startDate, $lte: endDate },
        }).sort({ date: -1 });

        let totalIncome = 0;
        let totalExpense = 0;

        transactions.forEach((t) => {
            if (t.transactionType === "cashIn") {
                totalIncome += t.amount;
            } else {
                totalExpense += t.amount;
            }
        });

        return res.status(200).json({
            success: true,
            data: {
                month,
                year,
                totalIncome,
                totalExpense,
                balance: totalIncome - totalExpense,
                totalTransactions: transactions.length,
                transactions, 
            },
        });
    } catch (error) {
        console.log("Error in getMonthlyReport controller", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};