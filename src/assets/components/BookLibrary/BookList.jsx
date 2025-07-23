import React from "react";

function BookList({ books, selectedBooks, onCheck, type, disabledBooks = [] }) {
  return (
    <ul className="book-list">
      {books.map((book, idx) => {
        const isDisabled = disabledBooks.includes(book);
        const inputId = `${type}-${idx}`;

        return (
          <li key={idx} className={isDisabled ? "disabled" : ""}>
            <input
              type="checkbox"
              id={inputId}
              checked={selectedBooks.includes(book)}
              onChange={() => onCheck(book)}
              disabled={isDisabled}
            />
            <label htmlFor={inputId}>{book}</label>
          </li>
        );
      })}
    </ul>
  );
}

export default BookList;
