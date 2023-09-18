const User = require("../models/user.model");
const HTTP = require("../config/constants");

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require('dotenv').config();

exports.signup = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (user) {
      return res.status(HTTP.CONFLICT).send({
        message: 'User with this username is already exist!',
      });
    }

    const userModel = new User(req.body);
    userModel.password = await bcrypt.hash(userModel.password, 10);
    const userData = await userModel.save();

    res.status(HTTP.OK).send({
      message: 'User created successfully!',
      data: userData
    });
  } catch (error) {
    console.log(error);
    res.status(HTTP.BAD_REQUEST).send({ message: "Something went wrong!", error });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username
    });
    if (!user) {
      res.status(HTTP.UNAUTHORIZED).send({ message: "Invalid credentials" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(HTTP.UNAUTHORIZED).send({
        message: 'UnAuthorized',
      });
    }

    const payload = {
      id: user._id,
      name: user.name,
      username: user.username
    };
    jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: 3600 * 24 }, (err, token) => {
      if (err) {
        res.status(HTTP.UNAUTHORIZED).send({ message: "Invalid credentials", err });
      }
      res.status(HTTP.OK).send({
        message: "Logged in successfully",
        token: `Bearer ${token}`,
      });
    });
  } catch (error) {
    res.status(HTTP.BAD_REQUEST).send({ message: "Please enter valid email or password", error });
  }
};