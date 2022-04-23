import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./scoreboard.css";

function Scoreboard() {
  const { id } = useParams();
  const [participants, setParticipants] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState({});
  useEffect(async () => {
    const res = await axios.get(`/api/teacher/getQuizById/${id}`, {
      headers: {
        accessToken: Cookies.get("userToken"),
      },
    });
    const { success } = res.data;

    if (!success) return window.history.back();

    setCurrentQuiz(res.data.quiz);
    const { posted } = res.data?.quiz;
    if (!posted) {
      window.location.href = `/teacher/create/questionaires/${id}`;
    }
  }, []);

  useEffect(async () => {
    const res = await axios.get(`/api/student/getQuizById/${id}`, {
      headers: {
        accessToken: Cookies.get("userToken"),
      },
    });
    setParticipants(res.data?.studentQuizes);
  }, []);

  const fetchParticipants = participants.map((participant) => (
    <div className="student__container">
      <p>{participant.id}</p>
      <p>{participant.fullname}</p>
      <p>{participant.section}</p>
      <p>
        {participant.isSubmitted ? (
          `${participant.score}/${currentQuiz.perfectScore}`
        ) : (
          <div className="notYetAnswered">Not yet answered</div>
        )}
      </p>
    </div>
  ));

  return (
    <div className="scoreboard__container">
      <h1>
        Lesson: {currentQuiz.title} Until {currentQuiz.dateSubmission}
      </h1>
      <h1>Time Limit: {currentQuiz.timeDuration}</h1>

      <div className="scoreboard__header">
        <div className="scoreboard__id">ID</div>
        <div className="scoreboard__name">Name</div>
        <div className="scoreboard__section">section</div>
        <div className="scoreboard__score">Score</div>
      </div>

      <div className="students__container">
        {/* --------------------- */}

        {fetchParticipants}

        {/* --------------------- */}
      </div>
    </div>
  );
}

export default Scoreboard;
