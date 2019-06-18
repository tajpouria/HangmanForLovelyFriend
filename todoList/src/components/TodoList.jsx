import React, { Component } from 'react';

import Todo from './Todo';

export default class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { todoList } = this.props;
    return (
      <div>
        <h1>Simple react TodoList</h1>
        {todoList.map(({ logic }) => (
          <Todo>{logic}</Todo>
        ))}
      </div>
    );
  }
}
