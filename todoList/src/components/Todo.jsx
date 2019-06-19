import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Todo extends Component {
  static propTypes = {
    children: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    removeTodo: PropTypes.func.isRequired,
    editTodo: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      logic: '',
      completed: false,
    };
    this.handleChanging = this.handleChanging.bind(this);
    this.handleEditTodo = this.handleEditTodo.bind(this);
    this.handleUndo = this.handleUndo.bind(this);
    this.handleRemoveTodo = this.handleRemoveTodo.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
  }

  handleChanging(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleEditTodo(evt) {
    evt.preventDefault();

    const { id, editTodo } = this.props;
    const { logic } = this.state;

    editTodo({ id, logic });
    this.setState({ logic: '', isEditing: false });
  }

  handleUndo() {
    this.setState(st => ({ isEditing: !st.isEditing, logic: '' }));
  }

  handleRemoveTodo() {
    const { removeTodo, id } = this.props;

    removeTodo(id);
  }

  handleComplete() {
    this.setState(st => ({ completed: !st.completed }));
  }

  render() {
    const { children } = this.props;
    const { isEditing, logic, completed } = this.state;
    return isEditing ? (
      <form className="NewTodoForm">
        <input
          className="NewTodoForm-input"
          name="logic"
          type="text"
          value={logic}
          onChange={this.handleChanging}
        />
        <button onClick={this.handleEditTodo} type="submit">
          <i className="Todo-icon fas fa-check-circle" />
        </button>
        <button onClick={this.handleUndo} type="submit">
          <i className="Todo-icon fas fa-undo" />
        </button>
      </form>
    ) : (
      <div className="Todo">
        <div
          onClick={this.handleComplete}
          className={completed ? 'Todo-logic-completed' : 'Todo-logic'}
        >
          {children}
        </div>
        <div>
          <button onClick={this.handleUndo} type="button">
            <i className="Todo-icon far fa-edit" />
          </button>
          <button onClick={this.handleRemoveTodo} type="button">
            <i className="Todo-icon far fa-trash-alt" />
          </button>
        </div>
      </div>
    );
  }
}
