import circleImg from "./../resources/images/circle.png";
import crossImg from "./../resources/images/cross.png";
import React, { useState } from "react";

const GameFieldArea = () => {

    //Definde fields
    const [gameArea, setGameArea] = useState([
        {id: 1, src: ""},
        {id: 2, src: ""},
        {id: 3, src: ""},
        {id: 4, src: ""},
        {id: 5, src: ""},
        {id: 6, src: ""},
        {id: 7, src: ""},
        {id: 8, src: ""},
        {id: 9, src: ""},
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
    //const [playerOne, setPlayerOne] = useState([]);
    //const [playerTwo, setPlayerTwo] = useState([]);


    //Update Game Area every move
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
        setGameArea(updateGameArea);
        updatePlayer(id);

        console.log("Kliknięte pole: " + id + " gracz: " + player)
    }

    const updatePlayer = (id) => {
    //Change player
        if (player === 0) {
            setPlayer(1);
            //setPlayerOne(...playerOne, id);
        } else {
            setPlayer(0);
            //setPlayerOne(...playerTwo, id);
        }
    }

    const closeFunction = (id) => {
        console.log("Pole " + id + " zostało już kliknięte!");
    }

    return (
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
    )
    }

export default GameFieldArea;
