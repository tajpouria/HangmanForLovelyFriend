import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import orderBy from 'lodash/orderBy';

import './App.css';
import Table from './components/Table';

const invertDirection = {
  asc: 'desc',
  desc: 'asc',
};

class App extends Component {
  state = {
    data: [
      {
        firstName: 'Tann',
        lastName: 'Gounin',
        username: 'tgounin0',
        email: 'tgounin0@wordpress.com',
        passsword: '1',
      },
      {
        firstName: 'Elana',
        lastName: 'Ricioppo',
        username: 'ericioppo1',
        email: 'ericioppo1@timesonline.co.uk',
        passsword: '2',
      },
      {
        firstName: 'Bentlee',
        lastName: 'Decourt',
        username: 'bdecourt2',
        email: 'bdecourt2@about.me',
        passsword: '3',
      },
      {
        firstName: 'Hyacintha',
        lastName: 'Choudhury',
        username: 'hchoudhury3',
        email: 'hchoudhury3@va.gov',
        passsword: '4',
      },
      {
        firstName: 'Ari',
        lastName: 'Spedroni',
        username: 'aspedroni4',
        email: 'aspedroni4@sun.com',
        passsword: '5',
      },
      {
        firstName: 'Abelard',
        lastName: 'Rodriguez',
        username: 'arodriguez5',
        email: 'arodriguez5@shutterfly.com',
        passsword: '6',
      },
      {
        firstName: 'Abelard',
        lastName: 'Rodriguez',
        username: 'arodriguez5',
        email: 'frodriguez5@shutterfly.com',
        passsword: '7',
      },
      {
        firstName: 'Ikey',
        lastName: 'Latek',
        username: 'ilatek6',
        email: 'ilatek6@berkeley.edu',
        passsword: '8',
      },
      {
        firstName: 'Justis',
        lastName: 'Habbeshaw',
        username: 'jhabbeshaw7',
        email: 'jhabbeshaw7@simplemachines.org',
        passsword: '9',
      },
      {
        firstName: 'Justis',
        lastName: 'Habbeshaw',
        username: 'phabbeshaw7',
        email: 'jhabbeshaw7@simplemachines.org',
        passsword: '10',
      },
      {
        firstName: 'Maddie',
        lastName: 'Bayne',
        username: 'mbayne8',
        email: 'abayne8@constantcontact.com',
        passsword: '11',
      },
      {
        firstName: 'Maddie',
        lastName: 'Bayne',
        username: 'mbayne8',
        email: 'bbayne8@constantcontact.com',
        passsword: '12',
      },
      {
        firstName: 'Maddie',
        lastName: 'Bayne',
        username: 'mbayne8',
        email: 'cbayne8@constantcontact.com',
        passsword: '13',
      },
      {
        firstName: 'Gerrie',
        lastName: 'Rulton',
        username: 'grulton9',
        email: 'grulton9@reverbnation.com',
        passsword: '14',
      },
    ],
    editIdx: -1,
    columnToSort: [],
    sortDirection: [],
  };

  handleRemove = (i) => {
    this.setState(state => ({
      data: state.data.filter((row, j) => j !== i),
    }));
  };

  startEditing = (i) => {
    this.setState({ editIdx: i });
  };

  stopEditing = () => {
    this.setState({ editIdx: -1 });
  };

  handleChange = (e, name, i) => {
    const { value } = e.target;
    this.setState(state => ({
      data: state.data.map((row, j) => (j === i ? { ...row, [name]: value } : row)),
    }));
  };

  handleSort = (columnName) => {
    const indxOfColumnToSort = this.state.columnToSort.indexOf(columnName);

    const _indexForSort = indxOfColumnToSort;

    this.setState((state) => {
      let newSortDirection = state.sortDirection;

      _indexForSort !== -1
        ? (newSortDirection[_indexForSort] = invertDirection[state.sortDirection[_indexForSort]])
        : (newSortDirection = [...state.sortDirection, 'asc']);

      return {
        columnToSort: [...new Set([...state.columnToSort, columnName])],
        sortDirection: newSortDirection,
      };
    });
  };

  render() {
    console.log(this.state.columnToSort, this.state.sortDirection);
    return (
      <MuiThemeProvider>
        <div className="App">
          <Table
            handleSort={this.handleSort}
            handleRemove={this.handleRemove}
            startEditing={this.startEditing}
            editIdx={this.state.editIdx}
            stopEditing={this.stopEditing}
            handleChange={this.handleChange}
            columnToSort={this.state.columnToSort}
            sortDirection={this.state.sortDirection}
            data={orderBy(this.state.data, this.state.columnToSort, this.state.sortDirection)}
            header={[
              {
                name: 'First name',
                prop: 'firstName',
              },
              {
                name: 'Last name',
                prop: 'lastName',
              },
              {
                name: 'Username',
                prop: 'username',
              },
              {
                name: 'Email',
                prop: 'email',
              },
            ]}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
