import React from "react";
import "../../assets/css/library.css";
import BookHeader from "../../assets/components/BookLibrary/BookHeader";
import { useEffect } from "react";
import { useState } from "react";
import BookList from "../../assets/components/BookLibrary/BookList";
import BookInput from "../../assets/components/BookLibrary/BookInput";
import { useCallback } from "react";
import { useReducer } from "react";

function BookReducer(state, action) {
  switch (action.type) {
    case "rentBooks": {
      const { userName, booksToRent } = action.payload;
      return state.map((user) =>
        user.name === userName
          ? { ...user, book: [...user.book, ...booksToRent] }
          : user
      );
    }
    case "returnBooks": {
      const { userName, booksToReturn } = action.payload;
      return state.map((user) =>
        user.name === userName
          ? {
              ...user,
              book: user.book.filter((book) => !booksToReturn.includes(book)),
            }
          : user
      );
    }
    default:
      return state;
  }
}

function BookLayout() {
  const initUsers = [
    { name: "홍려경", book: ["책1", "책2", "책3"] },
    { name: "홍길동", book: ["책6", "책7"] },
  ];
  const initLibraryBooks = [
    "책1",
    "책2",
    "책3",
    "책4",
    "책5",
    "책6",
    "책7",
    "책8",
    "책9",
    "책10",
  ];
  const [libraryBook, setLibraryBook] = useState(initLibraryBooks);
  const [selectUserName, setSelectUserName] = useState("");
  const [showLoginResult, setShowLoginResult] = useState(false);
  const [selectedLibraryBooks, setSelectedLibraryBooks] = useState([]);
  const [selectedUserBooks, setSelectedUserBooks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [disabledBooks, setDisabledBooks] = useState([]);
  const [users, dispatch] = useReducer(BookReducer, initUsers);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const updated = users.reduce((acc, user) => acc.concat(user.book), []);
    setDisabledBooks(updated);
  }, [users]);

  const loginChange = useCallback((e) => {
    setSelectUserName(e.target.value);
    setShowLoginResult(false);
    setLoggedInUser(null);
  }, []);

  const loginUser = useCallback(() => {
    if (loggedInUser) {
      setLoggedInUser(null);
      setShowLoginResult(false);
      setSelectedUserBooks([]);
      setSelectedLibraryBooks([]);
    } else {
      if (!selectUserName) return alert("로그인할 사람을 선택해주세요.");
      const user = users.find((u) => u.name === selectUserName);
      setLoggedInUser(user);
      setShowLoginResult(true);
    }
    setSelectUserName("");
  }, [
    loggedInUser,
    selectUserName,
    users,
    setLoggedInUser,
    setShowLoginResult,
    setSelectedUserBooks,
    setSelectedLibraryBooks,
  ]);

  const handleLibraryCheckbox = (book) => {
    setSelectedLibraryBooks((prev) =>
      prev.includes(book) ? prev.filter((x) => x !== book) : [...prev, book]
    );
  };

  const handleUserCheckbox = (book) => {
    setSelectedUserBooks((prev) =>
      prev.includes(book) ? prev.filter((x) => x !== book) : [...prev, book]
    );
  };

  const rentBooks = () => {
    if (!loggedInUser) return alert("유저를 먼저 로그인 해주세요.");
    if (selectedLibraryBooks.length === 0)
      return alert("대여할 도서를 선택하세요");

    dispatch({
      type: "rentBooks",
      payload: {
        userName: loggedInUser.name,
        booksToRent: selectedLibraryBooks,
      },
    });
    setSelectedLibraryBooks([]);
  };

  const returnBooks = () => {
    if (!loggedInUser) return alert("유저를 먼저 로그인 해주세요.");
    if (selectedUserBooks.length === 0)
      return alert("반납할 도서를 선택하세요");

    dispatch({
      type: "returnBooks",
      payload: {
        userName: loggedInUser.name,
        booksToReturn: selectedUserBooks,
      },
    });
    setSelectedUserBooks([]);
  };

  const addBooks = useCallback(() => {
    if (!inputValue.trim()) return alert("내용을 입력하세요.");
    if (libraryBook.includes(inputValue)) {
      alert("이미 등록된 도서 입니다.");
      setInputValue("");
      return;
    }
    setLibraryBook((prev) => [...prev, inputValue]);
    setInputValue("");
  }, [inputValue, libraryBook]);

  const delBooks = () => {
    if (selectedLibraryBooks.length === 0)
      return alert("삭제할 도서를 선택하세요");
    setLibraryBook((prev) =>
      prev.filter((book) => !selectedLibraryBooks.includes(book))
    );
    setSelectedLibraryBooks([]);
  };

  const rentedBooks = loggedInUser ? loggedInUser.book : [];

  return (
    <main className="container">
      <section className="contents">
        <h1>도서 관리 프로그램</h1>
        <BookHeader
          name={users}
          loginChange={loginChange}
          loginUser={loginUser}
          loggedInUser={loggedInUser}
          showLoginResult={showLoginResult}
          selectUserName={selectUserName}
        />
        {showLoginResult && (
          <div className="box">
            <div className="box-top">
              <strong>{loggedInUser?.name}님이 대여한 도서 목록</strong>
              <button
                type="button"
                className="btn btn-del"
                onClick={returnBooks}
              >
                반납
              </button>
            </div>
            <BookList
              books={rentedBooks}
              selectedBooks={selectedUserBooks}
              onCheck={handleUserCheckbox}
              type="user"
            />
          </div>
        )}

        <div className="box">
          <div className="box-top">
            <strong>전체 도서 목록</strong>
            <div className="btn-wrap">
              <BookInput
                inputValue={inputValue}
                setInputValue={setInputValue}
                addBooks={addBooks}
              />

              <button type="button" className="btn btn-del" onClick={delBooks}>
                삭제
              </button>
              <button
                type="button"
                className="btn btn-confirm"
                onClick={rentBooks}
              >
                대여
              </button>
            </div>
          </div>
          <BookList
            books={libraryBook}
            selectedBooks={selectedLibraryBooks}
            onCheck={handleLibraryCheckbox}
            type="library"
            disabledBooks={disabledBooks}
          />
        </div>
      </section>
    </main>
  );
}

export default BookLayout;
