import { useState, useEffect } from "react";
import "./App.css";

//import {Button }from '@mui/material-ui/core';
import {
  Button,
  FormControl,
  InputLabel,
  Input,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";

import { readTodos, createTodos, updateTodos } from "./function/index";
import Preloader from "./components/Preloader";
import { deleteTodos, doneTodos } from "./api";

function App() {
  const [todo, setTodo] = useState({ title: "" }); //state for todo text
  const [input, setInput] = useState([]); //for input
  const [todos, setTodos] = useState(null);
  const [currentId, setCuurrentId] = useState(0);
  const [completetodo, setCompletedTodo] = useState(false);

  //display todo in input
  useEffect(() => {
    let currentTodo =
      currentId != 0
        ? todos.find((todo) => todo._id === currentId)
        : { title: "" };
    setTodo(currentTodo);
  }, [currentId]);

  //showing the todo
  useEffect(() => {
    const fetchData = async () => {
      const result = await readTodos();

      result && setTodos(result.data);
    };
    fetchData();
  }, [currentId]);

  //intiziale claear content in input
  const clear = () => {
    setCuurrentId(0);
    setTodo({ title: "" });
  };
  useEffect(() => {
    const clearField = (e) => {
      if (e.keyCode == 27) {
        clear();
      }
    };
    window.addEventListener("keydown", clearField);
    return () => window.removeEventListener("keydown", clearField);
  }, []);

  //onsubmit
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (currentId === 0) {
      const result = await createTodos(todo);

      setTodos([...todos, result.data]);
      clear();
    } else {
      await updateTodos(currentId, todo);
      clear();
    }
  };

  const removeTodo = async (id) => {
    await deleteTodos(id);
    const todosCopy = [...todos];
    todosCopy.filter((todo) => todo._id !== id);
    setTodos(todosCopy);
  };
  const completedTodo = async (id) => {
    await doneTodos(id).then((res) => {
      if (res.completed) {
        setCompletedTodo(true);
      }
    });
    // const finshed = [...todos];
    // finshed.filter((todo) => todo._id !== id);
    // setCompletedTodo(finshed);
  };

  return (
    <div className="App">
      <h1>Todo</h1>
      <div>
        <form onSubmit={onSubmitHandler}>
          <FormControl>
            <InputLabel>✔️ Write a Todo</InputLabel>
            <Input
              value={todo.title}
              onChange={(e) => setTodo({ ...todo, title: e.target.value })}
            />
          </FormControl>
          {/* <TextField id="standard-basic" label="Standard" variant="standard" type="text" value={input} onChange={event => setInput(event.target.value)} />  */}
          <Button
            disabled={!input}
            type="submit"
            variant="contained"
            color="success"
          >
            Add Todo
          </Button>
        </form>
        {!todos ? (
          <Preloader />
        ) : todos.length > 0 ? (
          <div className="main_div">
            <List className="todo_list">
              {todos.map((todo) => (
                <ListItem
                  key={todo._id}
                  onClick={() => {
                    setCuurrentId(todo._id);
                  }}
                >
                  <ListItemText
                    primary={todo.title}
                    secondary="Dummy Deadline ⏰⏰🔔🔔"
                  />
                  <button
                    className="delete_btn"
                    onClick={() => removeTodo(todo._id)}
                  >
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </button>
                  {!todo.completed ? (
                    <button
                      className="completed_btn"
                      onClick={() => completedTodo(todo._id)}
                    >
                      <IconButton edge="end" aris-label="complete">
                        <DoneOutlineIcon />
                      </IconButton>
                    </button>
                  ) : (
                    <span>Completed</span>
                  )}
                </ListItem>
              ))}
            </List>
          </div>
        ) : (
          <div>
            <h5>No Todo</h5>
          </div>
        )}
        <div>
          {/* <ul>ahjdshj</ul> */}
          {/* <ul>
         {todos.map(todo=>(
           <Todo text={todo}/>
         ))}
       </ul> */}
        </div>
      </div>
    </div>
  );
}

export default App;
