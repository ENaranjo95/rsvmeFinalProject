import React, { Component } from 'react';
import './Tables.css';

class TablesD extends Component {

  onClick = (table) => {
    this.props.rsvp(table)
  }

  render(){

    const tables = [
      {
        size: 8,
        name: 'roundTable',
        id: 'D1'
      },
      {
        size: 8,
        name: 'roundTable',
        id: 'D2'
      },
      {
        size: 8,
        name: 'roundTable',
        id: 'D3'
      }
    ]

    return (
      <section className="round">
        {tables.map((table) => (
          <div onClick={ () => { this.onClick(table) } }
            key={table.id} className={table.name}>
            {table.id}
          </div>
        ))}
      </section>
    )
  }
}

export default TablesD;
