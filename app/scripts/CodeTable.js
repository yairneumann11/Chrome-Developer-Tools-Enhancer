
import React from "react";


class CodeTable extends React.Component {
  render() {
    return (
      <table >

        <thead>
        <tr>
          <th>Firstname</th>
          <th>Lastname</th>
          <th>Age</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>Jill</td>
          <td>Smith</td>
          <td>50</td>
        </tr>
        <tr>
          <td>Eve</td>
          <td>Jackson</td>
          <td>94</td>
        </tr>
        </tbody>

      </table>
    );
  }
}

export default CodeTable;
