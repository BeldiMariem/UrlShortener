const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "URL Shortener API",
      version: "1.0.0",
      description: "API for URL shortening and user management",
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "John Doe",
            },
            email: {
              type: "string",
              format: "email",
              example: "john@example.com",
            },
            role: {
              type: "string",
              enum: ["user", "admin"],
              example: "user",
            },
            password: {
              type: "string",
              writeOnly: true,
              example: "hashedPassword123",
            },
          },
          required: ["name", "email", "password"],
        },
        Url: {
          type: "object",
          properties: {
            longUrl: {
              type: "string",
              format: "uri",
              example: "https://example.com/very-long-url",
            },
            shortId: {
              type: "string",
              example: "abc123",
            },
            title: {
              type: "string",
              example: "Example URL",
            },
            userId: {
              type: "string",
              example: "64f1b1b1b1b1b1b1b1b1b1b1",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2023-08-31T10:00:00Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2023-08-31T10:00:00Z",
            },
          },
          required: ["longUrl", "shortId", "title", "userId"],
        },
      },
    },
  },
  apis: ["./src/interface/routes/*.js"], 
};

module.exports = swaggerJsDoc(options);