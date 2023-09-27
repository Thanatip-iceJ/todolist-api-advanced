const prisma = require("../models/prisma");

exports.createTodo = async (req, res, next) => {
  try {
    const { title, completed, dueDate } = req.body;
    console.log(req.user.id);
    // VALIDATE 1.Manual 2.Validation library eg. Joi, Yup, Zod
    await prisma.todo.create({
      data: {
        title: title,
        completed: completed,
        dueDate: dueDate,
        user: {
          connect: req.user,
        },
      },
    });
    res.status(201).json({ message: "created" });
  } catch (error) {
    next(error);
  }
};

exports.getTodo = async (req, res, next) => {
  try {
    const todos = await prisma.todo.findMany({
      where: {
        userId: req.user.id,
      },
    });
    res.status(200).json({ todos });
  } catch (err) {
    next(err);
  }
};
