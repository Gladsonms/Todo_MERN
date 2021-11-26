import { List,ListItem, ListItemText } from "@mui/material";
import "./Todo.css"
const Todo =(props)=>{
    return (
        <div>

               <List className="todo_list">
                   <ListItem>
                       <ListItemText primary={props.text} secondary="Dummy Deadline ⏰⏰🔔🔔"/>
                   </ListItem>
               </List>
        </div>
    )
}
export default Todo;