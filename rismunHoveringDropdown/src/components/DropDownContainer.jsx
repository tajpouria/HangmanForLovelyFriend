/* eslint-disable import/no-cycle */
import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

import DropDown from './DropDown';

export const DropDownJoinContext = createContext();

class DropDownContainerProvider extends Component {
  static propTypes = {
    children: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      activatedDropDown: '',
    };

    this.setSelectedDropDownMenu = this.setSelectedDropDownMenu.bind(this);
  }

  setSelectedDropDownMenu(activatedDropDown) {
    this.setState(st => ({ activatedDropDown }));
  }

  render() {
    const { children } = this.props;
    const { setSelectedDropDownMenu } = this;
    const { activatedDropDown } = this.state;
    return (
      <DropDownJoinContext.Provider value={{ activatedDropDown, setSelectedDropDownMenu }}>
        {children}
      </DropDownJoinContext.Provider>
    );
  }
}

export default function DropDownContainer({ data }) {
  return (
    <DropDownContainerProvider>
      {data.map((menuItems) => {
        const keys = Object.keys(menuItems);
        return (
          <DropDown key={uuid()} menuItems={menuItems[keys[0]]}>
            {keys[0]}
          </DropDown>
        );
      })}
    </DropDownContainerProvider>
  );
}

DropDownContainer.propTypes = {
  data: PropTypes.array.isRequired,
};
