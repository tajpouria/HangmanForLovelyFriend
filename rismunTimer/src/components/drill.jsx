import React, { Component } from 'react';

import Snack from './Snack';

export default class drill extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldShowSnack: false,
    };
    this.toggleSnack = this.toggleSnack.bind(this);
  }

  toggleSnack() {
  }

  render() {
    const { shouldShowSnack } = this.state;

    return (
      <div>
        {shouldShowSnack ? (
          <Snack toggleSnack={this.toggleSnack} />
        ) : (
          <button type="button" onClick={() => this.toggleSnack()} className="btn-warning">
            Start TimeOut!
          </button>
        )}
      </div>
    );
  }
}
