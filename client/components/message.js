import React from 'react';
import TimeAgo from 'react-timeago';

const Message = ({user, text, timestamp}) => (
  <tr className="message"><td>

    <div className="user">{user}:</div>
    <TimeAgo className="timestamp pull-right" minPeriod="5000" date={timestamp} />
    <div className="text">{text}</div>
  </td></tr>
);

export default Message;
