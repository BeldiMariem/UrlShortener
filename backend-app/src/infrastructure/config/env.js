require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  BASE_URL: process.env.BASE_URL,
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  GOOGLE_CX_ID: process.env.GOOGLE_CX_ID,
};