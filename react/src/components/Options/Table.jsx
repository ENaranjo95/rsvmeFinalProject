import React, { Component } from 'react';

class Options extends Component{

  render(){

    const select = [
      {
        size: null,
        value: null,
        key: 'Pick a table'
      },
      {
        size: 6,
        value: 'a1',
        key: 'A1'
      },
      {
        size: 6,
        value: 'a2',
        key: 'A2'
      },
      {
        size: 6,
        value: 'a3',
        key: 'A3'
      },
      {
        size: 6,
        value: 'a4',
        key: 'A4'
      },
      {
        size: 6,
        value: 'a5',
        key: 'A5'
      },
      {
        size: 4,
        value: 'b1',
        key: 'B1'
      },
      {
        size: 4,
        value: 'b2',
        key: 'B2'
      },
      {
        size: 4,
        value: 'b3',
        key: 'B3'
      },
      {
        size: 4,
        value: 'b4',
        key: 'B4'
      },
      {
        size: 8,
        value: 'c1',
        key: 'C1'
      },
      {
        size: 8,
        value: 'c2',
        key: 'C2'
      },
      {
        size: 8,
        value: 'c3',
        key: 'C3'
      },
      {
        size: 2,
        value: 'd1',
        key: 'D1'
      },
      {
        size: 2,
        value: 'd2',
        key: 'D2'
      },
      {
        size: 2,
        value: 'd3',
        key: 'D3'
      }
    ]

    return (
      <select className={this.props.className} name={this.props.name} onChange={this.props.onChange} value={this.props.value}>
        { select.map((opt) =>{
            return <option value={opt.value} key={opt.key} className={`${opt.size === parseInt(this.props.guests, 10) ? '' : 'hide'}`} >
              {opt.key}
            </option>
          })
        }
      </select>
    );
  }
}

export default Options;
