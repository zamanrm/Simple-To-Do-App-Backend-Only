const Todo = require("../models/Todo");
const allowedFields = ["title", "description", "completed"];

async function createTodo(req, res) {
  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    return res.status(400).json({
      success: false,
      error: { message: "Request body must be a JSON object" },
    });
  }

  if (Object.keys(req.body).some((field) => !allowedFields.includes(field))) {
    return res.status(400).json({
      success: false,
      error: { message: "Only title, description, and completed fields are allowed" },
    });
  }

  const { title, description, completed } = req.body;

  if (typeof title !== "string" || title.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: { message: "Title is required and must be a non-empty string" },
    });
  }

  if (description !== undefined && typeof description !== "string") {
    return res.status(400).json({
      success: false,
      error: { message: "Description must be a string" },
    });
  }

  if (completed !== undefined && typeof completed !== "boolean") {
    return res.status(400).json({
      success: false,
      error: { message: "Completed must be a boolean" },
    });
  }

  const todo = await Todo.create({
    title: title.trim(),
    description,
    completed,
  });

  return res.status(201).json({ success: true, data: todo });
}

async function getTodos(req, res) {
  const todos = await Todo.find().sort({ createdAt: -1 });
  return res.status(200).json({ success: true, data: todos });
}

async function getTodoById(req, res) {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    return res.status(404).json({
      success: false,
      error: { message: "Todo not found" },
    });
  }

  return res.status(200).json({ success: true, data: todo });
}

async function updateTodo(req, res) {
  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    return res.status(400).json({
      success: false,
      error: { message: "Request body must be a JSON object" },
    });
  }

  const updates = Object.keys(req.body);

  if (updates.length === 0 || updates.some((field) => !allowedFields.includes(field))) {
    return res.status(400).json({
      success: false,
      error: { message: "Provide at least one valid field: title, description, completed" },
    });
  }

  if (
    "title" in req.body &&
    (typeof req.body.title !== "string" || req.body.title.trim().length === 0)
  ) {
    return res.status(400).json({
      success: false,
      error: { message: "Title must be a non-empty string" },
    });
  }

  if ("description" in req.body && typeof req.body.description !== "string") {
    return res.status(400).json({
      success: false,
      error: { message: "Description must be a string" },
    });
  }

  if ("completed" in req.body && typeof req.body.completed !== "boolean") {
    return res.status(400).json({
      success: false,
      error: { message: "Completed must be a boolean" },
    });
  }

  if (typeof req.body.title === "string") {
    req.body.title = req.body.title.trim();
  }

  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!todo) {
    return res.status(404).json({
      success: false,
      error: { message: "Todo not found" },
    });
  }

  return res.status(200).json({ success: true, data: todo });
}

async function deleteTodo(req, res) {
  const todo = await Todo.findByIdAndDelete(req.params.id);

  if (!todo) {
    return res.status(404).json({
      success: false,
      error: { message: "Todo not found" },
    });
  }

  return res.status(200).json({
    success: true,
    data: todo,
    message: "Todo deleted successfully",
  });
}

module.exports = { createTodo, getTodos, getTodoById, updateTodo, deleteTodo };
