const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Todo = require("../models/Todo");
const privateKey = process.env.PRIVATE_KEY;

router.use(function (req, res, next) {
    if (req.header("Authorization")) {
        try {
            req.payload = jwt.verify(req.header("Authorization"), privateKey, {
                algorithms: ["RS256"],
            });
            next();
        } catch (error) {
            return res.status(401).json({ error: error.message });
        }
    } else {
        return res.status(401).json({ error: "Authorization header missing." });
    }
});

router.post("/", async function (req, res) {
    const todo = new Todo({
        title: req.body.title,
        description: req.body.description,
        author: req.payload.id,
        dateCreated: req.body.dateCreated,
        complete: req.body.complete,
        dateCompleted: req.body.dateCompleted,
    });
    return todo
        .save()
        .then((savedTodo) => {
            return res.status(201).json({
                _id: savedTodo._id,
                title: savedTodo.title,
                description: savedTodo.description,
                author: savedTodo.author,
                dateCreated: savedTodo.dateCreated,
                complete: savedTodo.complete,
                dateCompleted: savedTodo.dateCompleted,
            });
        })
        .catch((error) => {
            return res.status(500).json({ error: error.message });
        });
});

router.get("/", async function (req, res) {
    Todo.find()
        .where("author")
        .equals(req.payload.id)
        .then((todos) => {
            return res.status(200).json(todos);
        })
        .catch((error) => {
            return res.status(500).json({ error: error.message });
        });
});

router.patch("/:id", async function (req, res) {
    const todo = await Todo.findByIdAndUpdate(
        req.body.id,
        {
            complete: req.body.complete,
            dateCompleted: req.body.dateCompleted,
        }
    );
    return res.status(200).json({ todo });
});

router.delete("/:id", async function (req, res) {
    const todo = await Todo.findByIdAndDelete(req.body.id);
    return res.status(200).json({ todo });
});


module.exports = router;
