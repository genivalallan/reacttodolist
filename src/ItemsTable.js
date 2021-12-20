import { TableRows } from "./TableRows";

export function ItemsTable(props) {
  return (
    <table className="table table-striped table-bordered">
      { props.caption &&
      <caption className="bg-primary text-white text-center" style={{captionSide: "top"}}>
        { props.caption }
      </caption>
      }
      <thead>
        <tr>
          <th>Item</th>
          <th>Finalizada</th>
        </tr>
      </thead>
      <tbody>
        { props.items.map(item =>
            <TableRows key={ item.desc } item={ item } callback={ props.toggleTodo } />)
        }
      </tbody>
    </table>
  );
}