import React, { useState } from "react";
import { SumContext } from "./SumContext";
import SubComponent from "./SubComponent";

function MainLayout() {
  const [iptNum1, setIptNum1] = useState("");
  const [iptNum2, setIptNum2] = useState("");
  const [sum, setSum] = useState(0);

  const calBtn = () => {
    setSum(Number(iptNum1) + Number(iptNum2));
  };

  return (
    <SumContext.Provider
      value={{
        iptNum1,
        setIptNum1,
        iptNum2,
        setIptNum2,
        calBtn,
      }}
    >
      <div>
        <SubComponent />
        <p>합: {sum}</p>
      </div>
    </SumContext.Provider>
  );
}

export default MainLayout;
