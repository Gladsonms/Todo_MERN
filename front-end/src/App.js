import { useState, useEffect } from "react";
import "./App.css";

//import {Button }from '@mui/material-ui/core';
import {
  Button,
  FormControl,
  InputLabel,
  TextField,
  Input,
} from "@mui/material";
import Todo from "./Todo";
import { readTodos, createTodos } from "./function/index";
import Preloader from "./components/Preloader";

function App() {
  const [todo, setTodo] = useState({ title: "" }); //state for todo text
  const [input, setInput] = useState([]); //for input
  const [todos, setTodos] = useState(null);

  // const addTodo = (event)=>{
  //   //restrict refresh

  //   event.preventDefault();
  //   //will fire when new todo is added
  //    setTodos([...todos,input])
  //    setInput('')
  // }

  useEffect(() => {
    const fetchData = async () => {
      const result = await readTodos();
      console.log("rse", result.data);
      setTodos(result.data);
    };
    fetchData();
  }, []);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const result = await createTodos(todo);
  };

  return (
    <div className="App">
      <h1>Todo</h1>
      <div>
        <form onSubmit={onSubmitHandler}>
          <FormControl>
            <InputLabel>✔️ Write a Todo</InputLabel>
            <Input
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
          <div>
            {todos.map((todo) => (
              <ul>{todo.title}</ul>
            ))}
          </div>
        ) : (
          <div>
            <h5>No Todo</h5>
          </div>
        )}
        <div>
          <ul>ahjdshj</ul>
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
