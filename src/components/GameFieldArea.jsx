import circleImg from "./../resources/images/circle.png";
import crossImg from "./../resources/images/cross.png";
import React, { useState } from "react";

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

    //Definde moves
    const [playerOne, setPlayerOne] = useState([]);
    const [playerTwo, setPlayerTwo] = useState([]);

    //Update Game Area every move
    const updateGame = (id) => {
        let closedFields = gameArea.map (i => i.player)

        for (let i = 1; i <= 7; i++) {
            const [posA, posB, posC] = gameWiner[i]; 
            const valueOne = closedFields[posA];
            const valueTwo = closedFields[posB];
            const valueThree = closedFields[posC];


            if (valueOne === 0 && valueTwo === 0 && valueThree === 0) {
                console.log("wygrywa gracz 1")
            } else if (valueOne === 1 && valueTwo === 1 && valueThree === 1) {
                console.log("wygrywa gracz 2")
            }
        }

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
        setGameArea(updateGameArea);
        updatePlayer(id);
    }

    const updatePlayer = (id) => {
    //Change player
        if (player === 0) {
            setPlayer(1);
            setPlayerOne(current => [...current, id]);
        } else {
            setPlayer(0);
            setPlayerTwo(current => [...current, id]);
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
        //reset Scores
        setPlayerOne([]);
        setPlayerTwo([]);
    }

    return (
        <div>
            <div className="game-container">
                {gameArea.map(field => (
                    <div key={field.id} onClick={() => {
                        if (field.src !== "") {
                            closeFunction(field.id);
                        } else {
                            updateGame(field.id)
                        }
                    }} className="game-item"><img className="filler" src={field.src} /></div>
                ))}
            </div>
            <button onClick={resetGame} className="button-item">Restart gry</button> 
        </div>
    )
    }

export default GameFieldArea;
