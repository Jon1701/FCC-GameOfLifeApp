// React.
import React from 'react';
import ReactDOM from 'react-dom';
import Cell from './Cell.jsx';

class Row extends React.Component {

  // Component Constructor.
  constructor() {
    super();
  }

  // Component Render.
  render() {

    // Array to store <Cell/> components.
    var cells = [];

    // Given a slice of the Board state grid,
    // create a <Cell/> component for each item in that slice.
    for(var i=0; i<this.props.rowData.length; i++) {

      // Cell index in relation to the Board.state.grid.
      var index = this.props.row*this.props.rowData.length + i;

      // Store <Cell/> components.
      cells.push(
        <Cell
          key={i} // Component key.
          index={index} // Index of this cell in relation to the contiguous array in Board.state.
          contents={this.props.rowData[i]}  // Cell contents.
          update={this.props.update}  // Callback passed down to allow state chances from <Cell/>
        />
      )
    }

    return (
      <div className="row">
        {cells}
      </div>
    )

  }

}

export default Row;
