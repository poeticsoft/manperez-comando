
import React, { 
  useContext, 
  useState, 
  useEffect, 
  useLayoutEffect 
} from 'react'
import CameraPhoto, { FACING_MODES } from 'jslib-html5-camera-photo'
import MessageContext from '../../context/message.context'
import SwipeableViews from 'react-swipeable-views'

import Image from './image/image.component'
import './camera.component.scss'

function Camera(props) {

  const videoRef = React.createRef();
  const [cameraPhoto, setCameraPhoto] = useState(null);
  const [inRafaga, setInRafaga] = useState(false) 
  const [photos, setFotos] = useState([]) 
  const context = useContext(MessageContext)
  let useCamera = FACING_MODES.ENVIRONMENT

  function toggleInRafaga() {

    setInRafaga(!inRafaga)
  }

  function take() {

    const config = {
      sizeFactor: 1
    }

    let dataUri = cameraPhoto.getDataUri(config)
    setFotos(prevState => {
      
      return [
        ...prevState,
        dataUri
      ]
    })

    if(inRafaga) {

      setTimeout(take, 100);
    }
  }

  function stopTake() {

    if(inRafaga) { setInRafaga(false); }
  }

  function stopCamera() {

    cameraPhoto
    .stopCamera()
    .then(() => {      
      
      props.setcameraready(false) 

      context.updateMessage({
        type: 'warn',
        text: 'Camera stopped'
      })
    })
    .catch((error) => {

      context.updateMessage({
        type: 'warn',
        text: 'No camera to stop!:', error
      })
    })
  }
    
  function toggleCamera() {

    stopCamera()

    useCamera = useCamera == FACING_MODES.ENVIRONMENT ? 
                              FACING_MODES.USER:
                              FACING_MODES.ENVIRONMENT
    startCamera();
  } 

  function startCamera() {

    cameraPhoto
    .startCameraMaxResolution(useCamera)
    .then(() => { 
      
      props.setcameraready(true) 

      context.updateMessage({
        type: 'info',
        text: 'Camera ready'
      })
    })
    .catch((error) => {  

      context.updateMessage({
        message: {
          type: 'error',
          text: 'Camera not accesible! ' + error
        }
      })
    })
  }

  useEffect (() => { 

    if(!cameraPhoto) {      

      return setCameraPhoto(new CameraPhoto(videoRef.current));
    }

    startCamera();

  }, [cameraPhoto])

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
                onMouseDown ={ take }
                onMouseUp ={ stopTake }> 
          Take photo
        </button>

      </div>

    </div>
  )
}

export default Camera