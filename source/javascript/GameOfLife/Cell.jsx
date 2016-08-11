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

    // Cell index in relation to the board grid.
    var index = this.props.index;

    // Current cell state..
    var cellState = this.props.contents;

    // Flip the state and send the update to the parent.
    this.props.update(index, !cellState);

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
      <div className={cellClasses} onClick={this.update.bind(this)}>
        {String(this.props.contents)}
      </div>
    )

  }

}

export default Cell;
