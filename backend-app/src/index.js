const app = require("./infrastructure/server/app");
const connectDB = require("./infrastructure/database/mongoose/mongoose");
const config = require("./infrastructure/config/env");

connectDB();

const PORT = config.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});