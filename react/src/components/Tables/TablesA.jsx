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
        <section className="booth">
          <section className="seat"></section>
          {tables.map((table) => (
            <div onClick={ ()=>{
                this.props.onClick(table.id)
              }} key={table.id} className={`${table.name} ${parseInt(this.props.guests, 10) === table.size  ? 'active' : ''}`}>
              {table.id}
            </div>
          ))}
        </section>
      </div>
    )
  }
}

export default TablesA
