import circleImg from "./../resources/images/circle.png";
import crossImg from "./../resources/images/cross.png";
import startImg from "./../resources/images/img.png";
import React, { useEffect, useState } from "react";

const GameFieldArea = () => {

    //Show and hide section
    const [isActive, setIsActive] = useState(false);
    const [isTextActive, setTextIsActive] = useState(false);

    //Definde fields
    const [gameArea, setGameArea] = useState(Array.from({length: 9}, (_, i) => ({id: i + 1, src: "", player: ""})));

    //win config
    const gameWiner = [
        [1, 2, 3], 
        [4, 5, 6], 
        [7, 8, 9],
        [1, 5, 9], 
        [3, 5, 7],
        [1, 4, 7],
        [2, 5, 8], 
        [3, 6, 9],
    ];

    //Set Player
    //1 player = 0
    //2 player = 1
    const [player, setPlayer] = useState(0);
    const [playerOneScores, setPlayerOneScores] = useState(0);
    const [playerTwoScores, setPlayerTwoScores] = useState(0);

    //Set Game Text
    const [gameText, setGameText] = useState(<img alt="img" className="img" src={startImg} />)

    //0 = not started
    //1 = game in progress
    //2 = game ended winner 1
    //3 = game ended winner 2
    //4 = game over
    const [gameStatus, setGameStatus] = useState(0);

    const startGame = () => {
        setIsActive(true)
        setGameStatus(1)
        setGameText("Gra w trakcie!")
    }

    const clickHandle = (field) => {
        if (field.src !== "") {
            closeFunction(field.id);
        } else {
            checkGameStatus(field.id)
        }
    }

    const checkGameStatus = (id) => {
        if (gameStatus === 1) {
            updateGame(id);         
        }
    }

    //Start/Update Game Area every move
    const updateGame = (id) => {
        const updateGameArea = gameArea.map(field => {
        if (field.id === id) {
            if (player === 0) {
                return {
                    ...field,
                    src: crossImg,
                    player: player,
                }
            } else {
                return {
                    ...field,
                    src: circleImg,
                    player: player,
                }
            }
        } 
        return field;
        });
        setGameArea(updateGameArea)
    }

    useEffect(() => {
        checkFieldStatus();
        checkGameOver();
        if (gameStatus !== 0) {
            changePlayerStatement();
        } // eslint-disable-next-line
    }, [gameArea]);

    //Check if someone win the game - set winner
    const checkFieldStatus = () => {
            let closedFields = gameArea.map (i => i.player)   
            for (let [a, b, c] of gameWiner) {
                const fieldA = a - 1;
                const fieldB = b - 1;
                const fieldC = c - 1;
    
                if (closedFields[fieldA] === 0 && closedFields[fieldB] === 0 && closedFields[fieldC] === 0) {
                    setGameStatus(2)
                    setGameText("Wygrywa gracz 1")
                    setPlayerOneScores(playerOneScores + 1)
                    break;
                } else if (closedFields[fieldA] === 1 && closedFields[fieldB] === 1 && closedFields[fieldC] === 1) {
                    setGameStatus(3)
                    setGameText("Wygrywa gracz 2")
                    setPlayerTwoScores(playerTwoScores + 1)
                    break;
                } 
            }
    }

    //Change player
    const changePlayerStatement = () => {
        if (player === 0) {
            setPlayer(1);
        } else {
            setPlayer(0);
        }
    }

    //Check each field is filled - Set game Over
    const checkGameOver = () => {
        const playerNotEmpty = gameArea.every(i => i.player !== "");
        if (playerNotEmpty) {
            setGameStatus(4)
            setGameText("Nie ma zwycięzcy, zrestartuj aby zagrać ponownie.")
        }
    }

    const closeFunction = (id) => {
        alert("Pole " + id + " zostało już kliknięte!");
    }

    //Reset game and show scores
    const resetGame = () => {
        changePlayerStatement()
        setGameStatus(1);
        setGameText("Wygrane rundy:")
        setTextIsActive(true)
        setGameArea(Array.from({length: 9}, (_, i) => ({id: i + 1, src: "", player: ""})));
    }

    return (
        <div>
            <div className="text"><p>{gameText}</p>
            <p className={isTextActive ? "small" : "none"}>Gracz pierwszy: {playerOneScores}</p>
            <p className={isTextActive ? "small" : "none"}>Gracz drugi: {playerTwoScores}</p></div>
            <div className={isActive ? "game-container" : "none"}>
                {gameArea.map(field => ( // eslint-disable-next-line
                    <div key={field.id} onClick={() => {clickHandle(field)}} className="game-item"><img className="filler" src={field.src} /></div>
                ))}
            </div>
            <button onClick={startGame} className={isActive ? "none" : "button-item"}>START</button> 
            <button onClick={resetGame} className={isActive ? "button-item padd" : "none"}>RESTART</button>
        </div>
    )
    }

export default GameFieldArea;
