import React, { Component } from 'react';

import TodoList from './TodoList';

export default class NewTodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logic: '',
      todoList: [{ logic: 'feed fucking cat' }, { logic: 'bath my dog ass' }],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleSubmit(evt) {
    evt.preventDefault();

    const { logic } = this.state;
    this.setState(st => ({ todoList: [...st.todoList, { logic }] }));

    this.setState({ logic: '' });
  }

  render() {
    const { logic, todoList } = this.state;
    return (
      <div>
        <TodoList todoList={todoList} />
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="logic">
            <input name="logic" value={logic} onChange={this.handleChange} type="text" />
          </label>
          <button type="submit">Add ToDo</button>
        </form>
      </div>
    );
  }
}
