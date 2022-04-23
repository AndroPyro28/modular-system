import React, { useEffect, useState } from "react";

function SingleSelect({ currentQuestionNumber, questionaires, setAnswer, answer }) {
  const [choices, setChoices] = useState([]);

  useEffect(() => {
    let iterator = 0, randomIndex;

    let choicesArray = [];
    let shuffledArray = [];

    choicesArray.push(questionaires[currentQuestionNumber]?.choice1)
    choicesArray.push(questionaires[currentQuestionNumber]?.choice2)
    choicesArray.push(questionaires[currentQuestionNumber]?.choice3)
    choicesArray.push(questionaires[currentQuestionNumber]?.dedicatedAnswer);
    
    while(iterator < choicesArray.length) {
      randomIndex = Math.floor(Math.random() * choicesArray.length);

      while(shuffledArray[randomIndex] != null) {
        randomIndex = Math.floor(Math.random() * choicesArray.length);
      }
      shuffledArray[randomIndex] = choicesArray[iterator++];
    }

    setChoices(shuffledArray);

  }, [currentQuestionNumber])

  return (
    <div className="take__SingleSelect__container">
      <p className="take__question__container">
      {currentQuestionNumber + 1}). 
        {questionaires[currentQuestionNumber]?.question}
      </p>
      <div className="take__choices__container">
        <label>
          <input
            type="radio"
            name="choice"
            checked={answer === choices[0]}
            value={choices[0]}
            onChange={(e) => setAnswer(e.target.value)}
          />
          &nbsp; {choices[0]}
        </label>
      </div>

      <div className="take__choices__container">
        <label>
          <input
            type="radio"
            name="choice"
            checked={answer === choices[1]}
            onChange={(e) => setAnswer(e.target.value)}
            value={choices[1]}
          />
          &nbsp; {choices[1]}
        </label>
      </div>

      <div className="take__choices__container">
        <label>
          <input
            type="radio"
            name="choice"
            checked={answer === choices[2]}
            onChange={(e) => setAnswer(e.target.value)}
            value={choices[2]}
          />
          &nbsp; {choices[2]}
        </label>
      </div>

      <div className="take__choices__container">
        <label>
          <input
            type="radio"
            name="choice"
            checked={answer === choices[3]}
            onChange={(e) => setAnswer(e.target.value)}
            value={choices[3]}
          />
          &nbsp; {choices[3]}
        </label>
      </div>
    </div>
  );
}

export default SingleSelect;
