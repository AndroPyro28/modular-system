import React from "react";

function Enumeration({questionaires, currentQuestionNumber, setAnswer, answer}) {
  return (
    <div className="take__SingleSelect__container">
      <p className="take__question__container">
      {currentQuestionNumber + 1}).
        {questionaires[currentQuestionNumber]?.question}
      </p>
      <div className="take__choices__container">
        <label htmlFor="answer">Your Answer: &nbsp; </label>
        <input
          type="text"
          onChange={(e) => setAnswer(e.target.value)}
          value={answer}
          placeholder="Answer Here"
          className="answer__input"
          id="answer"
        />
      </div>
    </div>
  );
}

export default Enumeration;
