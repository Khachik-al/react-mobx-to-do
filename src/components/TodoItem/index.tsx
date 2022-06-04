import React, { useState } from "react";
import { Done, StyledTodoItem } from "./styles";
import { ITodo } from "../../stores/TodoStore";
import { useStores } from "../../use-stores";
import { observer } from "mobx-react-lite";
import FlexContainer from "../FlexContainer";
import { Button, Checkbox, IconButton, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface IProps {
  todo: ITodo;
}

const TodoItem = observer(({ todo }: IProps) => {
  const [editMode, setEditMode] = useState(false);
  const [formValue, setFormvalue] = useState(todo.text);
  const { todoStore } = useStores();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTodo = {
      ...todo,
      text: formValue
    };
    todoStore.updateTodo(newTodo);
    setEditMode(false);
  };
  console.log({} === {});

  return (
    <StyledTodoItem>
      <FlexContainer>
        <Checkbox
          checked={todo.completed}
          onChange={() => todoStore.toggleCompleted(todo.id)}
        />
        {!editMode && <div onClick={() => setEditMode(true)}>{todo.text}</div>}
        {editMode && (
          <form action="" onSubmit={handleSubmit}>
            <TextField
              variant="standard"
              style={{ marginRight: 10 }}
              value={formValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormvalue(e.target.value)
              }
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ marginRight: 10 }}
            >
              Save
            </Button>
            <Button type="button" onClick={() => setEditMode(false)}>
              cancel
            </Button>
          </form>
        )}
      </FlexContainer>
      <div>
        <Button
          color={todoStore.checkedTodos.includes(todo.id) ? 'primary' : 'inherit'}
          variant="contained"
          // checked={todoStore.checkedTodos.includes(todo.id)}
          onClick={() => todoStore.checkTodo(todo.id)}
          size='small'
        >
          select
        </Button>
        <IconButton onClick={() => setEditMode(!editMode)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => todoStore.deleteTodo(todo.id)}>
          <DeleteIcon />
        </IconButton>
      </div>
    </StyledTodoItem>
  );
});

export default TodoItem;
