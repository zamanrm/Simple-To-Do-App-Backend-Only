const express = require("express");
const todoRoutes = require("./routes/todoRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Simple To-Do API is running",
    endpoints: ["/todos"],
  });
});

app.use("/todos", todoRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: { message: "Route not found" },
  });
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      success: false,
      error: { message: "Request body must contain valid JSON" },
    });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      error: { message: err.message },
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      error: { message: "Invalid todo ID" },
    });
  }

  console.error(err);
  return res.status(500).json({
    success: false,
    error: { message: "Internal server error" },
  });
});

module.exports = app;
