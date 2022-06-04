import { decorate, observable, computed } from "mobx";
import { toast } from "react-toastify";

export interface ITodo {
  id: number;
  text: string;
  completed: boolean;
}

export class TodoStore {
  public todos: ITodo[] = [
    { id: 1, text: "todo 1", completed: true },
    { id: 2, text: "todo 2", completed: false },
    { id: 3, text: "todo 3", completed: false }
  ];
  public checkedTodos: number[] = [];
  public checkTodo = (id: number) => {
    if (this.checkedTodos.includes(id)) {
      this.checkedTodos.splice(this.checkedTodos.indexOf(id), 1)
    } else {
      this.checkedTodos.push(id);
    }
  };
  public addTodo = (todo: ITodo) => {
    this.todos.push(todo);
    toast.success("New Todo added", {
      position: toast.POSITION.BOTTOM_CENTER
    });
  };
  public toggleCompleted = (id: number) => {
    const updatedTodos = this.todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    this.todos = updatedTodos;
  };
  public updateTodo = (updatedTodo: ITodo) => {
    const updatedTodos = this.todos.map(todo => {
      if (todo.id === updatedTodo.id) {
        return { ...updatedTodo };
      }
      return todo;
    });
    this.todos = updatedTodos;
  };
  public deleteTodo = (id: number) => {
    const updatedTodos = this.todos.filter(todo => todo.id !== id);
    this.todos = updatedTodos;
    toast.info("Todo deleted", {
      position: toast.POSITION.BOTTOM_CENTER
    });
  };
  public batchDelete = () => {
    if (!!this.checkedTodos.length) {
      this.todos.forEach((todo) => {
        if (this.checkedTodos.includes(todo.id)) {
          this.deleteTodo(todo.id)
        }
      })
      this.checkedTodos = []
    }
  };
  public batchDone = () => {
    if (!!this.checkedTodos.length) {
      this.todos.forEach((todo) => {
        if (this.checkedTodos.includes(todo.id)) {
          todo.completed = true
        }
      })
      this.checkedTodos = []
    }
  };
  public batchUndone = () => {
    if (!!this.checkedTodos.length) {
      this.todos.forEach((todo) => {
        if (this.checkedTodos.includes(todo.id)) {
          todo.completed = false
        }
      })
      this.checkedTodos = []
    }
  };
  get todoProgress() {
    const completedCount = this.todos.filter(t => t.completed).length;
    const totalCount = this.todos.length;
    return `${completedCount} / ${totalCount}`;
  }
}

decorate(TodoStore, {
  todos: observable,
  checkedTodos: observable,
  todoProgress: computed,
});
