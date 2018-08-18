import React, { Component } from 'react';
import './Tables.css';

class TablesD extends Component {

  render(){

    const tables = [
      {
        size: 2,
        name: 'extraTable',
        id: 'd1'
      },
      {
        size: 2,
        name: 'extraTable',
        id: 'd2'
      },
      {
        size: 2,
        name: 'extraTable',
        id: 'd3'
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

export default TablesD
