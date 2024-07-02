require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const taskRoutes = require("./routes/taskRoutes");
const cors = require("cors"); // Import cors

const app = express();

app.use(helmet());
app.use(express.json());

app.use(
  cors({
    origin: "https://tasked-one.vercel.app/", // Allow requests from this origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

mongoose.connect(process.env.MONGODB_URI);

app.use("/api/tasks", taskRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: "Internal Server Error" });
});

module.exports = app;
