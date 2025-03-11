const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../../interfaces/swagger/swagger.js");
const authRoutes = require("../../interfaces/routes/authRoutes");
const userRoutes = require("../../interfaces/routes/userRoutes");

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/auth", authRoutes);
app.use("/user", userRoutes);


module.exports = app;