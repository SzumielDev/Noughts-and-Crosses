import React, { useEffect, useState } from "react";
import skin01 from "./../resources/images/butterfly-lore.png";
import skin02 from "./../resources/images/doppler-phase-1.png";
import skin03 from "./../resources/images/karambit-lore.png";
import skin04 from "./../resources/images/m4.png";

const OpenCases = () => {
    const skins = [1, 2, 3, 4];
    const probabilities = [0.01, 0.01, 0.01, 0.97];
    const [isActive, setIsActive] = useState(false);

    const [randomSkinDrop, setRandomSkinDrop] = useState();
    const [drop, setDrop] = useState();
    const [dropImg, setDropImg] = useState();

    const randomDrop = () => {
        setIsActive(true)
        const randomNumber = Math.random();
        let i = 0;
        let sum = probabilities[i];

        while (sum < randomNumber) {
            i++;
            sum += probabilities[i];
        }

        setRandomSkinDrop(skins[i]);
    }

    useEffect(() => {
        showDrop()
    }, [randomSkinDrop]);

    const showDrop = () => {
        if (randomSkinDrop === 1) {
            setDrop("Butterfly Lore")
            setDropImg(skin01)
        } else if (randomSkinDrop === 2) {
            setDrop("Doppler Phase 1")
            setDropImg(skin02)
        } else if (randomSkinDrop === 3) {
            setDrop("Karambit Lore")
            setDropImg(skin03)
        } else {
            setDrop("M4 XX")
            setDropImg(skin04)
        }
    }

    return (
        <div>
            <div className={isActive ? "none" : "dropArea"}>
                <img alt="img" src={skin01}></img>
                <img alt="img" src={skin02}></img>
                <img alt="img" src={skin03}></img>
                <img alt="img" src={skin04}></img>
            </div>
            <div className={isActive ? "dropArea" : "none"}>
                <p>Twój drop: {drop}</p>
                <img className="anim" alt="img" src={dropImg}></img>
            </div>
            <div><button onClick={randomDrop}>OPEN CASE</button></div>
        </div>
    )
}

export default OpenCases;
