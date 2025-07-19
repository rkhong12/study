import React, { useContext } from "react";
import { SumContext } from "./SumContext";

function SubComponent() {
  const { iptNum1, setIptNum1, iptNum2, setIptNum2, calBtn } =
    useContext(SumContext);

  return (
    <div>
      <input
        className="ipt"
        type="number"
        value={iptNum1}
        onChange={(e) => setIptNum1(e.target.value)}
      />
      <input
        className="ipt"
        type="number"
        value={iptNum2}
        onChange={(e) => setIptNum2(e.target.value)}
      />
      <button onClick={calBtn} className="btn btn-primary">
        계산하기
      </button>
    </div>
  );
}

export default SubComponent;
