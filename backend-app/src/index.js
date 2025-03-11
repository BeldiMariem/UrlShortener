const app = require("./frameworks/server/app"); // Import the app instance
const connectDB = require("./frameworks/database/mongoose/mongoose");
const config = require("./config/env");

connectDB();

// Start the server
const PORT = config.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});