// React.
import React from 'react';
import ReactDOM from 'react-dom';

import classNames from 'classnames';

class Cell extends React.Component {

  // Component Constructor.
  constructor() {
    super();
  }

  update() {

    // Get the index of this cell in relation to Board multidim array.
    var row = this.props.row;
    var col = this.props.col;

    // Current cell state..
    var cellState = this.props.contents;

    // Flip the state and send the update to the parent.
    this.props.update(row, col, !cellState);

  }

  // Component Render.
  render() {

    // Classes used for this cell.
    //
    // If this.props.contents flips between true/false,
    // add/remove the .cell-active class.
    var cellClasses = classNames({
      'cell': true,
      'cell-active': this.props.contents
    });

    return (
      <div
        className={cellClasses}
        //onClick={this.update.bind(this)}
      />
    )

  }

}

export default Cell;
