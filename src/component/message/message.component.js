
import React, { useContext, useState } from 'react';
import MessageContext from '../../context/message.context';
import './message.component.css';

function Message() {

  const context = useContext(MessageContext)
  const [hide, setHide] = useState(false)

  setTimeout(() => { setHide(true); }, 2000)

  return (
    <div className={ `Messages ${ hide ? 'Hide' : '' }` }>{
      context.messages.map((message, index) => {

        return <div className={ `Message ${ message.type }` } 
                    key={ index }>
          { message.text }
        </div>
      })
    }</div>
  );
}

export default Message;