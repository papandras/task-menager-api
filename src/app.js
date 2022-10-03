require("./db/mongoose");
const express = require("express");
const app = express();
const port = process.env.PORT;
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const sharp = require("sharp")

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => console.log(`Server is on ${port} port.`));
