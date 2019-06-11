
import React, { useState, useContext } from 'react';
import MessageContext from '../../context/message.context';
import './message.component.css';

function Message() {

  const context = useContext(MessageContext);

  return (
    <div className={ `Message ${ context.message.type }` }>
      { context.message.text } 
    </div>
  );
}

export default Message;