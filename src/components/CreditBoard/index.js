import React from 'react';
import './credit-board.css';

const CreditBoard = ({credits}) => {
  return(
    <div className={'credit-board'}>
      Credits: {credits}
    </div>
  );
}

export default CreditBoard;
