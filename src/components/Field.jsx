import React, { useState } from "react";

const Field = (props) => {

  return (
    <div className="game-item">
      <img className={`game-item-img`} src={props.src} />
    </div>
  );
};

export default Field;
