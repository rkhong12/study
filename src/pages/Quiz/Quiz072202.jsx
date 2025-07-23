import React, { useEffect } from "react";
import { useState } from "react";

function Quiz072202(props) {
  const [iptNum, setIptNum] = useState(0);
  const [numList, setNumList] = useState([]);
  const [result, setResult] = useState(0);
  useEffect(() => {
    console.log("실행");

    let sum = numList.reduce((acc, cur) => acc + Number(cur), 0);
    setResult(sum);
  }, [numList]);

  const add = () => {
    if (!iptNum.trim() || Number(iptNum) < 1)
      return alert("숫자를 입력하세요.");
    setNumList((prev) => [...prev, iptNum]);
  };
  return (
    <>
      <div>
        <input
          type="number"
          name="iptNum"
          value={iptNum}
          onChange={(e) => setIptNum(e.target.value)}
        />
        <button type="button" onClick={add}>
          입력
        </button>
      </div>
      <div>
        {numList?.map((num, i) => (
          <p key={i}>{num}</p>
        ))}
      </div>
      <p>합계 : {result}</p>
    </>
  );
}

export default Quiz072202;
