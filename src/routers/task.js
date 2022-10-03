const express = require("express");
const Task = require("../models/task");
const router = new express.Router();
const auth = require("../middleware/auth");

router.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await task.save();
    res.send(task).status(201);
  } catch (e) {
    res.status(400).send(e);
  }
});

// GET /tasks?completed=
router.get("/tasks", auth, async (req, res) => {
  if (req.query.sortBy) {
  }
  const [sortKey, sortValue] = req.query.sortBy.split(":");
  try {
    const tasks = await Task.find({
      owner: req.user._id,
      completed: req.query.completed == "true" ? true : false,
    })
      .limit(parseInt(req.query.limit))
      .skip(parseInt(req.query.skip))
      .sort({ [sortKey]: sortValue == "asc" ? 1 : -1 });

    // await req.user.populate({
    //   path: 'tasks',
    //   match: {
    //     completed: true
    //   }
    // })
    res.status(200).send(tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).send();
    }

    res.status(200).send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      res.status(404).send();
    }

    updates.forEach((update) => (task[update] = req.body[updates]));
    task.save();

    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    return res.status(500).send();
  }
});

module.exports = router;
