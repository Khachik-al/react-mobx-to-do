import React, { useState } from "react";
import { Done, StyledTodoItem } from "./styles";
import { ITodo } from "../../stores/TodoStore";
import { useStores } from "../../use-stores";
import { observer } from "mobx-react-lite";
import FlexContainer from "../FlexContainer";
import { Button, Checkbox, IconButton, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalEditTodo from '../ModalEditTodo'

interface IProps {
  todo: ITodo;
}

const TodoItem = observer(({ todo }: IProps) => {
  const [modalEditTodoIsOpen, setModalEditTodo] = useState(false);
  const { todoStore } = useStores();

  return (
    <StyledTodoItem>
      {modalEditTodoIsOpen && (
        <ModalEditTodo
          isOpen={modalEditTodoIsOpen}
          closeModal={() => setModalEditTodo(false)}
          todo={todo}
        />
      )}
      <FlexContainer>
        <Checkbox
          checked={todo.completed}
          onChange={() => todoStore.toggleCompleted(todo.id)}
        />
        <div onClick={() => setModalEditTodo(true)}>{todo.text}</div>
      </FlexContainer>
      <div>
        <Button
          color={todoStore.checkedTodos.includes(todo.id) ? 'primary' : 'inherit'}
          variant="contained"
          onClick={() => todoStore.checkTodo(todo.id)}
          size='small'
        >
          select
        </Button>
        <IconButton onClick={() => setModalEditTodo(true)}>
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
