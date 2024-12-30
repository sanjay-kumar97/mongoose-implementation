const express = require("express");
const productRoutes = require("./routes/product.routes");
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api", productRoutes);
app.get("/", (_, res) => res.send("Hello World!"));

// Database Connection
connectDB();

module.exports = app;
