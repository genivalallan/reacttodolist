import React, { Component } from "react";
import { TableRows } from "./TableRows";

export class ItemsTable extends Component {
  render = () =>
    <table className="table table-striped table-bordered">
      { this.props.caption &&
      <caption className="bg-primary text-white text-center" style={{captionSide: "top"}}>
        { this.props.caption }
      </caption>
      }
      <thead>
        <tr>
          <th>Item</th>
          <th>Finalizada</th>
        </tr>
      </thead>
      <tbody>
        { this.props.items.map(item =>
            <TableRows key={ item.desc } item={ item } callback={ this.props.toggleTodo } />)
        }
      </tbody>
    </table>
}