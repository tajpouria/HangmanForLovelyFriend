import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTodoForm extends Component {
  static propTypes = {
    addTodo: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      logic: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleSubmit(evt) {
    evt.preventDefault();

    const { addTodo } = this.props;
    const { logic } = this.state;

    addTodo(logic);

    this.setState({ logic: '' });
  }

  render() {
    const { logic } = this.state;
    return (
      <div className="NewTodoForm">
        <form className="NewTodoForm-form" onSubmit={this.handleSubmit}>
          <label htmlFor="logic">
            <input
              className="NewTodoFrom-input"
              name="logic"
              value={logic}
              onChange={this.handleChange}
              type="text"
            />
          </label>
          <button type="submit">
            <i className="fas fa-plus-square Todo-icon" />
          </button>
        </form>
      </div>
    );
  }
}
