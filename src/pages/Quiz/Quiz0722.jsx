import React, { useRef } from "react";
import { useState } from "react";

function Quiz0722(props) {
  const iptId = useRef(1);
  const [iptValue, setIptValue] = useState("");
  const [iptList, setIptList] = useState([]);
  const add = () => {
    if (!iptValue.trim()) return alert("내용을 입력하세요.");
    setIptList((prev) => [...prev, { id: iptId.current++, text: iptValue }]);
  };
  return (
    <>
      <div>
        <input
          type="text"
          name="text"
          value={iptValue}
          onChange={(e) => setIptValue(e.target.value)}
        />
        <button type="button" onClick={add}>
          입력
        </button>
      </div>
      <div>
        {iptList?.map((e) => (
          <p key={e.id}>
            {e.id}.{e.text}
          </p>
        ))}
      </div>
    </>
  );
}

export default Quiz0722;
