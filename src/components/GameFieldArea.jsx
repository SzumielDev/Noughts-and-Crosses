import React, { useEffect, useState } from "react";
import GameText from "./GameText";
import NumberOfFieldInput from "./NumberOfFieldInput";
import Field from "./Field";
import circleImg from "./../resources/images/circle.png";
import crossImg from "./../resources/images/cross.png";

const GameFieldArea = () => {

  const [isActive, setIsActive] = useState(false);
  const [headerText, setHeaderText] = useState();

  const [numberOfField, setNumberOfField] = useState(5);

  const [playerOneFields, setPlayerOneFields] = useState([]);
  const [playerTwoFields, setPlayerTwoFields] = useState([]);

  const [usedFields, setUsedFields] = useState([]);

  //Currently game status
  //0 = not started
  //1 = game in progress
  //2 = game ended winner 0
  //3 = game ended winner 1
  //4 = game over
  const [gameStatus, setGameStatus] = useState(0);

  const gameStatusText = {
    0: "Wpisz wielkość planszy. Aby wygrać musisz zakreślić 5 pól obok siebie.",
    1: "Gra w trakcie",
    2: "Wygrywa gracz 1",
    3: "Wygrywa gracz 2",
    4: "Koniec gry, brak wygranych",
  };

  const [player, setPlayer] = useState(1);

  const [fieldState, setFieldState] = useState(
    Array.from({ length: numberOfField * numberOfField }, () => null)
  );

  const setNumberOfFields = (number) => {
    setNumberOfField(number);
  };

  const gameAreaTemplate = () => {
    return Array.from({ length: numberOfField }, (_, rowIndex) => (
      <tr key={rowIndex}>
        {Array.from({ length: numberOfField }, (_, colIndex) => {
          const index = rowIndex * numberOfField + colIndex;
          return (
            <td
              key={index}
              onClick={handleClickedField(rowIndex, colIndex, index)}
            >
              <Field src={fieldState[index]} />
            </td>
          );
        })}
      </tr>
    ));
  };

  const handleClickedField = (rowIndex, colIndex, index) =>  () => {
    if (!fieldState[index] && gameStatus === 1) {
      saveCoordinations(rowIndex, colIndex, index);
    } else if (gameStatus === 1) {
      alert("To pole zostało już kliknięte!");
    } else {
      alert("Gra zakończona!");
    }
  }

  const saveCoordinations = (rowIndex, colIndex, index) => {
    const newPlayerScore = { x: rowIndex, y: colIndex };
    showCoordinationsInTextAreaAfterMove(newPlayerScore);

    if (player === 0) {
      setPlayerOneFields([...playerOneFields, newPlayerScore]);
    } else {
      setPlayerTwoFields([...playerTwoFields, newPlayerScore]);
    }

    setUsedFields([...usedFields, newPlayerScore]);
    updateGameArea(index);
  };

  const showCoordinationsInTextAreaAfterMove = (coordinations) => {
    setHeaderText(`Gracz ${player} zaznaczył pole x: ${coordinations.x} y: ${coordinations.y}`);
  }

  const updateGameArea = (index) => {
    const newFieldState = [...fieldState];
    newFieldState[index] = player === 0 ? crossImg : circleImg;
    setFieldState(newFieldState);
  };

  const checkGamesStatusEveryMove = (playerFields) => {
    const playerFieldsSortedByX = [...playerFields];
    const playerFieldsSortedByY = [...playerFields];

    const sortedByX = playerFieldsSortedByX.sort((a, b) => (a.x === b.x ? a.y - b.y : a.x - b.x));
    const sortedByY = playerFieldsSortedByY.sort((a, b) => (a.y === b.y ? a.x - b.x : a.y - b.y));

    if (playerOneFields.length > 4) {
      checkCol(sortedByY);
      checkRow(sortedByX);
      checkCross(sortedByY);
      checkIfThereIsStillavailableFields();
    }
  };

  const checkCol = (sortedByY) => {
    for (let i = 0; i <= sortedByY.length - 5; i++) {
      const sliceY = sortedByY.slice(i, i + 5).map((field) => field.y);
      const sliceX = sortedByY.slice(i, i + 5).map((field) => field.x);

      if (
        sliceY.every((y) => y === sliceY[0]) &&
        sliceX.every((x, index) => x === sliceX[0] + index)
      ) {
        setGameStatus(player === 0 ? 2 : 3);
      }
    }
  };

  const checkRow = (sortedByX) => {
    for (let i = 0; i <= sortedByX.length - 5; i++) {
      const sliceY = sortedByX.slice(i, i + 5).map((field) => field.x);
      const sliceX = sortedByX.slice(i, i + 5).map((field) => field.y);

      if (
        sliceY.every((x) => x === sliceY[0]) &&
        sliceX.every((y, index) => y === sliceX[0] + index)
      ) {
        setGameStatus(player === 0 ? 2 : 3);
      }
    }
  };

  const checkCross = (sortedByY) => {
    for (let i = 0; i < sortedByY.length - 4; i++) {
      const { x, y } = sortedByY[i];
      const isMatch = (mx, my) =>
        [1, 2, 3, 4].every((n) =>
        isPairInSortedCrossList(sortedByY, x + n * mx, y + n * my)
        );

      if (isMatch(1, 1) || isMatch(-1, 1)) {
        setGameStatus(player === 0 ? 2 : 3);
        break;
      }
    }
  };

  const isPairInSortedCrossList = (sortedByY, x, y) => {
    for (let i = 0; i < sortedByY.length; i++) {
      if (sortedByY[i].x === x && sortedByY[i].y === y) {
        return true;
      }
    }
    return false;
  };

  const checkIfThereIsStillavailableFields = () => {
    const sumFields = numberOfField * numberOfField;
    if (usedFields.length === sumFields) {
      setGameStatus(4);
    }
  };

  const changePlayerAfterHisMove = () => {
    setPlayer(player === 0 ? 1 : 0);
  }

  useEffect(() => {
    const playerFields = player === 0 ?  [...playerOneFields] : [...playerTwoFields];
    checkGamesStatusEveryMove(playerFields);
    changePlayerAfterHisMove();
  }, [usedFields]);

  useEffect(() => {
    setHeaderText(gameStatusText[gameStatus]);
  }, [gameStatus]);

  return (
    <div>
      <GameText headerText={headerText} isActive={isActive} />

      <NumberOfFieldInput
        setGameStatus={setGameStatus}
        setIsActive={setIsActive}
        setHeaderText={setHeaderText}
        setNumberOfFields={setNumberOfFields}
        isActive={isActive}
      />

      <table className={isActive ? "game-container" : "none"}>
        <tbody>{gameAreaTemplate()}</tbody>
      </table>
    </div>
  );
};

export default GameFieldArea;
