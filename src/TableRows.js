
export function TableRows(props) {
  return (
  <tr>
    <td>{ props.item.desc }</td>
    <td>
      <input type="checkbox" checked={ props.item.done } 
        onChange={ () => props.callback(props.item) }
      />
    </td>
  </tr>
  );
}
