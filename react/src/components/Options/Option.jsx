import React, { Component } from 'react';

class Options extends Component{

  render(){

    const select = [
      {
        size: null,
        select: 'Pick a table'
      },
      {
        size: 6,
        value: 'a1',
        select: 'A1'
      },
      {
        size: 6,
        value: 'a2',
        select: 'A2'
      },
      {
        size: 6,
        value: 'a3',
        select: 'A3'
      },
      {
        size: 6,
        value: 'a4',
        select: 'A4'
      },
      {
        size: 6,
        value: 'a5',
        select: 'A5'
      },
      {
        size: 4,
        value: 'b1',
        select: 'B1'
      },
      {
        size: 4,
        value: 'b2',
        select: 'B2'
      },
      {
        size: 4,
        value: 'b3',
        select: 'B3'
      },
      {
        size: 4,
        value: 'b4',
        select: 'B4'
      },
      {
        size: 8,
        value: 'c1',
        select: 'C1'
      },
      {
        size: 8,
        value: 'c2',
        select: 'C2'
      },
      {
        size: 8,
        value: 'c3',
        select: 'C3'
      },
      {
        size: 2,
        value: 'd1',
        select: 'D1'
      },
      {
        size: 2,
        value: 'd2',
        select: 'D2'
      },
      {
        size: 2,
        value: 'd3',
        select: 'D3'
      }
    ]

    return (
      <select className={this.props.className} name={this.props.name} onChange={this.props.onChange}>
        { select.map((opt) =>{
            return <option value={opt.value} key={opt.select} className={`${opt.size === parseInt(this.props.guests, 10) ? '' : 'hide'}`} >
              {opt.select}
            </option>
          })
        }
      </select>
    );
  }
}

export default Options;
