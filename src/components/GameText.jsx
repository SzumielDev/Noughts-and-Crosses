import React from "react";
import crossandcircleimage from "./../resources/images/crossandcircleimage.png";

const GameText = ({ headerText, isActive }) => {
  return (
    <div>
      <div className={isActive ? "none" : "container-logo animation"}>
        <img src={crossandcircleimage} />
      </div>
      <div className="container">
        <p>{headerText}</p>
      </div>
    </div>
  );
};

export default GameText;
