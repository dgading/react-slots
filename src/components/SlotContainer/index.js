import React from 'react';
import Slot from '../Slot';

import './slot_container.css';

const SlotContainer = ({slotDatum}) => {
  return(
    <div className="slot-container">
      {slotDatum.map((slotData, index) => {
        return <Slot key={index} slotData={slotData} />;
      })}
    </div>
  );
}

export default SlotContainer;
