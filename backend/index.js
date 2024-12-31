const userRouter = require("./routes/user");
const transactionRouter = require("./routes/transaction");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"], // allowing only this origin to send API request eg: http://localhost:3000
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json("server up and running...")
})

app.use("/api/v2", userRouter);
app.use("/api/v2", transactionRouter);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
