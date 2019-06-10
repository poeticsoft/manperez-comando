
import React from 'react';
import './image.component.scss';

class Image extends React.Component {

  constructor (props) {

    super(props);

    this.state = { }
  }

  render() {

    return (
      <div className="Image">
        <img alt="imgcamera" 
             src={ this.props.uri }
        />
      </div>
    )
  }
}

export default Image;