const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User API",
      version: "1.0.0",
      description: "API for managing users",
    },
  },
  apis: ["./src/interfaces/controllers/*.js"], 
};

module.exports = swaggerJsDoc(options);