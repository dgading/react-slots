import React from 'react';

const Button = ({onclick, creditValue, currentCredits}) => {
  return (
    <button
      onClick={onclick}
      disabled={creditValue <= currentCredits ? false : true}
    >
      {creditValue} Credits
    </button>
  );
}

export default Button;
