import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import TodoItem from "../TodoItem";
import { StyledTodoList, StyledHeader, Container } from "./styles";
import ModalNewTodo from "../ModalNewTodo";
import { useStores } from "../../use-stores";
import { ITodo } from "../../stores/TodoStore";
import { Button, Stack, Switch, TextField } from "@mui/material";

const TodoList = observer(() => {
  const [modalNewTodoIsOpen, setModalNewTodo] = useState(false);
  const [search, setSearch] = useState('');
  const [onlyFinished, setonlyFinished] = useState(false);
  const [todoList, setTodoList] = useState<ITodo[]>([]);
  const { todoStore } = useStores();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const filteredTodos = [...todoStore.todos].filter(
      todo => todo.text.toLowerCase().includes(value.toLowerCase())
    )
    setTodoList(filteredTodos)
    setSearch(value)
  }
  const handleFilter = () => {
    const filteredTodos = [...todoStore.todos].filter(
      todo => !onlyFinished ? todo.completed : true
    )
    setTodoList(filteredTodos)
    setonlyFinished(!onlyFinished)
  }
  useEffect(() => {
    setTodoList(todoStore.todos)
  }, [todoStore.todos])
  return (
    <>
      {modalNewTodoIsOpen && (
        <ModalNewTodo
          isOpen={modalNewTodoIsOpen}
          closeModal={() => setModalNewTodo(false)}
        />
      )}
      <Container>
        <StyledHeader>
          <TextField
            label="Search"
            variant="standard"
            onChange={handleSearch}
            value={search}
          />
          <Button
            color="primary"
            variant="contained"
            onClick={() => setModalNewTodo(true)}
          >
            Add new
          </Button>
        </StyledHeader>
        <StyledHeader>
          <h3>completed {todoStore.todoProgress}</h3>
          <span style={{ fontSize: '18px' }}>
            all
            <Switch
              checked={onlyFinished}
              onChange={handleFilter}
            />
            done
          </span>
        </StyledHeader>
        <Stack direction='row' spacing={2} justifyContent='end'>
           <Button
          color="secondary"
          variant="contained"
          onClick={todoStore.batchDelete}
        >
         delete
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={todoStore.batchDone}
        >
          done
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={todoStore.batchUndone}
        >
          undone
        </Button>
        </Stack>
       
        <StyledTodoList>
          {todoList.length === 0 && <p>Nothing to do!</p>}
          {todoList.map(todo => {
            return <TodoItem key={todo.id} todo={todo} />;
          })}
        </StyledTodoList>
      </Container>
    </>
  );
});

export default TodoList;
