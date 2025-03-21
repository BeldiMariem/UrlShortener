const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../../interface/swagger/swagger.js");
const authRoutes = require("../../interface/routes/authRoutes");
const userRoutes = require("../../interface/routes/userRoutes");

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/auth", authRoutes);
app.use("/user", userRoutes);


module.exports = app;