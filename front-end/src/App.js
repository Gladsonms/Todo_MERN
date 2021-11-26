import {useState} from "react"
import './App.css';

//import {Button }from '@mui/material-ui/core';
import {Button,FormControl,InputLabel,TextField,Input} from '@mui/material';
import Todo from "./Todo";


function App() {
  
  const [todos,setTodos]=useState(['study reacct','study ds'])//state for todo text
  const [input,setInput]=useState([])//for input
  
  const addTodo = (event)=>{
    //restrict refresh
    
    event.preventDefault();
    //will fire when new todo is added
     setTodos([...todos,input])
     setInput('')
  }

  return (
    <div className="App">
     <h1>Todo</h1>
     <div>
    <form>
     <FormControl>
       <InputLabel >
      ✔️ Write a Todo
       </InputLabel>
       <Input  value={input} onChange={event => setInput(event.target.value)}/>
     </FormControl>
    {/* <TextField id="standard-basic" label="Standard" variant="standard" type="text" value={input} onChange={event => setInput(event.target.value)} />  */}
     <Button disabled={!input}  type="submit" onClick={addTodo} variant="contained" color="success">
     Add Todo
</Button>
    </form>
     <div>
       <ul>
         {todos.map(todo=>(
           <Todo text={todo}/>
         ))}
       </ul>
     </div>
     </div>
    </div>
  );
}

export default App;
