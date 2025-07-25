import React from "react";

function LottoBalls({ numbers, type, matched }) {
  return (
    <>
      <div className="ball-wrap">
        {numbers?.map((item, idx) => {
          const value = typeof item === "object" ? item.num : item;
          const style =
            typeof item === "object" && type === "winningNumber"
              ? { backgroundColor: item.color }
              : {};
          const isMatched = (matched || []).includes(value);

          return (
            <div
              key={idx}
              className={`ball ${isMatched ? "matched" : ""}`}
              style={style}
            >
              {value}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default LottoBalls;
