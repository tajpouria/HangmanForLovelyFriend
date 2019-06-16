import React, { Component } from 'react';

export default class Box extends Component {
  constructor(props) {
    super(props);
    const { colors } = this.props;
    this.state = {
      backgroundColor: colors[Math.floor(Math.random() * colors.length)],
    };
    this.boxClicked = this.boxClicked.bind(this);
  }

  boxClicked() {
    const { colors } = this.props;
    let newColor;
    do {
      newColor = colors[Math.floor(Math.random() * colors.length)];
    } while (newColor === this.state.backgroundColor);

    this.setState({ backgroundColor: newColor });
  }

  render() {
    const { backgroundColor } = this.state;
    return (
      <div
        onClick={this.boxClicked}
        style={{
          height: 200,
          width: 200,
          backgroundColor,
        }}
      />
    );
  }
}
