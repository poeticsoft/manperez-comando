
import React, { useState } from 'react';

const [ message, setMessage ] = useState({
  message: {
    type: 'info',
    message: 'init'
  }
});

const MessageContext = React.createContext({
  message,
  setMessage
});

export default MessageContext;