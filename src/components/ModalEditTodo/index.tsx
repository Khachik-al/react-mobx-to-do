import React, { useState } from "react";
import { ModalContent } from "./styles";
import { useStores } from "../../use-stores";
import { Button, Modal, TextField } from "@mui/material";
import { ITodo } from "../../stores/TodoStore";

interface IProps {
  isOpen: boolean;
  closeModal: () => void;
  todo: ITodo;
}

const ModalNewTodo = ({ isOpen, closeModal, todo }: IProps) => {
  const { todoStore } = useStores();
  const [text, setText] = useState(todo.text);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTodo = {
      ...todo,
      text
    };
    todoStore.updateTodo(newTodo);
    closeModal();
  };

  return (
    <Modal aria-labelledby="modal-edit-todo" open={isOpen} onClose={closeModal}>
      <ModalContent>
        <h2 id="modal-edit-todo">Edit Todo</h2>
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            id="standard-basic"
            variant="standard"
            autoFocus
            label="Todo"
            fullWidth
            value={text}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e)
            }
          />
          <Button
            disabled={text.length === 0}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: "1rem" }}
          >
            Submit
          </Button>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ModalNewTodo;
