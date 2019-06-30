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
    setTimeout(() => this.setState(st => ({ shouldShowSnack: !st.shouldShowSnack })), 3000);
  }

  render() {
    const { shouldShowSnack } = this.state;

    return (
      <div className="Drill">
        {shouldShowSnack ? (
          <Snack toggleSnack={this.toggleSnack} />
        ) : (
          <button
            type="button"
            onClick={() => this.setState({ shouldShowSnack: true })}
            className="btn draw-border"
          >
            Start TimeOut!
          </button>
        )}
      </div>
    );
  }
}
