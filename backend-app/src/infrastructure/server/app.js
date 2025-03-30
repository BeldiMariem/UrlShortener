const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../../interface/swagger/swagger.js");
const authRoutes = require("../../interface/routes/authRoutes");
const userRoutes = require("../../interface/routes/userRoutes");
const urlRoutes = require("../../interface/routes/urlRoutes");
const searchRoutes = require("../../interface/routes/searchRoutes");

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/url", urlRoutes);
app.use('/search', searchRoutes);


module.exports = app;