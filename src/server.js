require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./app");

const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error("MONGODB_URI is not set. Add it to your .env file.");
  process.exit(1);
}

async function startServer() {
  await mongoose.connect(mongoUri);
  console.log("Connected to MongoDB");

  app.listen(port, () => {
    console.log(`Todo API is running at http://localhost:${port}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start the server:", error);
  process.exit(1);
});
