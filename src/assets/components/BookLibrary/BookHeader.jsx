import React from "react";
import { useState } from "react";

function BookHeader({
  name,
  loginChange,
  loginUser,
  selectUserName,
  showLoginResult,
}) {
  return (
    <>
      <div className="book-header">
        <label htmlFor="userLogin" className="blind">
          로그인 유저 선택
        </label>
        <select
          className="login"
          id="userLogin"
          value={selectUserName}
          onChange={loginChange}
        >
          <option value="">-- 유저 선택 --</option>
          {name?.map((user, i) => (
            <option key={i} value={user.name}>
              {user.name}
            </option>
          ))}
        </select>

        <button onClick={loginUser} type="button" className="btn-confirm btn">
          로그인
        </button>

        {showLoginResult && (
          <p className="login-name">
            <span>{selectUserName}</span>님
          </p>
        )}
      </div>
    </>
  );
}

export default BookHeader;
