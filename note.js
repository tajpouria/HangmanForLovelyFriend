// ## Context ReadingList

// 1. createContext & contextProvider
// ./context/ThemContext.jsx

import React, { Component, createContext } from 'react';

export const ThemeContext = createContext();

export default class ThemeContextProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLightTheme: false,
    };
  }

  render() {
    return (
      <ThemeContext.Provider value={{ ...this.state }}>{this.props.children}</ThemeContext.Provider>
    );
  }
}

// ./App.jsx

import ThemeContextProvider from './context/ThemeContext';

function App() {
  return (
    <ThemeContextProvider>
      <div />
    </ThemeContextProvider>
  );
}

// 2. contextType & context.Consumer

import { ThemContext } from './context/ThemeContext'

// contextType just in classBase components

export default class note extends Component {
  static contextType = ThemContext 
  render() { console.log(this.context) }
}

// context.Consumer in both classBase and functional components


export default function note() {
  return (
    <ThemContext.Consumer>
    {(context) => {
      console.log(context);
      return(<div/>)
    }
    }
    </ThemContext.Consumer>
    )
}

