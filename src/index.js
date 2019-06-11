
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './component/app/app.component';

ReactDOM.render(<App />, document.getElementById('root'));

/*

if('serviceWorker' in navigator) {
  
  navigator
  .serviceWorker
  .register('/sw.js')
  .then(function(registration) { 
    
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
*/