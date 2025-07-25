import React from "react";

function LottoBtn({ createLotto, userLottto, compareLottto }) {
  return (
    <>
      <div className="btn-wrap">
        <button type="button" className="btn btn-confirm" onClick={createLotto}>
          로또 생성
        </button>
        <button type="button" className="btn btn-confirm" onClick={userLottto}>
          유저 로또
        </button>
        <button type="button" className="btn btn-add" onClick={compareLottto}>
          비교
        </button>
      </div>
    </>
  );
}

export default React.memo(LottoBtn);
