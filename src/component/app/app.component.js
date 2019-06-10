import React from 'react';
import './app.component.scss';

import Camera from '../camera/camera.component';

class App extends React.Component {

  constructor(props, context) {
    
    super(props, context);

    this.state = {
      cameraReady: false
    } 
    
    this.setCameraReady = this.setCameraReady.bind(this);
  }

  setCameraReady() {

    this.setState({
      cameraReady: true
    });
  }

  render() {
    
    return (
      <div className={
        `App ${this.state.cameraReady ? 'CameraReady' : ''} `
      }>
        <Camera setcameraready={ this.setCameraReady } />
        <div className="Splash"></div>
      </div>
    );
  }
}

export default App;
