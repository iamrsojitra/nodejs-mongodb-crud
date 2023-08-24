const Post = require("../models/post.model");

exports.add = async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(200).send({
      message: "Post created successfully!",
    });
  } catch (error) {
    console.log({error});
    res.status(400).send({ message: "Something went wrong!", error });
  }
};

exports.update = async (req, res) => {
  try {
    await Post.updateOne({ _id: req.params.id }, req.body);
    res.status(200).send({
      message: "Post updated successfully!"
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Something went wrong!", error });
  }
};

exports.delete = async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
    res.status(200).send({
      message: "Post deleted successfully!"
    });
  } catch (error) {
    res.status(400).send({ message: "Something went wrong!", error });
  }
};

exports.get = async (_, res) => {
  try {
    const posts = await Post.find();
    res.status(200).send({
      message: "Posts loaded successfully!",
      data: posts,
    });
  } catch (error) {
    res.status(400).send({ message: "Something went wrong!", error });
  }
};

exports.getById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).send({
      message: "Post loaded successfully!",
      data: post,
    });
  } catch (error) {
    res.status(400).send({ message: "Something went wrong!", error });
  }
};