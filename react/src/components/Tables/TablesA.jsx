import React, { Component } from 'react';
import './Tables.css';

class TablesA extends Component {

  state = {
    reserved: this.props.reserved
  }

  render(){

    const tables = [
      {
        size: 6,
        name: 'table',
        id: 'a1'
      },
      {
        size: 6,
        name: 'table',
        id: 'a2'
      },
      {
        size: 6,
        name: 'table',
        id: 'a3'
      },
      {
        size: 6,
        name: 'table',
        id: 'a4'
      },
      {
        size: 6,
        name: 'table',
        id: 'a5'
      }
    ]

    return (
      <div>
        {tables.map((table) => (
          <div onClick={this.props.click} key={table.id} className={`${table.name} ${parseInt(this.props.guests, 10) === this.props.size  ? 'active' : ''}`}>
            {table.id}
          </div>
        ))}
      </div>
    )
  }
}

export default TablesA
