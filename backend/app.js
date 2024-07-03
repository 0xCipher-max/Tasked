require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const taskRoutes = require("./routes/taskRoutes");
const cors = require("cors"); // Import cors

const app = express();

app.use(helmet());
app.use(express.json());
// const allowedOrigins = [
//   "https://your-frontend-url.com",
//   "http://127.0.0.1:3000", // For development
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.indexOf(origin) === -1) {
//         const msg =
//           "The CORS policy for this site does not allow access from the specified origin.";
//         return callback(new Error(msg), false);
//       }
//       return callback(null, true);
//     },
//     credentials: true,
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   })
// );

mongoose.connect(process.env.MONGODB_URI);

app.use("/api/tasks", taskRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: "Internal Server Error at entry" });
});

module.exports = app;
