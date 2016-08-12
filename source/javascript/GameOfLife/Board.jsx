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

    var generateScanRadius = function(grid, i, j) {
      // Get top-left value.
      var item0 = null;
      try {
        item0 = grid[i-1][j-1];
      } catch(e) {
        item0 = null;
      }

      // Get top-middle value.
      var item1 = null;
      try {
        item1 = grid[i][j-1];
      } catch(e) {
        item1 = null;
      }

      // Get top-right value.
      var item2 = null;
      try {
        item2 = grid[i+1][j-1];
      } catch(e) {
        item2 = null;
      }

      // Get middle-left value.
      var item3 = null;
      try {
        item3 = grid[i-1][j];
      } catch(e) {
        item3 = null;
      }

      // Get origin value.
      var item4 = null;
      try {
        item4 = grid[i][j];
      } catch(e) {
        item4 = null;
      }

      // Get middle-right value.
      var item5 = null;
      try {
        item5 = grid[i+1][j];
      } catch(e) {
        item5 = null;
      }

      // Get bottom-left value.
      var item6 = null;
      try {
        item6 = grid[i-1][j+1];
      } catch(e) {
        item6 = null;
      }

      // Get bottom-middle value.
      var item7 = null;
      try {
        item7 = grid[i][j+1];
      } catch(e) {
        item7 = null;
      }

      // Get bottom-right value.
      var item8 = null;
      try {
        item8 = grid[i+1][j+1];
      } catch(e) {
        item8 = null;
      }

      // Scan radius.
      var scanRadius = {
        indices: [
                    [i-1, j-1], [i, j-1], [i+1, j-1],
                    [i-1, j  ], [i, j  ], [i+1, j  ],
                    [i-1, j+1], [i, j+1], [i+1, j+1]
                 ],
        values: [item0, item1, item2, item3, item4, item5, item6, item7, item8]
      }

      return scanRadius;
    }

    var grid = this.state.grid.slice();

    var gridCopy = this.state.grid.slice();

    // Go through the rows.
    for(var i=0; i<grid.length; i++) {

      // Go through the columns.
      for(var j=0; j<grid[i].length; j++) {

        // For the current cell, generate a scan radius.
        //
        // Look at the state of cells around the current cell.
        var scanRadius = generateScanRadius(grid, i, j);

        // Index of origin cell.
        var originIdx = 4;
        var origin = grid[i][j];

        // Clear origin in scanRadius.
        scanRadius.values[originIdx] = null;

        // Number of cells which are active/inactive in the scan radius.
        var numActiveCells = 0;
        var numInactiveCells = 0;

        // Grid indices of the active/inactive cells.
        var idxActiveCells = [];
        var idxInactiveCells = [];

        // Grid indices of dead cells.
        var idxDeadCells = [];

        // Get the number of cells in the scan radius which are active/inactive.
        //
        // scanRadius.values is an array which consists of either undefined,
        // true, or false.
        for(var x=0; x<scanRadius.values.length; x++) {
          if (scanRadius.values[x] === true) {
            numActiveCells++;
            idxActiveCells.push(scanRadius.indices[x]);
          } else if (scanRadius.values[x] == false) {
            numInactiveCells++;
            idxInactiveCells.push(scanRadius.indices[x]);
          }
        }

        if (origin) {

          // Case 1: Any live cell with fewer than two live neighbours dies,
          // as if caused by under-population.
          if (numActiveCells < 2) {
            gridCopy[i][j] = false;

            // Store the index of the dead cell.
            idxDeadCells.push([i,j]);
          }

          // Case 2: Any live cell with two or three live neighbours lives on
          // to the next generation.
          if (numActiveCells == 2 || numActiveCells == 3) {
            gridCopy[i][j] = true;
          }

          // Case 3: Any live cell with more than three live neighbours dies, as
          // if by over-population.
          if (numActiveCells > 3) {
            gridCopy[i][j] = false;

            // Store the index of the dead cell.
            idxDeadCells.push([i,j]);
          }

        } else {

        }


      };
    };

    // Update grid.
    this.setState({
      grid: gridCopy
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
