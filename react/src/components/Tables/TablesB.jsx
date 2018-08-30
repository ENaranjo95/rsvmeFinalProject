import React, { Component } from 'react';
import './Tables.css';

class TablesB extends Component {

  onClick = (table) => {
    this.props.rsvp(table)
  }

  render(){

    const tables = [
      {
        size: 2,
        name: 'extraTables',
        id: 'B1'
      },
      {
        size: 2,
        name: 'extraTables',
        id: 'B2'
      },
      {
        size: 2,
        name: 'extraTables',
        id: 'B3'
      },
      {
        size: 2,
        name: 'extraTables',
        id: 'B4'
      },
      {
        size: 2,
        name: 'extraTables',
        id: 'B5'
      },
      {
        size: 2,
        name: 'extraTables',
        id: 'B6'
      }
    ]

    return (
      <section className="extra">
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

export default TablesB;
