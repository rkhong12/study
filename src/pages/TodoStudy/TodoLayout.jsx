import React, { useReducer, useCallback, useState } from "react";
import "../../assets/css/todo.css";
import TodoHeader from "./components/TodoHeader";
import TodoInput from "./components/TodoInput";
import TodoButton from "./components/TodoButton";
import TodoListBody from "./components/TodoListBody";
function todoReducer(state, action) {
  let updatedTodos, doneCount, todoCount, percent, isAllChecked, target;

  switch (action.type) {
    case "todoAdd":
      updatedTodos = [
        ...state.todos,
        { text: action.payload, done: false, checked: false },
      ];
      todoCount = state.todoCount + 1;
      percent =
        Math.round((state.doneCount / (todoCount + state.doneCount)) * 100) ||
        0;
      return { ...state, todos: updatedTodos, todoCount, percent };

    case "todoDelete":
      updatedTodos = state.todos.filter((_, i) => i !== action.payload);
      target = state.todos[action.payload];
      doneCount = target.done ? state.doneCount - 1 : state.doneCount;
      todoCount = target.done ? state.todoCount : state.todoCount - 1;
      percent = Math.round((doneCount / (doneCount + todoCount)) * 100) || 0;
      return { ...state, todos: updatedTodos, doneCount, todoCount, percent };

    case "isCheck":
      updatedTodos = state.todos.map((todo, i) =>
        i === action.payload ? { ...todo, checked: !todo.checked } : todo
      );
      return { ...state, todos: updatedTodos };

    case "todoDone":
      updatedTodos = state.todos.map((todo, i) =>
        i === action.payload ? { ...todo, done: true } : todo
      );
      todoCount = state.todoCount - 1;
      doneCount = state.doneCount + 1;
      percent = Math.round((doneCount / (doneCount + todoCount)) * 100) || 0;
      return { ...state, todos: updatedTodos, todoCount, doneCount, percent };

    case "doneAll":
      updatedTodos = state.todos.map((todo) =>
        todo.checked && !todo.done
          ? { ...todo, done: true, checked: false }
          : todo
      );
      doneCount = updatedTodos.filter((todo) => todo.done).length;
      todoCount = updatedTodos.length - doneCount;
      percent = Math.round((doneCount / (doneCount + todoCount)) * 100) || 0;
      return { ...state, todos: updatedTodos, doneCount, todoCount, percent };

    case "delAll":
      updatedTodos = state.todos.filter((todo) => !todo.checked);
      doneCount = updatedTodos.filter((todo) => todo.done).length;
      todoCount = updatedTodos.length - doneCount;
      percent = Math.round((doneCount / (doneCount + todoCount)) * 100) || 0;
      return { ...state, todos: updatedTodos, doneCount, todoCount, percent };

    case "chkAll":
      isAllChecked = state.todos.every((todo) => todo.checked);
      updatedTodos = state.todos.map((todo) => ({
        ...todo,
        checked: !isAllChecked,
      }));
      return {
        ...state,
        todos: updatedTodos,
        chkBtnTxt: isAllChecked ? "모두 선택" : "모두 해제",
      };

    default:
      return state;
  }
}

const init = {
  todos: [],
  todoCount: 0,
  doneCount: 0,
  percent: 0,
  chkBtnTxt: "모두 선택",
};

function TodoLayout() {
  const [state, dispatch] = useReducer(todoReducer, init);
  const [inputValue, setInputValue] = useState("");

  const addTodo = useCallback(() => {
    if (!inputValue.trim()) return alert("내용을 입력하세요.");
    dispatch({ type: "todoAdd", payload: inputValue });
    setInputValue("");
  }, [inputValue]);

  return (
    <div id="wrap">
      <main className="container">
        <TodoHeader state={state} />
        <TodoInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          addTodo={addTodo}
        />
        <TodoButton state={state} dispatch={dispatch} />
        <TodoListBody state={state} dispatch={dispatch} />
      </main>
    </div>
  );
}

export default TodoLayout;
