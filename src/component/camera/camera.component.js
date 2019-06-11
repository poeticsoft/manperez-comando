
import React, { 
  useContext, 
  useState, 
  useEffect,
  useCallback
} from 'react'
import CameraPhoto, { FACING_MODES } from 'jslib-html5-camera-photo'
import MessageContext from '../../context/message.context'
import SwipeableViews from 'react-swipeable-views'

import Image from './image/image.component'
import './camera.component.scss'

function Camera({ setcameraready }) {

  const videoRef = React.createRef();
  const [cameraPhoto, setCameraPhoto] = useState(null);
  const [inRafaga, setInRafaga] = useState(false) 
  const [photos, setFotos] = useState([]) 
  const [cameraStarted, setCameraStarted] = useState(false)
  const [useCamera, setUseCamera] = useState(FACING_MODES.USER)
  const context = useContext(MessageContext)

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
      
      setcameraready(false) 

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

    if(useCamera === FACING_MODES.ENVIRONMENT) {

      setUseCamera(FACING_MODES.USER)

    } else {   

      setUseCamera(FACING_MODES.ENVIRONMENT)
    }

    context.updateMessage({
      type: 'info',
      text: `Changed to camera ${ useCamera }`
    })

    startCamera();
  } 
  
  const startCamera = useCallback(() => { 

    return cameraPhoto.startCameraMaxResolution(useCamera)

  }, [
    cameraPhoto,
    useCamera
  ])

  useEffect (() => {

    if(!cameraPhoto) {

      context.updateMessage({
        type: 'info',
        text: 'Starting camera'
      }) 

      return setCameraPhoto(new CameraPhoto(videoRef.current));
    }

    if(!cameraStarted) {
      
      startCamera()      
      .then(() => {  

        context.updateMessage({
          type: 'info',
          text: 'Camera ready'
        })   

        setcameraready(true);
      })
      .catch((error) => {   

        context.updateMessage({
          type: 'error',
          text: 'Camera not accesible! ' + error
        })
      }) 

      setCameraStarted(true) 
    }

  }, [
    cameraPhoto,
    context, 
    videoRef,
    startCamera,
    setCameraStarted,
    cameraStarted,
    setcameraready
  ])

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