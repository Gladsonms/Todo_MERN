const router=require("express").Router()
//const createTodos =require("../controller/Todo")
 const mongoose=require('mongoose');
 const Todo = require("../modals/Todo");
router.get("/",async (req,res) =>{
    try {
        const todos= await Todo.find()
     

        res.status(200).json(todos);
    }
    catch(error)
    {
        res.status(404).json({message:error.message})
    }
})
router.post("/",async (req,res)=> {
    const todo=new Todo(req.body)
    try{
        await todo.save();
        res.status(201).json(todo)
    }
    catch( error) {
        res.status(409).json({error:error.message})
    }
  })
module.exports = router;
