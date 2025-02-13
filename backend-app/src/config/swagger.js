const swaggerJsdoc = require("swagger-jsdoc");

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'URL Shortener API',
        version: '1.0.0',
        description: 'A simple API to shorten URLs',
    },
    servers: [
        {
            url: process.env.BASE_URL || 'http://localhost:5000',
        },
    ],
};
const options = {
    swaggerDefinition,
    apis: ['./src/application/routes/*.js'],
};
const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
