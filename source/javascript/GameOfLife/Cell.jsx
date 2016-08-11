// React.
import React from 'react';
import ReactDOM from 'react-dom';

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

    return (
      <div className="cell" onClick={this.update.bind(this)}>
        {String(this.props.contents)}
      </div>
    )

  }

}

export default Cell;
