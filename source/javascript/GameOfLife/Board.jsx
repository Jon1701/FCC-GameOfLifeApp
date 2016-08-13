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
    /*
    var grid = [];
    for(var i=0; i<nrows; i++) { // Create nrows number of boolean false arrays and store them

      // Create row of boolean false.
      var row = Array.apply(null, Array(ncols)).map(Boolean.prototype.valueOf, false);

      // Store row.
      grid.push(row);
    }
    */

    var grid = [
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, true, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, true, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, true, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, true, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
    ]


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

    var getNumLiveNeighbours = function(grid, i, j) {

      // Keep track of the number of live neighbours.
      var numLiveNbrs = 0;

      // Top-left value.
      try {
        if (grid[i-1][j-1]) {
          numLiveNbrs++;
        };
      } catch(e) {
      }

      // Top-middle value.
      try {
        if (grid[i][j-1]) {
          numLiveNbrs++;
        };
      } catch(e) {
      }

      // Top-right value.
      try {
        if (grid[i+1][j-1]) {
          numLiveNbrs++;
        };
      } catch(e) {
      }

      // Middle-left value.
      try {
        if (grid[i-1][j]) {
          numLiveNbrs++;
        };
      } catch(e) {
      }

      // Middle-right value.
      try {
        if (grid[i+1][j]) {
          numLiveNbrs++;
        };
      } catch(e) {
      }

      // Bottom-left value.
      try {
        if (grid[i-1][j+1]) {
          numLiveNbrs++;
        };
      } catch(e) {
      }

      // Bottom-middle value.
      try {
        if (grid[i][j+1]) {
          numLiveNbrs++;
        };
      } catch(e) {
      }

      // Bottom-right value.
      try {
        if (grid[i+1][j+1]) {
          numLiveNbrs++;
        };
      } catch(e) {
      }

      return numLiveNbrs;
    }

    // Get a copy of the board.
    var grid = this.state.grid.slice();


        console.log(grid)

    // Get a copy of the board which is to be modified for the next generation.
    var gridCopy = this.state.grid.slice();

    // Go through the entire board.
    for(var i=0; i<grid.length; i++) {
      for(var j=0; j<grid[i].length; j++) {

        // Check if the current cell is alive.
        var isAlive = grid[i][j];

        // Count number of live neighbours around the current cell.
        var numLiveNbrs = getNumLiveNeighbours(grid, i, j);

        // Apply Game of Life scenarios.
        //
        // Any live cell with fewer than two live neighbours dies,
        // as if caused by under-population.
        if (isAlive && numLiveNbrs < 2) {
          gridCopy[i][j] = false;
        }

        // Any live cell with two or three live neighbours lives on to the
        // next generation.
        if (isAlive && (numLiveNbrs == 2 || numLiveNbrs == 3)) {
          gridCopy[i][j] = true;
        }

        // Any live cell with more than three live neighbours dies, as if by
        // over-population.
        if (isAlive && numLiveNbrs > 3) {
          gridCopy[i][j] = false;
        }

        // Any dead cell with exactly three live neighbours becomes
        // a live cell, as if by reproduction.
        if (!isAlive && numLiveNbrs == 3) {
          gridCopy[i][j] = true;
        }

      };
    };

    // Replace existing grid state with the modified one.
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
          //update={this.handleGridUpdate.bind(this)} // Callback passed down to accept state updates from <Cell/>
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
