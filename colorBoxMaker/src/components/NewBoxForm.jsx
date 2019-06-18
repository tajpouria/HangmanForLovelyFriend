import React, { Component } from 'react';
import uuid from 'uuid/v4';

import BoxList from './BoxList';

export default class NewBoxForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: '',
      width: '',
      backgroundColor: '',
      boxes: [],
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.removeBox = this.removeBox.bind(this);
  }

  handleFormChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleFormSubmit(evt) {
    evt.preventDefault();

    const { height, width, backgroundColor } = this.state;
    this.setState(st => ({
      boxes: [
        ...st.boxes,
        {
          height,
          width,
          backgroundColor,
          id: uuid(),
        },
      ],
    }));
    this.setState({ height: '', width: '', backgroundColor: '' });
  }

  removeBox(id) {
    const { boxes } = this.state;

    const newBoxes = boxes.filter(box => box.id !== id);

    this.setState({ boxes: newBoxes });
  }

  render() {
    const {
      height, width, backgroundColor, boxes,
    } = this.state;

    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <h1>Color Box Maker Thingy</h1>
          <div>
            <label htmlFor="height">
              Height
              <input onChange={this.handleFormChange} value={height} name="height" type="text" />
            </label>
          </div>
          <div>
            <label htmlFor="width">
              Width
              <input onChange={this.handleFormChange} value={width} name="width" type="text" />
            </label>
          </div>
          <div>
            <label htmlFor="color">
              backgroundColor
              <input
                onChange={this.handleFormChange}
                value={backgroundColor}
                name="backgroundColor"
                type="text"
              />
            </label>
          </div>
          <button type="submit">Submit</button>
        </form>
        <BoxList removeBox={this.removeBox} boxes={boxes} />
      </div>
    );
  }
}
