import React, { useState } from 'react';
import MessageContext from '../../context/message.context';
import Camera from '../camera/camera.component';
import Message from '../message/message.component';

import './app.component.scss';

function App() {

  const [ cameraReady, setCameraReady ] = useState(false);

  return (
      <div className={
        `App ${ cameraReady ? 'CameraReady' : ''}`
      }>
        <div className="CameraWrapper">
          <Camera setcameraready={ setCameraReady } />
        </div>
        <div className="Splash"></div>
        <Message />
      </div>
  );
}

export default App;
