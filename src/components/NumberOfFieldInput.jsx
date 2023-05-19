import React, { useState } from "react";

const NumberOfFieldInput = ({
  setGameStatus,
  setIsActive,
  setHeaderText,
  setNumberOfFields,
  isActive,
}) => {

  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value)
  };

  const startGame = () => {
    const inputRoundNumber = Math.round(inputValue);
    if (inputRoundNumber >= 5 && inputRoundNumber <= 15) {
      setGameStatus(1);
      setIsActive(true);
      setNumberOfFields(inputRoundNumber)
    } else {
      setHeaderText(inputRoundNumber < 5 ? 'Musi być minimum 5 pól' : inputRoundNumber > 15 ? "Może być maskymalnie 15 pól" : '')
    }
  };

  return (
    <div>
      <div className={isActive ? "none" : "container"}>
        <div className="custom-input">
          <input name="numberField" type="number" onChange={handleChange} />
          <label>Wprowadź liczbę</label>
        </div>
      </div>

      <div className={isActive ? "none" : "container"}>
        <button onClick={() => {startGame();}}>Rozpocznij grę</button>
      </div>
    </div>
  );
};

export default NumberOfFieldInput;
