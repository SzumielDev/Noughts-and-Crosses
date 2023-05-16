import React, { useEffect, useState } from "react";
import Field from './Field';
import GameText from './GameText';
import NumberOfFieldInput from './NumberOfFieldInput';
import circleImg from "./../resources/images/circle.png";
import crossImg from "./../resources/images/cross.png";

const GameFieldArea = () => {

    const [isActive, setIsActive] = useState(false);
    const [text, setText] = useState();

    //Definde how big is gameArea
    const [numberOfField, setNumberOfField] = useState(5);

    const [playerOneFields, setPlayerOneFields] = useState([]);
    const [playerTwoFields, setPlayerTwoFields] = useState([]);
    const [deltedFields, setDeletedFields] = useState([]);

    //0 = not started
    //1 = game in progress
    //2 = game ended winner 0
    //3 = game ended winner 1
    //4 = game over
    const [gameStatus, setGameStatus] = useState(0);

    const gameStatusText = {
      0: "Wpisz wielkość planszy. Min - 5 x 5 / Max - 15 x 15",
      1: "Gra w trakcie",
      2: "Wygrywa gracz 1",
      3: "Wygrywa gracz 2",
      4: "Koniec gry, brak wygranych"
    };

    const [player, setPlayer] = useState(0);

    const [fieldState, setFieldState] = useState(
      Array.from({ length: numberOfField * numberOfField }, () => null)
    );

    const setNumberOfFields = (number) => {
      setNumberOfField(number);
    }

    //Generate Game Area -----------------------------------
    const gameArea = () => {
        return Array.from({ length: numberOfField }, (_, rowIndex) => (
          <tr key={rowIndex}>
                {Array.from({ length: numberOfField }, (_, colIndex) => {
                    const index = rowIndex * numberOfField + colIndex
                    return (
                        <td key={index} onClick={() => {
                            if (!fieldState[index] && gameStatus === 1) {
                              saveCoordinations(rowIndex, colIndex, index)
                            } else if (gameStatus === 1) {
                              alert("To pole zostało już kliknięte!")
                            } else {
                              alert("Gra zakończona!")
                            }
                        }}>
                            <Field src={fieldState[index]}/>
                        </td>
                    )
                })}
          </tr>
        ));
      };

    //Save field to indicated player / fill field ----------------------------
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

    //Check winner fields every move ------------------------------
    const checkCol = (sortedB) => {
      for (let i = 0; i <= sortedB.length - 5; i++) {
        const sliceY = sortedB.slice(i, i + 5).map(field => field.y);
        const sliceX = sortedB.slice(i, i + 5).map(field => field.x);

        if (sliceY.every(y => y === sliceY[0]) && sliceX.every((x, index) => x === sliceX[0] + index)) {
          setGameStatus(player === 0 ? 2 : 3);
        }
      }
    }

    const checkRow = (sortedA) => {    
      for (let i = 0; i <= sortedA.length - 5; i++) {
        const sliceY = sortedA.slice(i, i + 5).map(field => field.x);
        const sliceX = sortedA.slice(i, i + 5).map(field => field.y);

        if (sliceY.every(x => x === sliceY[0]) && sliceX.every((y, index) => y === sliceX[0] + index)) {
          setGameStatus(player === 0 ? 2 : 3);
        }
      }
    }

    const checkCross = (sortedB) => {
      for (let i = 0; i < sortedB.length - 4; i++) {
        const { x, y } = sortedB[i];
        const isMatch = (mx, my) => [1, 2, 3, 4].every((n) => checkCrossFiled(sortedB, x + n * mx, y + n * my));

        if (isMatch(1, 1) || isMatch(-1, 1)) {
          setGameStatus(player === 0 ? 2 : 3);
          break;
        }
      }
    }

    const checkCrossFiled = (sortedB, x, y) => {
      for (let i = 0; i < sortedB.length; i++) {
        if (sortedB[i].x === x && sortedB[i].y === y) {
          return true;
        }
      }
      return false;
    }

    const checkIfThereIsStillFields = () => {
      const sumFields = numberOfField * numberOfField;
      if (deltedFields.length === sumFields) {
        setGameStatus(4);
      }
    }

    //-----------------------------------------------

    const pickPlayerToSort = (sortedA, sortedB) => {

      sortedA.sort((a, b) => a.x === b.x ? a.y - b.y : a.x - b.x);
      sortedB.sort((a, b) => a.y === b.y ? a.x - b.x : a.y - b.y); 

      if (playerOneFields.length > 4) {
        checkCol(sortedB);
        checkRow(sortedA);
        checkCross(sortedB);
        checkIfThereIsStillFields();
      }
    }

    useEffect(() => { 
      const sortedA = player === 0 ? [...playerOneFields] : [...playerTwoFields];
      const sortedB = [...sortedA];
      pickPlayerToSort(sortedA, sortedB);

      }, [deltedFields])

      useEffect(() => {
        setText(gameStatusText[gameStatus]);
      }, [gameStatus])
      
      return (
        <div>
            <GameText text={text} />

            <NumberOfFieldInput 
              setGameStatus={setGameStatus}
              setIsActive={setIsActive}
              setText={setText}
              setNumberOfFields={setNumberOfFields}
              isActive={isActive}
            />
            
            <table className={isActive ? "game-container" : "none"}>
                <tbody>{gameArea()}</tbody>
            </table>
            
        </div>
      );
}

export default GameFieldArea;
