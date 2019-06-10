
import React, { 
  useContext, 
  useState, 
  useEffect, 
  useRef
} from 'react';
import CameraPhoto, { FACING_MODES } from 'jslib-html5-camera-photo';
import MessageContext from '../../context/message.context';
import SwipeableViews from 'react-swipeable-views';

import Image from './image/image.component';
import './camera.component.scss';

function Camera(props) {

  const videoRef = useRef(null);
  const [inRafaga, setInRafaga] = useState(false); 
  const [photos, setFotos] = useState([]); 
  const context = useContext(MessageContext);
  let cameraPhoto = null;

  console.log(context)

  function toggleInRafaga() {

    setInRafaga(!inRafaga);
  }

  function startTake() {

    const config = {
      sizeFactor: 1
    };

    let dataUri = this.cameraPhoto.getDataUri(config);
    this.setState({ 
      photos: [...this.state.photos, dataUri]
    });
  }

  function stopTake() {
    
  }

  function stopCamera() {

    this.cameraPhoto
    .stopCamera()
    .then(() => {

      console.log('Camera stoped!');
    })
    .catch((error) => {

      console.log('No camera to stop!:', error);
    });
  }
    
  function toggleCamera() {


  } 

  useEffect(() => {  

    cameraPhoto = new CameraPhoto(videoRef.current);
    cameraPhoto
    .startCameraMaxResolution(FACING_MODES.ENVIRONMENT)
    .then(() => {
      
      props.setcameraready();
      

      context.updateMessage({
        type: 'info',
        message: 'Camera started!'
      })
    })
    .catch((error) => {

      context.updateMessage({
        type: 'error',
        message: 'Camera not started!'
      });
    });
  });

  return (
    <div className="Camera">
      
      <div className="VideoWrapper">
        <video ref={ videoRef }
               autoPlay={ true }
        />
      </div>        

      <SwipeableViews className="Photos"
                      enableMouseEvents={ true }>
        { 
          photos
          .map(
            (uri, index) => <Image uri={ uri } 
                                    key={ index } 
                            />
          )
        }
      </SwipeableViews>

      <div className="Tools Mode">

        <button className="ToggleCamera"
                onClick ={ toggleCamera }> 
          ToggleCamera
        </button>

        <button className={ `ToggleRafaga ${ inRafaga ? 'InRafaga' : '' }` }
                onClick ={ toggleInRafaga }> 
          ToggleRafaga 
        </button>

      </div>

      <div className="Tools Action">

        <button className={ `TakePhoto ${ inRafaga ? 'InRafaga' : '' }` }
                onMouseDown ={ startTake }
                onMouseUp ={ stopTake }> 
          Take photo
        </button>

      </div>

    </div>
  );
}

export default Camera;