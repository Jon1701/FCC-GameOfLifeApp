// React.
import React from 'react';
import ReactDOM from 'react-dom';
import Row from './Row.jsx';

class Board extends React.Component {

  // Component Constructor.
  constructor() {
    super();

    // Set grid dimensions.
    var nrows = 15;
    var ncols = 15;

    // Initial state of the Board component.
    //
    // Sets the number of rows of the board.
    // Sets the number of columns of the board.
    // Sets the overall capacity of the board.
    // Sets an array of size nrows*ncols with a default boolean value of false.
    this.state = {
      nrows: nrows,
      ncols: ncols,
      capacity: nrows*ncols,
      grid: Array.apply(null, Array(nrows*ncols)).map(Boolean.prototype.valueOf, false)

      //Array.apply(null, {length: nrows*ncols}).map(Number.call, Number)

    }

  }

  // Callback function to update Board state grid array from the <Cell/> component.
  handleGridUpdate(idx, value) {

    // Get a copy of the grid.
    var grid = this.state.grid.slice();

    // Update the copy of the grid at index idx with value.
    grid[idx] = value;

    // Store updated grid.
    this.setState({
      grid: grid
    })
  }

  // Component Render.
  render() {

    // Array to store <Row/> components.
    var rows = [];

    // Need to build an HTML grid.
    //
    // Go through the number of rows, and create <Row/>
    // components.
    //
    // For each <Row/> component, create <Cell/> components
    // based on the number of columns.
    //
    // For the <Row/> component, it will receive a slice of this.state.grid.
    // Since this.state.grid is one contiguous array of data, we need to take
    // slices of size ncols.
    //
    // The first ncols slice belongs to row 1.
    // the second ncols slice belongs to row 2, and so on.
    for(var i=0; i<this.state.nrows; i++) {

      // Row start and end indices.
      var rowStart = i*this.state.ncols;
      var rowEnd = (i*this.state.ncols)+this.state.ncols;

      // Store row components and pass props.
      rows.push(
        <Row
          key={i} // Component key.
          row={i} // Row index.
          rowData={this.state.grid.slice(rowStart, rowEnd)} // Array slice of the row.
          update={this.handleGridUpdate.bind(this)} // Callback passed down to accept state updates from <Cell/>
        />
      );

    }

    return (
      <div className="board">
        {rows}
      </div>
    )

  }

}

export default Board;
