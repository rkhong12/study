import React from "react";

function TodoButton({ state, dispatch }) {
  return (
    <div className="todo-list-btn">
      <button
        type="button"
        className="btn btn-all-select"
        onClick={() => dispatch({ type: "chkAll" })}
      >
        {state.chkBtnTxt}
      </button>
      <button
        type="button"
        className="btn btn-confirm"
        onClick={() => {
          const checked = state.todos.filter((todo) => todo.checked);
          if (checked.length === 0) return alert("완료할 항목을 선택하세요.");
          dispatch({ type: "doneAll" });
        }}
      >
        일괄 완료
      </button>
      <button
        type="button"
        className="btn btn-del"
        onClick={() => {
          const checked = state.todos.filter((todo) => todo.checked);
          if (checked.length === 0) return alert("삭제할 항목을 선택하세요.");
          dispatch({ type: "delAll" });
        }}
      >
        일괄 삭제
      </button>
    </div>
  );
}

export default TodoButton;
