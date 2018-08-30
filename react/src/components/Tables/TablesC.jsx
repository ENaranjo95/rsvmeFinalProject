import React, { Component } from 'react';
import './Tables.css';

class TablesC extends Component {

  onClick = (table) => {
    this.props.rsvp(table)
  }

  render(){

    const tables = [
      {
        size: 4,
        name: 'highTable',
        id: 'C1'
      },
      {
        size: 4,
        name: 'highTable',
        id: 'C2'
      },
      {
        size: 4,
        name: 'highTable',
        id: 'C3'
      },
    ]

    return (
      <section className="high">
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

export default TablesC;
