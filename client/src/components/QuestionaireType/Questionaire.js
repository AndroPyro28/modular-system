import React, { useEffect } from "react";
import { useState } from "react";
import Enumeration from "./Enumeration";
import "./questionaire.css";
import SingleSelect from "./SingleSelect";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import TrueOrFalse from "./TrueOrFalse";

function Questionaire({ questionaires, answeredQuestions, quiz, studentQuiz }) {
  const { id } = useParams();
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const maxLimit = currentQuestionNumber < questionaires.length - 1;
  const minLimit = currentQuestionNumber > 0;
  const [answer, setAnswer] = useState("");

  const [timeLimit, setTimeLimit] = useState({
    hours: "-",
    minutes: "-",
    seconds: "-",
  });

  useEffect(async () => {
    setCurrentQuestionNumber(answeredQuestions.length);
  }, [answeredQuestions]);

  useEffect(async () => {
    const res = await axios.get(`/api/student/getTimer/${id}`, {
      withCredentials: true,
      headers: {
        accesstoken: Cookies.get("userToken"),
      },
    });
    const date = new Date();

    let DATEhour = date.getHours();
    let DATEminutes = date.getMinutes();
    DATEminutes = DATEminutes < 10 ? "0" + DATEminutes : DATEminutes;
    DATEhour = DATEhour % 12 < 10 ? `0${DATEhour % 12}` : DATEhour % 12;
    let DATEseconds = date.getSeconds();

    let { hours, minutes, seconds } = res.data;
    console.log({ DATEhour, DATEminutes, DATEseconds });
    console.log({ hours, minutes, seconds });

    if (hours < DATEhour) {
      hours = hours - DATEhour;
      hours = hours + 12;
    } else {
      hours = hours - DATEhour;
    }

    if (DATEminutes > minutes) {
      minutes = minutes - DATEminutes;
      minutes = 60 + minutes;
      hours--;
    } else {
      minutes = minutes - DATEminutes;
    }

    if (DATEseconds > seconds) {
      seconds = seconds - DATEseconds;
      seconds = 60 + seconds;
      minutes--;
    } else {
      seconds = seconds - DATEseconds;
    }
    setTimeLimit({ hours, minutes, seconds });
  }, []);

  useEffect(() => {
    setInterval(tick, 1000);
  }, []);
  const tick = () => {
    console.log("ticking the clock");
    setTimeLimit((prev) => ({ ...prev, seconds: prev.seconds - 1 }));
  };

  useEffect(async () => {
    if (
      timeLimit.minutes == 0 &&
      timeLimit.hours == 0 &&
      timeLimit.seconds == 0
    ) {
      setTimeout( async () => {
        const rollcall = await axios.get("/api/teacher/checkDueDate", {
          withCredentials: true,
        });
        clearInterval(tick);
        return window.location.assign(`/student/view/quiz/${id}`);
      }, 1500);
    }
    if (timeLimit.seconds < 0) {
      setTimeLimit((prev) => ({ ...prev, seconds: 59 }));
      setTimeLimit((prev) => ({ ...prev, minutes: prev.minutes - 1 }));
    }
    if (timeLimit.minutes < 0) {
      setTimeLimit((prev) => ({ ...prev, minutes: 59 }));
      setTimeLimit((prev) => ({ ...prev, hours: prev.hours - 1 }));
    }
  }, [timeLimit.seconds]);

  const nextQuestion = async () => {
    if (!maxLimit) {
      const isSubmitted = window.confirm("Submit your quiz?");
      if (!isSubmitted) return;
    }

    const res = await axios.post(
      `/api/student/submitQuestionaire`,
      {
        TeachersQuizeId: id,
        questionNumber: questionaires[currentQuestionNumber]?.questionNumber,
        question: questionaires[currentQuestionNumber]?.question,
        studentAnswer: answer,
        dedicatedAnswer: questionaires[currentQuestionNumber]?.dedicatedAnswer,
      },
      {
        withCredentials: true,
        headers: {
          accesstoken: Cookies.get("userToken"),
        },
      }
    );

    if (maxLimit) {
      setCurrentQuestionNumber(currentQuestionNumber + 1);
    } else {
      window.onbeforeunload = (e) => null;
      const response = await axios.post(
        "/api/student/submitAndTotalQuiz",
        {
          TeachersQuizeId: id,
        },
        {
          withCredentials: true,
          headers: {
            accesstoken: Cookies.get("userToken"),
          },
        }
      );
      return window.location.assign(`/student/view/quiz/${id}`);
    }
    setAnswer("");
  };

  const prevQuestion = () => {
    if (currentQuestionNumber > 0) {
      setCurrentQuestionNumber((prev) => prev - 1);
    }
  };

  let hotdog = 0;
  return (
    <div className="take__questionairetype__container">
      <h1>
        {timeLimit.hours}:{timeLimit.minutes}:{timeLimit.seconds}s{" "}
        <i class="fas fa-stopwatch"></i>
      </h1>

      {questionaires[currentQuestionNumber]?.questionType ===
        "Single Select" && (
        <SingleSelect
          setAnswer={setAnswer}
          answer={answer}
          questionaires={questionaires}
          currentQuestionNumber={currentQuestionNumber}
        />
      )}
      {questionaires[currentQuestionNumber]?.questionType === "Enumeration" && (
        <Enumeration
          setAnswer={setAnswer}
          answer={answer}
          questionaires={questionaires}
          currentQuestionNumber={currentQuestionNumber}
        />
      )}

      {questionaires[currentQuestionNumber]?.questionType === "True/False" && (
        <TrueOrFalse
          setAnswer={setAnswer}
          answer={answer}
          questionaires={questionaires}
          currentQuestionNumber={currentQuestionNumber}
        />
      )}

      {minLimit ? (
        <button className="btnPrev" onClick={prevQuestion}>
          Prev
        </button>
      ) : (
        <button className="btnPrev btnPrevDisable">Prev</button>
      )}

      {maxLimit ? (
        <button className="btnNext" onClick={nextQuestion}>
          Next
        </button>
      ) : (
        <button className="btnNext btnSubmit" onClick={nextQuestion}>
          Submit
        </button>
      )}
    </div>
  );
}

export default Questionaire;
