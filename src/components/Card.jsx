import React from "react";
function Card({ randomNum, idx, onCheck, disabled, checked }) {
  return (
    <>
      <div className="cardItem">
        <input
          className="cardIpt"
          type="checkbox"
          name={`card${idx}`}
          id={`card${idx}`}
          checked={checked}
          onChange={(e) => onCheck(e.target.checked)}
          disabled={disabled}
        />
        <label htmlFor={`card${idx}`} className="cardLabel">
          <p className="cardNum">{randomNum}</p>
        </label>
      </div>
    </>
  );
}

export default Card;
