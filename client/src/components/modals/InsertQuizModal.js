import React, { useState } from "react";
import "./modals.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function InsertQuizModal({ setModal, setQuizes }) {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [noQuestions, setNoQuestions] = useState(0);
  const [timeLimit, setTimeLimit] = useState("");

  const createQuiz = async () => {
    setNoQuestions(parseInt(noQuestions, Number));

    if (!title || !timeLimit) {
      return toast("to create task, you must complete the requirement", {
        type: "error",
      });
    }

    const res = await axios.post(
      "/api/teacher/createQuiz",
      {
        title,
        timeLimit,
        id,
      },
      {
        withCredentials: true,
        headers: {
          accesstoken: Cookies.get("userToken"),
        },
      }
    );
    const { success, msg, quiz } = res.data;

    if (success) {
      window.location.href = `/teacher/create/questionaires/${quiz.id}`;
    } else {
      toast(msg, {
        type: "error",
      });
    }
  };
  return (
    <div className="modal__backdrop">
      <ToastContainer autoClose={2000} />
      <i class="fas fa-times close__btn" onClick={() => setModal(false)}></i>
      <div className="modal__box">
        <h1 className="h1__modal"> Create a task </h1>
        <div className="modal__input__container">
          <label>Title of Task</label>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="(Ex: Asessment 1)"
          />
        </div>

        <div className="modal__input__container">
          <label>Time Limit</label>
          <select onChange={(e) => setTimeLimit(e.target.value)}>
            <option value="">*</option>
            <option value="10min">10min</option>
            <option value="30min">30min</option>
            <option value="1hour">1hour</option>
            <option value="2hours">2hours</option>
          </select>
        </div>

        <div className="modal__input__container">
          <button onClick={createQuiz} className="next">
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
}

export default InsertQuizModal;
