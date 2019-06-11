import React, { useState } from 'react';
import MessageContext from '../../context/message.context';
import Camera from '../camera/camera.component';
import Message from '../message/message.component';

import './app.component.scss';

function App() {

  const updateMessage = (message) => {

    setMessage(prevState => {

      return {
        ...prevState,
        message
      }
    })
  }
  const messageState = {
    message: {
      type: 'info',
      text: 'Init'
    },
    updateMessage
  }
  const [message, setMessage] = useState(messageState);
  const [ cameraReady, setCameraReady ] = useState(false);
  
  return (
    <MessageContext.Provider value={ message } >
      <div className={
        `App ${ cameraReady ? 'CameraReady' : ''}`
      }>
        <div className="CameraWrapper">
          <Camera setcameraready={ setCameraReady } />
        </div>
        <div className="Splash"></div>
        <Message />
      </div>
    </MessageContext.Provider>
  );
}

export default App;
