require('dotenv').config();  // Load environment variables
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require('./config/db');  // DB connection function
const shortUrlRoutes = require("./application/routes/urlRoutes");
const swaggerUi = require('swagger-ui-express'); // Swagger UI
const swaggerSpec = require('./config/swagger'); // Swagger spec

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/url", shortUrlRoutes);  // URL shortener routes

// Connect to DB and start server
connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Database connection failed:', error);
  process.exit(1);  // Exit the process if DB connection fails
});
