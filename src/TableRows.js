import React, { Component } from "react";

export class TableRows extends Component {
  render = () =>
    <tr>
      <td>{ this.props.item.desc }</td>
      <td>
        <input type="checkbox" checked={ this.props.item.done } 
          onChange={ () => this.props.callback(this.props.item) }
        />
      </td>
    </tr>
}