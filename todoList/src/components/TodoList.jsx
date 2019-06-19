import React, { Component } from 'react';
import uuid from 'uuid/v4';

import Todo from './Todo';
import NewTodoForm from './NewTodoForm';

export default class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
    };

    this.addTodo = this.addTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
  }

  addTodo(logic) {
    this.setState(st => ({ todos: [...st.todos, { id: uuid(), logic }] }));
  }

  editTodo({ id, logic }) {
    const { todos } = this.state;
    const newTodos = [];
    todos.map((todo) => {
      if (todo.id === id) {
        const newTodo = { id: todo.id, logic };
        newTodos.push(newTodo);
      } else newTodos.push(todo);
    });

    this.setState({ todos: newTodos });
  }

  removeTodo(id) {
    const { todos } = this.state;
    const newTodos = todos.filter(todo => todo.id !== id);

    this.setState({ todos: newTodos });
  }

  render() {
    const { todos } = this.state;
    return (
      <div className="TodoList">
        <h1 className="TodoList-header">
          <spn>Simple React TodoList</spn>
        </h1>
        <div className="TodoList-wrapList">
          {todos.map(({ id, logic }) => (
            <Todo id={id} key={id} editTodo={this.editTodo} removeTodo={this.removeTodo}>
              {logic}
            </Todo>
          ))}
        </div>
        <NewTodoForm addTodo={this.addTodo} />
      </div>
    );
  }
}
