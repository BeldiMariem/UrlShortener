const app = require("./frameworks/server/app");
const connectDB = require("./frameworks/database/mongoose/mongoose");
const config = require("./config/env");

connectDB();
const PORT = config.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
