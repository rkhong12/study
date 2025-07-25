import React from "react";

function BookInput({ inputValue, setInputValue, addBooks }) {
  return (
    <>
      <input
        className="ipt-txt"
        type="text"
        name="bookAdd"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        type="button"
        className="btn btn-add"
        onClick={addBooks}
        disabled={!inputValue.trim()}
      >
        추가
      </button>
    </>
  );
}

export default React.memo(BookInput);
