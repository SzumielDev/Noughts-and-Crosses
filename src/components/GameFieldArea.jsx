import React, { useEffect, useState } from "react";
import Field from './Field';
import circleImg from "./../resources/images/circle.png";
import crossImg from "./../resources/images/cross.png";

const GameFieldArea = () => {

    //Definde how big is gameArea
    const [numberOfField, setNumberOfField] = useState(10);

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

    useEffect(() => {
      const sortedX = playerOneFields.sort((a, b) => a.x - b.x);
      const srotedY = playerOneFields.sort((a, b) => a.y - b.y);
      // console.log(sortedX)
      // console.log(srotedY)
      if (sortedX.length > 4) {
        for (let i = 0; i <= sortedX.length - 5; i++) {
          if (sortedX[i].x === sortedX[i + 1].x && 
            sortedX[i].x === sortedX[i + 2].x && 
            sortedX[i].x === sortedX[i + 3].x && 
            sortedX[i].x === sortedX[i + 4].x)  
          {
            // for (let j=0; j <= srotedY.length - 5; j++) {
              
            // }

          }
        }
      }

    }, [deltedFields])
      
      return (
        <div>
            <table className="game-container">
                <tbody>{gameArea()}</tbody>
            </table>
        </div>
      );
}

export default GameFieldArea;
