// https://medium.com/digio-australia/using-the-react-usecontext-hook-9f55461c4eae
import React from 'react';

const MessageContext = React.createContext({
  message: {
    type: '',
    text: ''
  },
  updateMessage: () => {}
});

export default MessageContext;