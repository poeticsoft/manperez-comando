
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './component/app/app.component';

ReactDOM.render(<App />, document.getElementById('root'));

if('serviceWorker' in navigator) {
  
  navigator
  .serviceWorker
  .register('/sw.js')
  .then(function(registration) { 
    
    registration.addEventListener('updatefound', function() {
      
      var installingWorker = registration.installing;

      console.log(
        'A new service worker is being installed:',
        installingWorker
      );
    });
    
    console.log('--------------------------------------------');
    console.log('¡¡¡ WELCOME TO COMANDO MANLIVE APP !!!');
    console.log('--------------------------------------------');
  })
  .catch(function(err){
    
    console.log('--------------------------------------------------');
    console.log('       OPSSS... SOMETHING GOES WRONG : ((         ');
    console.log('PLEASE VISIT WEB https://comand.manuelperez.live  ');
    console.log('--------------------------------------------------');
  });
}
