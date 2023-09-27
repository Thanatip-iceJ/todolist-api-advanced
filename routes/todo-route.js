const express = require("express");
//
const todoController = require("../controllers/todo-controller");
const authenticateMiddleWare = require("../middlewares/authenticate");
//
const router = express.Router();

router.use(authenticateMiddleWare);
router.post("/", todoController.createTodo);
router.get("/", todoController.getTodo);

module.exports = router;
