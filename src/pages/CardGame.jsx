import React, { useState } from "react";
import "../assets/css/card.css";
import Card from "../assets/components/Card";

function CardGame(props) {
  const [cardList, setCardList] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [result, setResult] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [pcCards, setPcCards] = useState([]);

  // 랜덤 숫자 부여 (중복X)
  const randomNumbers = (count) => {
    const numberSet = new Set();

    while (numberSet.size < count) {
      const num = Math.floor(Math.random() * 20) + 1;
      numberSet.add(num);
    }

    return Array.from(numberSet);
  };

  // 카드 생성
  const createCard = () => {
    const playerNums = randomNumbers(5);
    const pcNums = randomNumbers(2);
    // 초기화
    setCardList(playerNums);
    setPcCards(pcNums);
    setSelectedCards([]);
    setResult("");
    setIsGameOver(false);
  };

  // 리셋
  const deleteCard = () => {
    setCardList([]);
    setSelectedCards([]);
    setResult("");
    setIsGameOver(false);
  };

  // 카드 체크박스
  const cardCheck = (checked, i) => {
    const selectedCard = cardList[i];
    if (checked) {
      setSelectedCards([...selectedCards, selectedCard]);
    } else {
      setSelectedCards(selectedCards.filter((card) => card !== selectedCard));
    }
  };

  // 카드 선택
  const cardSelect = () => {
    console.log("사용자 선택 카드>>>", selectedCards);
    console.log("PC 카드>>>", pcCards);

    const playerSum = selectedCards.reduce((acc, cur) => acc + cur, 0);
    const pcSum = pcCards.reduce((acc, cur) => acc + cur, 0);

    let resultTxt = "";
    if (playerSum > pcSum) resultTxt = "플레이어 승!!!";
    else if (playerSum < pcSum) resultTxt = "PC 승!!!";
    else resultTxt = "무승부!!!";

    setResult(
      `플레이어의 합: ${playerSum} / PC의 합: ${pcSum} / 게임 결과 : ${resultTxt}`
    );
    setIsGameOver(true);
  };

  return (
    <div id="wrap">
      <main className="container">
        <section className="contents">
          <div className="cardWrap">
            {cardList?.map((cardNum, i) => (
              <Card
                key={i}
                randomNum={cardNum}
                idx={i + 1}
                checked={selectedCards.includes(cardNum)}
                onCheck={(checked) => cardCheck(checked, i)}
                disabled={
                  isGameOver ||
                  (!selectedCards.includes(cardNum) &&
                    selectedCards.length >= 2)
                }
              />
            ))}
          </div>
          <div className="btn-wrap">
            <button
              type="button"
              className="btn btn-com"
              disabled={cardList.length !== 0 && !isGameOver}
              onClick={createCard}
            >
              시작
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={cardSelect}
              disabled={isGameOver || selectedCards.length !== 2}
            >
              선택
            </button>
            <button type="button" className="btn btn-del" onClick={deleteCard}>
              리셋
            </button>
          </div>
          {result && <p className="result">{result}</p>}
        </section>
      </main>
    </div>
  );
}

export default CardGame;
