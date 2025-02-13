// src/frameworks/server/app.js
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../../interfaces/swagger/swagger.js"); 
const userRoutes = require("../../interfaces/controllers/userController");

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Use your routes
app.use("/users", userRoutes);

module.exports = app;