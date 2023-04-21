import circleImg from "./../resources/images/circle.png";
import crossImg from "./../resources/images/cross.png";
import React, { useEffect, useState } from "react";

const GameFieldArea = () => {

    //Definde fields
    const [gameArea, setGameArea] = useState([
        {id: 1, src: "", player: ""},
        {id: 2, src: "", player: ""},
        {id: 3, src: "", player: ""},
        {id: 4, src: "", player: ""},
        {id: 5, src: "", player: ""},
        {id: 6, src: "", player: ""},
        {id: 7, src: "", player: ""},
        {id: 8, src: "", player: ""},
        {id: 9, src: "", player: ""},
    ]);

    //win status
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

    //Set Game Status
    //0 = not started
    //1 = game in progress
    //2 = game ended winner 1
    //3 = game ended winner 2
    //4 = game over
    const [gameStatus, setGameStatus] = useState(1);

    const checkGameStatus = (id) => {
        if (gameStatus === 1) {
            console.log("Gra w toku")
            updateGame(id);           
        } else {
            console.log("Gra została zakończona")
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

    useEffect((id) => {
        checkFieldStatus(id)
    }, [gameArea]);

    //Check if someone win the game
    const checkFieldStatus = (id) => {
            let closedFields = gameArea.map (i => i.player)
            console.log(closedFields)
    
            for (let [a, b, c] of gameWiner) {
                const fieldA = a - 1;
                const fieldB = b - 1;
                const fieldC = c - 1;
    
                if (closedFields[fieldA] === 0 && closedFields[fieldB] === 0 && closedFields[fieldC] === 0) {
                    setGameStatus(2)
                    break;
                } else if (closedFields[fieldA] === 1 && closedFields[fieldB] === 1 && closedFields[fieldC] === 1) {
                    setGameStatus(3)
                    break;
                } 
            }
            checkWinnerStatus();
    }

    const checkWinnerStatus = () => {  
        if (gameStatus === 2) {
            console.log("Wygrywa gracz 1")
        } else if (gameStatus === 3) {
            console.log("Wygrywa gracz 2")
        } else if ( gameStatus === 4) {
            console.log("Koniec gry, nie ma wygranych. Kliknij restart aby zagrać ponownie.")
        } else {
            updatePlayer();
        }
    }

    const updatePlayer = () => {
    //Change player
        if (player === 0) {
            setPlayer(1);
        } else {
            setPlayer(0);
        }
        checkGameOver();
    }

    //Check that each field is filled
    const checkGameOver = () => {
        const playerNotEmpty = gameArea.every((i) => !!i.player);
        if (playerNotEmpty) {
            setGameStatus(4)
        }
    }

    const closeFunction = (id) => {
        console.log("Pole " + id + " zostało już kliknięte!");
    }

    const resetGame = () => {
        //reset player
        setPlayer(0);
        //reset gameArea
        const resetGameArea = gameArea.map(i => {
            return {...i, src: '', player: ''};
        });
        setGameArea(resetGameArea);
        setGameStatus(1);
    }

    return (
        <div>
            <div className="game-container">
                {gameArea.map(field => (
                    <div key={field.id} onClick={() => {
                        if (field.src !== "") {
                            closeFunction(field.id);
                        } else {
                            checkGameStatus(field.id)
                        }
                    }} className="game-item"><img className="filler" src={field.src} /></div>
                ))}
            </div>
            <button onClick={resetGame} className="button-item">Restart gry</button> 
        </div>
    )
    }

export default GameFieldArea;
