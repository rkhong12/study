import React from "react";
import "../../assets/css/common.css";
import "../../assets/css/lotto.css";
import LottoBtn from "../../components/Lotto/LottoBtn";
import LottoBalls from "../../components/Lotto/LottoBalls";
import { useState } from "react";
import { useCallback } from "react";

function LottoLayout(props) {
  const [winningNumbers, setWinningNumbers] = useState([]);
  const [bonusNumber, setBonusNumber] = useState(null);
  const [userNumbers, setUserNumbers] = useState([]);
  const [matchedNumbers, setMatchedNumbers] = useState([]);
  const [ranks, setRanks] = useState([]);

  const getRandomNumbers = (count, exclude = []) => {
    const balls = Array.from({ length: 45 }, (_, i) => i + 1).filter(
      (n) => !exclude.includes(n)
    );

    for (let i = balls.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [balls[i], balls[j]] = [balls[j], balls[i]];
    }
    return balls.slice(0, count).sort((a, b) => a - b);
  };

  const randColor = () => {
    const colors = [];
    while (colors.length < 3) {
      const rand = Math.floor(Math.random() * 256).toString(16);
      colors.push(rand.length === 1 ? "0" + rand : rand);
    }
    return "#" + colors.join("");
  };

  const createLotto = useCallback(() => {
    const nums = getRandomNumbers(6).map((n) => ({
      num: n,
      color: randColor(),
    }));
    setWinningNumbers(nums);

    const bonus = getRandomNumbers(
      1,
      nums.map((n) => n.num)
    )[0];
    setBonusNumber(bonus);
  }, []);

  const userLottto = useCallback(() => {
    setRanks([]);
    setMatchedNumbers([]);
    const users = [];
    for (let i = 0; i < 5; i++) {
      users.push(getRandomNumbers(6));
    }
    setUserNumbers(users);
  }, []);

  const getLottoRank = (matchCount, isBonus) => {
    if (matchCount === 6) return "🎉 1등 🎉";
    if (matchCount === 5 && isBonus) return "🎉 2등 🎉";
    if (matchCount === 5) return "🎉 3등 🎉";
    if (matchCount === 4) return "🎉 4등 🎉";
    if (matchCount === 3) return "🎉 5등 🎉";
    return "꽝";
  };

  const compareLottto = useCallback(() => {
    if (winningNumbers.length === 0 || bonusNumber === null) return;

    const winNums = winningNumbers.map((item) => item.num);
    const allMatched = [];
    const allRanks = [];

    userNumbers.forEach((nums) => {
      const matched = nums.filter((n) => winNums.includes(n));
      const isBonus = nums.includes(bonusNumber);
      const rank = getLottoRank(matched.length, isBonus);

      allMatched.push(matched);
      allRanks.push(rank);
    });

    setMatchedNumbers(allMatched);
    setRanks(allRanks);
  }, [winningNumbers, bonusNumber, userNumbers]);
  return (
    <>
      <main className="container">
        <section className="contents">
          <h1>LOTTO</h1>
          <div className="lotto-top">
            <LottoBtn
              createLotto={createLotto}
              userLottto={userLottto}
              compareLottto={compareLottto}
            />
          </div>
          {winningNumbers.length > 0 && (
            <div className="box">
              <div className="box-top">
                <strong>당첨 로또 번호</strong>
              </div>
              <div className="ball-box winning-numbers">
                <LottoBalls numbers={winningNumbers} type="winningNumber" />
                <div className="bonus-ball">
                  <strong>➕</strong>
                  <div className="ball ">{bonusNumber}</div>
                </div>
              </div>
            </div>
          )}
          {userNumbers.length > 0 && (
            <div className="box">
              <div className="box-top">
                <strong>유저 로또 번호</strong>
              </div>
              <div className="ball-box ">
                {userNumbers.map((nums, idx) => (
                  <div
                    className={`user-numbers ${ranks[idx] ? "jc-sb" : ""}`}
                    key={idx}
                  >
                    <LottoBalls
                      numbers={nums}
                      matched={matchedNumbers[idx] || []}
                      type="userNumber"
                    />
                    {ranks[idx] && <div className="result">{ranks[idx]}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default LottoLayout;
