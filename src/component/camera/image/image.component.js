
import React from 'react';
import './image.component.scss';

function Image(props) {

  return (
    <div className="Image">
      <img alt="imgcamera" 
            src={ props.uri }
      />
    </div>
  )
}

export default Image;