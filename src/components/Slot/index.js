import React from 'react';
import './slot.css';

const Slot = ({slotData}) => {
  return(
    <div className={'slot'}>
      <p>{slotData}</p>
    </div>
  );
}

export default Slot;
