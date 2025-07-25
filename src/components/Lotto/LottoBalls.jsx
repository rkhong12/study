import React from "react";

function LottoBalls({ numbers, type, matched }) {
  return (
    <div className="ball-wrap">
      {numbers?.map((item, idx) => {
        const ballId = `${type}-${idx}`;
        const value = type === "winningNumber" ? item.num : item;
        const isMatched = (matched || []).includes(value);

        return (
          <div
            key={ballId}
            className={`ball ${isMatched ? "matched" : ""}`}
            style={
              type === "winningNumber" ? { backgroundColor: item.color } : {}
            }
          >
            {value}
          </div>
        );
      })}
    </div>
  );
}

export default LottoBalls;
