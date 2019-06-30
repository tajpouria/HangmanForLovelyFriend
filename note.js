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
      return <div/>;
    }
    }
    </ThemContext.Consumer>
    )
  
    // using multiply context

//       <AuthContext.Consumer>
//       {(authContext) => {
//         const { isLoggedIn, toggleLogin } = authContext;

//         return (
//           <ThemeContext.Consumer>
//             {(themeContext) => {
//               const { isLightTheme, light, dark } = themeContext;
//               const { syntax, ui } = isLightTheme ? light : dark;

//               return (
//                 <div style={{ color: syntax, backgroundColor: ui }} className="nav-link active">
//                   <h1>Context Reading List</h1>
//                   <button onClick={toggleLogin} className="btn-link nav-link" type="button">
//                     {isLoggedIn ? 'Logout' : 'Login'}
//                   </button>
//                 </div>
//               );
//             }}
//           </ThemeContext.Consumer>
//         );
//       }}
//     </AuthContext.Consumer>
// }

//3. useContext hooks
import React, { useContext } from 'react'

import ThemeContext from './ThemeContext'

const {toggleTheme} = useContext(ThemContext)


// ## Modern React Course

'!'.repeat(4)

// defaultProps
export default class note extends Component {

  static defaultProps = {
    from : 'Anonymous'
  }

  render() {
    return (
      <div>
        {this.props.from}
      </div>
    )
  }
}

