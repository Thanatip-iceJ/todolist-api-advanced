require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const notFoundMiddleWare = require("./middlewares/notFound");
const errorMiddleWare = require("./middlewares/error");
const authRoute = require("./routes/auth-route");
const todoRoute = require("./routes/todo-route");

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/auth", authRoute);
app.use("/todo", todoRoute);

app.use(notFoundMiddleWare);
app.use(errorMiddleWare);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log("server is running on port", port));
