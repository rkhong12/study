import React from "react";
import "../assets/css/todo.css";
import { useState } from "react";

function TodoList(props) {
  const [inputValue, setInputValue] = useState("");
  const [Todo, setTodo] = useState([]);
  const [todoCount, setTodoCount] = useState(0);
  const [doneCount, setDoneCount] = useState(0);
  const [percent, setPercent] = useState(0);
  const [chkBtnTxt, setChkBtnTxt] = useState("모두 선택");

  const addTodo = () => {
    if (!inputValue.trim()) return alert("내용을 입력하세요.");
    setTodo((todo) => [
      ...todo,
      { text: inputValue, done: false, checked: false },
    ]);

    setTodoCount((count) => count + 1);
    setInputValue("");
  };

  const todoDone = (i) => {
    setTodo((todo) =>
      todo.map((item, idx) => (idx === i ? { ...item, done: true } : item))
    );
    const newTodoCount = todoCount - 1;
    const newDoneCount = doneCount + 1;
    const total = newDoneCount + newTodoCount;
    setTodoCount(newTodoCount);
    setDoneCount(newDoneCount);
    setPercent(total === 0 ? 0 : Math.round((newDoneCount / total) * 100));
  };

  const todoDelete = (i) => {
    const isDone = Todo[i].done;
    const NewTodoLength = Todo.length - 1;
    setTodo((todo) => todo.filter((item, idx) => idx !== i));
    if (isDone) {
      console.log("완료된 항목 삭제");
      const newDoneCount = doneCount - 1;
      setDoneCount(newDoneCount);
      const total = newDoneCount + todoCount;
      setPercent(total === 0 ? 0 : Math.round((newDoneCount / total) * 100));
    } else {
      console.log("할 일 항목 삭제");
      const newTodoCount = todoCount - 1;
      setTodoCount(newTodoCount);
      const total = newTodoCount + doneCount;
      setPercent(total === 0 ? 0 : Math.round((doneCount / total) * 100));
    }
    if (NewTodoLength === 0) setPercent(0);
  };

  const doneAll = () => {
    const checkedBoxes = Todo.filter((item) => item.checked);
    if (checkedBoxes.length === 0) return alert("완료 할 일을 선택하세요.");

    const prevDoneCount = checkedBoxes.filter((item) => item.done).length;
    setTodo((todo) =>
      todo.map((item) =>
        item.checked ? { ...item, done: true, checked: false } : item
      )
    );

    const chkDoneCount = checkedBoxes.length - prevDoneCount;
    const newTodoCount = todoCount - chkDoneCount;
    const newDoneCount = doneCount + chkDoneCount;
    const total = newDoneCount + newTodoCount;
    setTodoCount(newTodoCount);
    setDoneCount(newDoneCount);
    setPercent(total === 0 ? 0 : Math.round((newDoneCount / total) * 100));
  };

  const delAll = () => {
    const checkedBoxes = Todo.filter((item) => item.checked);
    if (checkedBoxes.length === 0) return alert("삭제할 할 일을 선택하세요.");

    const updatedTodo = Todo.filter((item) => !item.checked);

    const deletedDoneCount = checkedBoxes.filter((item) => item.done).length;
    const deletedTodoCount = checkedBoxes.length - deletedDoneCount;

    const newDoneCount = doneCount - deletedDoneCount;
    const newTodoCount = todoCount - deletedTodoCount;
    const total = newDoneCount + newTodoCount;

    setTodo(updatedTodo);
    setDoneCount(newDoneCount);
    setTodoCount(newTodoCount);
    setPercent(total === 0 ? 0 : Math.round((newDoneCount / total) * 100));
  };

  const chkAll = (e) => {
    const isAllChecked = Todo.every((item) => item.checked);
    setChkBtnTxt(!isAllChecked ? "모두 해제" : "모두 선택");
    setTodo((todo) =>
      todo.map((item) => ({ ...item, checked: !isAllChecked }))
    );
  };

  const handlerChk = (idx) => {
    setTodo((todo) =>
      todo.map((item, i) =>
        i === idx ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <>
      <div id="wrap">
        <main className="container">
          <header>
            <h1>Todo List</h1>
          </header>
          <section className="contents">
            <ul className="todo-list-result">
              <li>
                할 일 : <span id="resultTodo">{todoCount}</span>건
              </li>
              <li>
                완료 : <span id="resultDone">{doneCount}</span>건
              </li>
              <li>
                달성률 : <span id="resultPercent">{percent}</span>%
              </li>
            </ul>
            <div className="todo-top-container">
              <input
                type="text"
                className="todo-input"
                name="ipt"
                id="todoIpt"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button type="button" className="todo-btn" onClick={addTodo}>
                등록
              </button>
            </div>
            <div className="todo-list-btn">
              <button
                type="button"
                className="btn btn-all-select"
                onClick={(e) => chkAll(e)}
              >
                {chkBtnTxt}
              </button>
              <button
                type="button"
                className="btn btn-confirm"
                onClick={doneAll}
              >
                일괄 완료
              </button>
              <button type="button" className="btn btn-del" onClick={delAll}>
                일괄 삭제
              </button>
            </div>
            <ul className="todo-list-container">
              {Todo.length === 0 ? (
                <li id="empty">등록된 할 일이 없습니다.</li>
              ) : (
                Todo.map((todoTxt, i) => (
                  <li key={i} className={todoTxt.done ? "done" : ""}>
                    <input
                      type="checkbox"
                      name="todoChk"
                      id={`todoChk${i}`}
                      onChange={() => handlerChk(i)}
                      checked={todoTxt.checked}
                    />
                    <label htmlFor={`todoChk${i}`}>
                      <p className="todo_txt">{todoTxt.text}</p>
                      <div className="list-btn-wrap">
                        <button
                          type="button"
                          className="btn btn-confirm"
                          onClick={() => todoDone(i)}
                          disabled={todoTxt.done}
                        >
                          완료
                        </button>
                        <button
                          type="button"
                          className="btn btn-del"
                          onClick={() => todoDelete(i)}
                        >
                          삭제
                        </button>
                      </div>
                    </label>
                  </li>
                ))
              )}
            </ul>
          </section>
        </main>
      </div>
    </>
  );
}

export default TodoList;
