import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export default class AuthContextProvider extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
    };

    this.toggleLogin = this.toggleLogin.bind(this);
  }

  toggleLogin() {
    this.setState(st => ({ isLoggedIn: !st.isLoggedIn }));
  }

  render() {
    const { children } = this.props;
    return (
      <AuthContext.Provider value={{ ...this.state, toggleLogin: this.toggleLogin }}>
        {children}
      </AuthContext.Provider>
    );
  }
}

AuthContextProvider.propTypes = {
  children: PropTypes.object.isRequired,
};
