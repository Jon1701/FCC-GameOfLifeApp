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

    // Create grid contents.
    var grid = [];
    for(var i=0; i<nrows; i++) { // Create nrows number of boolean false arrays and store them

      // Create row of boolean false.
      var row = Array.apply(null, Array(ncols)).map(Boolean.prototype.valueOf, false);

      // Store row.
      grid.push(row);
    }


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
      grid: grid
    }

  }

  // Callback function to update Board state grid array from the <Cell/> component.
  handleGridUpdate(row, col, value) {

    // Get a copy of the grid.
    var grid = this.state.grid.slice();

    // Update the copy of the grid at index idx with value.
    grid[row][col] = value;

    // Store updated grid.
    this.setState({
      grid: grid
    })
  }

  scanner() {

    var grid = this.state.grid.slice();

    // Go through the rows.
    for(var i=0; i<grid.length; i++) {

      // Go through the columns.
      for(var j=0; j<grid[i].length; j++) {

        // Flip cell state
        grid[i][j] = !grid[i][j];

      };

    };

    // Update grid.
    this.setState({
      grid: grid
    });

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
    for(var i=0; i<this.state.grid.length; i++) {

      // Store row components and pass props.
      rows.push(
        <Row
          key={i} // Component key.
          row={i} // Row index.
          rowData={this.state.grid[i]} // Array slice of the row.
          update={this.handleGridUpdate.bind(this)} // Callback passed down to accept state updates from <Cell/>
        />
      );

    }

    return (
      <div>

        <button onClick={this.scanner.bind(this)}>Begin</button>

        <div className="board">
          {rows}
        </div>

      </div>
    )

  }

}

export default Board;
