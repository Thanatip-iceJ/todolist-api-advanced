require("dotenv").config();
const prisma = require("../models/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    const { username, password, confirmPassword, email } = req.body;
    console.log(username);
    console.log(password);
    console.log(email);

    const hashedPw = await bcrypt.hash(password, 12);
    await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPw,
      },
    });
    res.status(201).json({ message: "success" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const targetUser = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    console.log(targetUser);
    if (!targetUser) {
      res.status(400).json({ message: "invalid credential" });
      return;
    }
    const isMatch = await bcrypt.compare(password, targetUser.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid credential" });
      return;
    }

    const payload = { id: targetUser.id };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    console.log(accessToken);

    res.status(200).json({ accessToken });
  } catch (err) {
    console.log(err.name, err.message);
    next(err);
  }
};
