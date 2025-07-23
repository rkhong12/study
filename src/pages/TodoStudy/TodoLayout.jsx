import React, { useReducer, useCallback, useState } from "react";
import "../../assets/css/todo.css";
import TodoHeader from "./components/TodoHeader";
import TodoInput from "./components/TodoInput";
import TodoButton from "./components/TodoButton";
import TodoListBody from "./components/TodoListBody";
import { useEffect } from "react";
function todoReducer(state, action) {
  let isAllChecked;

  switch (action.type) {
    case "todoAdd":
      return [...state, { text: action.payload, done: false, checked: false }];
    case "todoDelete":
      return state.filter((_, i) => i !== action.payload);
    case "isCheck":
      return state.map((todo, i) =>
        i === action.payload ? { ...todo, checked: !todo.checked } : todo
      );
    case "todoDone":
      return state.map((todo, i) =>
        i === action.payload ? { ...todo, done: true } : todo
      );
    case "doneAll":
      return state.map((todo) =>
        todo.checked && !todo.done
          ? { ...todo, done: true, checked: false }
          : todo
      );
    case "delAll":
      return state.filter((todo) => !todo.checked);
    case "chkAll":
      isAllChecked = state.every((todo) => todo.checked);
      return state.map((todo) => ({ ...todo, checked: !isAllChecked }));
    default:
      return state;
  }
}

function TodoLayout() {
  const [inputValue, setInputValue] = useState("");
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [todoCount, setTodoCount] = useState(0);
  const [doneCount, setDoneCount] = useState(0);
  const [percent, setPercent] = useState(0);
  const [chkBtnTxt, setChkBtnTxt] = useState("모두 선택");

  useEffect(() => {
    const done = todos.filter((t) => t.done).length;
    const todo = todos.length - done;
    const total = done + todo;
    const isAllChecked = todos.length > 0 && todos.every((t) => t.checked);

    setDoneCount(done);
    setTodoCount(todo);
    setPercent(total === 0 ? 0 : Math.round((done / total) * 100));
    setChkBtnTxt(isAllChecked ? "모두 해제" : "모두 선택");
  }, [todos]);

  const addTodo = useCallback(() => {
    if (!inputValue.trim()) return alert("내용을 입력하세요.");
    dispatch({ type: "todoAdd", payload: inputValue });
    setInputValue("");
  }, [inputValue]);

  return (
    <div id="wrap">
      <main className="container">
        <TodoHeader
          todoCount={todoCount}
          doneCount={doneCount}
          percent={percent}
        />
        <TodoInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          addTodo={addTodo}
        />
        <TodoButton chkBtnTxt={chkBtnTxt} dispatch={dispatch} todos={todos} />
        <TodoListBody todos={todos} dispatch={dispatch} />
      </main>
    </div>
  );
}

export default TodoLayout;
