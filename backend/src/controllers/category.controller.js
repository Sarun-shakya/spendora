import { Category } from "../models/category.model.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";

export const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Name is required"
            });
        }

        const existingCategory = await Category.findOne({
            name,
            user: req.user._id
        });

        if (existingCategory) {
            return res.status(400).json({
                message: "Category already exists"
            });
        }

        const category = await Category.create({ name, description, user: req.user._id });

        res.status(201).json({
            succss: true,
            data: category,
            message: "New category created"
        });
    } catch (error) {
        console.log("Error in createCategory controller", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid ObjectId"
            });
        }

        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        if (category.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "You are not allowed to update this category"
            });
        }

        if (name) {
            category.name = name;
        }

        if (description) {
            category.description = description;
        }

        const updatedCategory = await category.save();

        return res.status(200).json({
            success: true,
            data: updatedCategory,
            message: "Category updated successfully"
        });
    } catch (error) {
        console.log("Error in createCategory controller", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid ObjectId"
            });
        }

        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        if (category.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Not allowed to delete this category"
            });
        }

        await category.deleteOne();

        res.status(200).json({
            success: true,
            message: "Category deleted successfully"
        });
    } catch (error) {
        console.log("Error in createCategory controller", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const getAllCategories = async (req, res) => {
    try {
        const userId = req.user._id;

        const categories = await Category.find({ user: userId });

        if (categories.length === 0) {
            return res.status(404).json({
                message: "No categories found"
            });
        }

        res.status(200).json({
            success: true,
            data: categories,
            message: "Categories fetched successfully"
        });
    } catch (error) {
        console.log("Error in createCategory controller", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};