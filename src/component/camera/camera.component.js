
import React from 'react';
import CameraPhoto, { FACING_MODES } from 'jslib-html5-camera-photo';
import './camera.component.scss';

class Camera extends React.Component {

  constructor (props, context) {

    super(props, context);

    this.cameraPhoto = null;
    this.videoRef = React.createRef();
    this.state = {
      photos: []
    }
  }

  componentDidMount () {

    this.cameraPhoto = new CameraPhoto(this.videoRef.current);
    this.cameraPhoto
    .startCameraMaxResolution(FACING_MODES.ENVIRONMENT)
    .then(() => {

      this.props.setcameraready();
    })
    .catch((error) => {

      console.error('Camera not started!', error);
    });
  }

  takePhoto () {

    const config = {
      sizeFactor: 1
    };

    let dataUri = this.cameraPhoto.getDataUri(config);
    this.setState({ 
      photos: [...this.state.photos, dataUri]
    });
  }

  stopCamera () {

    this.cameraPhoto
    .stopCamera()
    .then(() => {

      console.log('Camera stoped!');
    })
    .catch((error) => {

      console.log('No camera to stop!:', error);
    });
  }

  render () {

    return (
      <div className="Camera">

        <button onClick={ () => {
          this.takePhoto();
        }}> Take photo </button>

        <video
          ref={this.videoRef}
          autoPlay={ true }
        />

        <div className="Photos">
          { 
            this.state
            .photos
            .map(
              (uri, index) => <img alt="imgcamera" 
                                   src={ uri } 
                                   key={ index } 
                              />
            )
          }
        </div>
      </div>
    );
  }
}

export default Camera;

/*

  <button onClick={ () => {
    let facingMode = FACING_MODES.ENVIRONMENT;
    let idealResolution = { width: 640, height: 480 };
    this.startCamera(facingMode, idealResolution);
  }}> Start environment facingMode resolution ideal 640 by 480 </button>

  <button onClick={ () => {
    let facingMode = FACING_MODES.USER;
    this.startCamera(facingMode, {});
  }}> Start user facingMode resolution default </button>

  <button onClick={ () => {
    let facingMode = FACING_MODES.USER;
    this.startCameraMaxResolution(facingMode);
  }}> Start user facingMode resolution maximum </button>

  <button onClick={ () => {
    this.takePhoto();
  }}> Take photo </button>

  <button onClick={ () => {
    this.stopCamera();
  }}> Stop </button>

*/

