"use strict";

const Category = require("../models/category.model");

module.exports = {
  list: async (req, res) => {
    const Categories = await Category.find().sort({ createdAt: -1 });

    res.send({
      error: false,
      message: "Categories Listed successfully",
      Categories: Categories,
    });
  },
  create: async (req, res) => {
    const category = await Category.create(req.body);
    res.send({
      error: false,
      message: "Category Created successfully",
      category: category,
    });
  },
  read: async (req, res) => {
    const category = await Category.findById(req.params.id);
    res.send({
      error: false,
      message: "Category listed successfully",
      category: category,
    });
  },
  update: async (req, res) => {
    // if (!req.user.token) {
    //   res.errorStatusCode = 401;
    //   throw new Error("Hey Bro You should provide a valid TOKEN");
    // }
    await Category.updateOne({ _id: req.params.id }, req.body);
    const updateOne = await Category.findOne({ _id: req.params.id });

    res.send({
      error: false,
      message: "Category updated successfully",
      category: updateOne,
    });
  },
  delete: async (req, res) => {
    const category = await Category.deleteOne({ _id: req.params.id });
    console.log(category);
    res.status(category.deletedCount ? 200 : 404).send({
      error: !category.deletedCount,
      message: category.deletedCount
        ? "Category deleted successfully"
        : "Category not found",
      category: category,
    });
  },
};
