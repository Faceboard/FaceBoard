import React from 'react';

const Message = ({key, user, text}) => (
  <div className="message">
    <h1 className="user">{user}:</h1>
    <h3 className="text">{text}</h3>
  </div>
);

export default Message;
