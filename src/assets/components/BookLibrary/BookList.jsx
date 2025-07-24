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
            <label htmlFor={inputId}>
              {book}
              {isDisabled && <span className="rented"> (대여 중)</span>}
            </label>
          </li>
        );
      })}
    </ul>
  );
}

export default BookList;
