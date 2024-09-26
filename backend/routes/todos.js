const express = require("express");
const Todo = require("../models/Todo");
const router = express.Router();

// Route to create a new todo
router.post("/todos", async (req, res) => {
    try {
        const todo = new Todo({
            title: req.body.title,
            completed: req.body.completed
        });
        await todo.save(); // Save the todo to the database
        res.status(201).json(todo); // Return the saved todo
    } catch (error) {
        console.error("Error saving todo:", error);
        res.status(400).json({ error: "Failed to save todo" });
    }
});

module.exports = router;
