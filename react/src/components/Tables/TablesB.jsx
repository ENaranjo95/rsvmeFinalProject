import React, { Component } from 'react';
import './Tables.css';

class TablesB extends Component {

  render(){

    const tables = [
      {
        size: 4,
        name: 'highTable',
        id: 'b1'
      },
      {
        size: 4,
        name: 'highTable',
        id: 'b2'
      },
      {
        size: 4,
        name: 'highTable',
        id: 'b3'
      },
      {
        size: 4,
        name: 'highTable',
        id: 'b4'
      }
    ]

    return (
      <div>
        {tables.map((table) => (
          <div key={table.id} onClick={this.props.onClick} className={`${table.name} ${parseInt(this.props.guests, 10) === table.size  ? 'active' : ''}`}>
            {table.id}
          </div>
        ))}
      </div>
    )
  }
}

export default TablesB
