"use strict";

const Blog = require("../models/blog.model");

module.exports = {
  list: async (req, res) => {
    const Blogs = await Blog.find().sort({ createdAt: -1 });
    res.send({
      error: false,
      message: "Blog List",
      Blogs: Blogs,
    });
  },
  create: async (req, res) => {
    const blog = await Blog.create(req.body);
    res.send({
      error: false,
      message: "Blog Created",
      blog: blog,
    });
  },
  read: async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    res.send({
      error: false,
      message: "Blog Read",
      blog: blog,
    });
  },
  update: async (req, res) => {
    // if (!req.user.token) {
    //   res.errorStatusCode = 401;
    //   throw new Error("Hey Bro You should provide a valid TOKEN");
    // }
    await Blog.findByIdAndUpdate(req.params.id, req.body);
    const updateOne = await Blog.findById(req.params.id);

    res.send({
      error: false,
      message: "Blog Updated",
      blog: updateOne,
    });
  },
  delete: async (req, res) => {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    res.send({
      error: false,
      message: "Blog Deleted",
      blog: blog,
    });
  },
};
