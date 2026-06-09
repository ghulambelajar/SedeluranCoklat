require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");

const app = express();

connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Import Routes and use them
const authRoutes = require("./src/routes/authRoutes");
app.use("/api/auth", authRoutes);

// Test Route
app.get("/", (req, res) => {
  res.json({ message: "Berhasil" });
});

// Running Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di mode pengembangan pada port ${PORT}`);
});
