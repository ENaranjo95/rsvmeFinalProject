import React, { Component } from 'react';
import './Tables.css';

class TablesA extends Component {

  onClick = (table) => {
    this.props.form(table)
  }

  render(){

    const tables = [
      {
        size: 6,
        name: 'table',
        id: 'A1'
      },
      {
        size: 6,
        name: 'table',
        id: 'A2'
      },
      {
        size: 6,
        name: 'table',
        id: 'A3'
      },
      {
        size: 6,
        name: 'table',
        id: 'A4'
      },
      {
        size: 6,
        name: 'table',
        id: 'A5'
      },
      {
        size: 6,
        name: 'table',
        id: 'A6'
      }
    ]

    return (
      <div>
        <section className="booth">
          {tables.map((table) => (
            <div onClick={ () => { this.onClick(table) } }
              key={table.id} className={table.name}>
              {table.id}
            </div>
          ))}
        </section>
      </div>
    )
  }
}

export default TablesA;
