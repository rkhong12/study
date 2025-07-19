import React from "react";

function TodoInput({ inputValue, setInputValue, addTodo }) {
  return (
    <div className="todo-top-container">
      <input
        type="text"
        className="todo-input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="할 일을 입력하세요"
      />
      <button type="button" className="todo-btn" onClick={addTodo}>
        등록
      </button>
    </div>
  );
}

export default React.memo(TodoInput);
