import React, { Component } from 'react';
import './Tables.css';

class TablesC extends Component {

  render(){

    const tables = [
      {
        size: 8,
        name: 'roundTable',
        id: 'c1'
      },
      {
        size: 8,
        name: 'roundTable',
        id: 'c2'
      },
      {
        size: 8,
        name: 'roundTable',
        id: 'c3'
      },
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

export default TablesC
