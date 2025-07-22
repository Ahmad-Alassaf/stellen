import React from 'react'
import { formatDistanceToNow } from "date-fns";

const TimeAgo = ({timestamp}) => {
    const date = new Date(timestamp);
  const timeAgo = formatDistanceToNow(date, { addSuffix: true });
  return (
    <div>
         <span>{timeAgo}</span>
      
    </div>
  )
}

export default TimeAgo
