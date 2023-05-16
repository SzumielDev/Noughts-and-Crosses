import React, { useState } from "react";

const NumberOfFieldInput = ({setGameStatus, setIsActive, setText, setNumberOfFields, isActive}) => {

    const [isTargetReady, setIsTargetReady] = useState(false);

    //Star game if input is TRUE
    const startGame = () => {
      if (isTargetReady) {
        setGameStatus(1);
        setIsActive(true);
      }
    }

    //Check number of fields in input
    const handleChange = (e) => {
      const target = e.target.value;
      if (target < 5 || target > 15) {
        setText(target < 5 ? "Musi być minimum 5 pól" : "Może być maksymalnie 15 pól");
      } else {
        setText("");
        setIsTargetReady(true)
        setNumberOfFields(target)
      }
    }

    return (
        <div>
            <div className={isActive ? "none" : "container"}>
                <input name="numberField" type="number" onChange={handleChange} />
           </div>
           <div className={isActive ? "none" : "container"}>
                <button onClick={startGame}>Rozpocznij grę</button>
            </div>
        </div>
    )
}

export default NumberOfFieldInput;