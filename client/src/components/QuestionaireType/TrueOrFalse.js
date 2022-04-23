import React from "react";

function TrueOrFalse({currentQuestionNumber, questionaires, setAnswer, answer}) {
  return (
    <div className="take__SingleSelect__container">
      <p className="take__question__container">
        {currentQuestionNumber + 1}).
        {questionaires[currentQuestionNumber]?.question}
      </p>
      {questionaires[currentQuestionNumber]?.questionNumber % 2 == 0 ? (
        <div className="take__choices__container">
          <label>
            <input
              type="radio"
              name="choice"
              checked={answer === "True"}
              value={"True"}
              onChange={(e) => setAnswer(e.target.value)}
            />
            &nbsp; {"True"}
          </label>
        </div>
      ) : (
        <div className="take__choices__container">
          <label>
            <input
              type="radio"
              name="choice"
              checked={answer === "False"}
              value={"False"}
              onChange={(e) => setAnswer(e.target.value)}
            />
            &nbsp; {"False"}
          </label>
        </div>
      )}

      {questionaires[currentQuestionNumber]?.questionNumber % 2 == 0 ? (
        <div className="take__choices__container">
          <label>
            <input
              type="radio"
              name="choice"
              checked={answer === "False"}
              value={"False"}
              onChange={(e) => setAnswer(e.target.value)}
            />
            &nbsp; {"False"}
          </label>
        </div>
      ) : (
        <div className="take__choices__container">
          <label>
            <input
              type="radio"
              name="choice"
              checked={answer === "True"}
              value={"True"}
              onChange={(e) => setAnswer(e.target.value)}
            />
            &nbsp; {"True"}
          </label>
        </div>
      )}
    </div>
  );
}

export default TrueOrFalse;
