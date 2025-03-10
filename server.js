// server.js - Main Entry Point
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const PORT = process.env.PORT || 5000;
const routes = require("./src/routes");
const errorHandler = require("./src/middlewares/errorHandler");
const connectDB = require("./src/config/mongo_db");

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Serve static files from 'uploads' directory
app.use("/uploads", express.static("uploads"));

// Connect to Database
connectDB();

// Routes
app.use("/api", routes);

// Error Handler Middleware
app.use(errorHandler);

// Start Server
app.listen(PORT, () => console.log(`Server running fine on port ${PORT}`));
