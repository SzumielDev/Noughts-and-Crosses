import React, { useEffect, useState } from "react";
import Field from './Field';
import circleImg from "./../resources/images/circle.png";
import crossImg from "./../resources/images/cross.png";

const GameFieldArea = () => {

    const [isActive, setIsActive] = useState(false);

    //Definde how big is gameArea
    const [numberOfField, setNumberOfField] = useState(3);

    const [playerOneFields, setPlayerOneFields] = useState([]);
    const [playerTwoFields, setPlayerTwoFields] = useState([]);
    const [deltedFields, setDeletedFields] = useState([]);

    //0 = not started
    //1 = game in progress
    //2 = game ended winner 1
    //3 = game ended winner 2
    //4 = game over
    const [gameStatus, setGameStatus] = useState(1);

    const [player, setPlayer] = useState(0);

    const [fieldState, setFieldState] = useState(
      Array.from({ length: numberOfField * numberOfField }, () => null)
    );

    const setNumberOfFields = (number) => {
      setNumberOfField(number);
    }

    const gameArea = () => {
        return Array.from({ length: numberOfField }, (_, rowIndex) => (
          <tr key={rowIndex}>
                {Array.from({ length: numberOfField }, (_, colIndex) => {
                    const index = rowIndex * numberOfField + colIndex
                    return (
                        <td key={index} onClick={() => {
                            if (!fieldState[index]) {
                              saveCoordinations(rowIndex, colIndex, index)
                            } else {
                              alert("To pole zostało już kliknięte!")
                            }  
                        }}>
                            <Field src={fieldState[index]}/>
                        </td>
                    )
                })}
          </tr>
        ));
      };

    const saveCoordinations = (rowIndex, colIndex, index) => {

      const newPlayerScore = {x: rowIndex, y: colIndex};

          if (player === 0) {
            setPlayerOneFields([...playerOneFields, newPlayerScore])
          } else {
            setPlayerTwoFields([...playerTwoFields, newPlayerScore])
          }

        clickOnField(index)
        setDeletedFields([...deltedFields, newPlayerScore])
    }

      const clickOnField = (index) => {
        const newFieldState = [...fieldState];
        newFieldState[index] = player === 0 ? crossImg : circleImg;
        setPlayer(player === 0 ? 1 : 0)
        setFieldState(newFieldState);
    }

    const checkWinner = (sortedA, sortedB) => {

      for (let i = 0; i <= sortedA.length - 5; i++) {

        const curField = sortedA[i];

        if (curField.x === sortedA[i + 1].x && 
          curField.x === sortedA[i + 2].x && 
          curField.x === sortedA[i + 3].x && 
          curField.x === sortedA[i + 4].x)  
        {
          if (curField.y + 1 === sortedA[i + 1].y &&
              curField.y + 2 === sortedA[i + 2].y &&
              curField.y + 3 === sortedA[i + 3].y &&
              curField.y + 4 === sortedA[i + 4].y) 
          {
            console.log("Jest 5 liczb obok siebie w poziomie")
          }
        }
      }

      for (let i = 0; i <= sortedB.length - 5; i++) {

        const curField = sortedB[i];

        if (curField.y === sortedB[i + 1].y && 
          curField.y === sortedB[i + 2].y && 
          curField.y === sortedB[i + 3].y && 
          curField.y === sortedB[i + 4].y)  
        {
          if (curField.x + 1 === sortedB[i + 1].x &&
              curField.x + 2 === sortedB[i + 2].x &&
              curField.x + 3 === sortedB[i + 3].x &&
              curField.x + 4 === sortedB[i + 4].x) 
          {
            console.log("Jest 5 liczb obok siebie w pionie")
          }
        }
      }

      // for (let i = 0; i <= sortedB.length - 5; i++) {
      //   const sliceY = sortedB.slice(i, i + 5).map(field => field.y);
      //   const sliceX = sortedB.slice(i, i + 5).map(field => field.x);

      //   if (sliceY.every(y => y === sliceY[0]) && sliceX.every((x, index) => x === sliceX[0] + index)) {
      //     console.log("Jest 5 liczb obok siebie w pionie")
      //   }
      // }

      let count = 1;

      for (let i = 0; i < sortedA.length - 1; i++) {
        const curField = sortedB[i];
        const nextField = sortedB[i + 1];

        if (curField.y + 1 === nextField.y && curField.x !== nextField.x) {
          console.log("coś tam działa")
        }
      }

    }

    useEffect(() => {

      const sortedA = [...playerOneFields];
      const sortedB = [...playerOneFields];

      sortedA.sort((a, b) => a.x === b.x ? a.y - b.y : a.x - b.x);
      sortedB.sort((a, b) => a.y === b.y ? a.x - b.x : a.y - b.y);

      if (playerOneFields.length > 4) {
          checkWinner(sortedA, sortedB);
        }

      }, [deltedFields])
      
      return (
        <div>
            <div className={isActive ? "none" : "container"}>
                  <button onClick={() => {setNumberOfFields(5); setIsActive(true)}}>5 pól</button>
                  <button onClick={() => {setNumberOfFields(10); setIsActive(true)}}>10 pól</button>
                  <button onClick={() => {setNumberOfFields(15); setIsActive(true)}}>15 pól</button>
            </div>
            <table className={isActive ? "game-container" : "none"}>
                <tbody>{gameArea()}</tbody>
            </table>
        </div>
      );
}

export default GameFieldArea;
