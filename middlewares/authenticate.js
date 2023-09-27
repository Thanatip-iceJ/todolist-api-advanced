const jwt = require("jsonwebtoken");
const prisma = require("../models/prisma");

module.exports = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    // console.log(authorization);
    if (!authorization) {
      res.status(401).json({ message: "You're unauthenticated" });
    }
    if (!authorization.startsWith("Bearer")) {
      res.status(401).json({ message: "You're unauthenticated" });
    }
    const token = authorization.split(" ")[1];
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY || "super secret"
    );
    req.payload = payload;
    const user = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
    });
    if (!user) {
      res.status(401).json({ message: "You're unauthenticated" });
      return;
    }
    // req.user.id = user;
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
