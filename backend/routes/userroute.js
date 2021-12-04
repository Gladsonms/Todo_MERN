const router = require("express").Router();
//const createTodos =require("../controller/Todo")
const mongoose = require("mongoose");
const Todo = require("../modals/Todo");
//getting all todo
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();

    res.status(200).json(todos);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
///ading new todo
router.post("/", async (req, res) => {
  const todo = new Todo(req.body);
  try {
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
});
router.patch("/:id", async (req, res) => {
  console.log("inside update route");
  const { id } = req.params;
  const { title } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`this id ${id} si not valid`);
  }
  const todo = { title };

  const result = await Todo.findByIdAndUpdate(id, todo, { new: true });

  res.json(todo);
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`this id ${id} si not valid`);
  }
  await Todo.findByIdAndRemove(id);
  res.json({ message: "Todo delete Succefully" });
});
router.post("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`this id ${id} si not valid`);
  }
  try {
    await Todo.findByIdAndUpdate(id, { completed: true });
    res.json({ message: "Task completed succesfully", completed: true });
  } catch (error) {
    console.error(error);
  }
});
module.exports = router;
