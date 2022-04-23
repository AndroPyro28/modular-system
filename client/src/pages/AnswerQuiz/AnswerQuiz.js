import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Questionaire from "../../components/QuestionaireType/Questionaire";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "./answerQuiz.css";

function AnswerQuiz() {
  const { id } = useParams();

  const { currentUser } = useSelector((state) => state.authReducer);

  const [questionaires, setQuestionaires] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [quiz, setQuiz] = useState(null);
  const [studentQuiz, setStudentQuiz] = useState(null);

  useEffect(async () => {
    const res = await axios.get(`/api/student/getQuizByIdV3/${id}`, {
      withCredentials: true,
      headers: {
        accesstoken: Cookies.get("userToken"),
      },
    });
    const { success, quiz, studentQuiz } = res.data;

    if (
      !success ||
      studentQuiz?.isSubmitted ||
      !quiz.posted
    ) {
      return window.location.assign(`/student/view/quiz/${id}`);
    }

    setStudentQuiz(studentQuiz);

    const { TeachersQuestionaires } = res.data.quiz;

    {
      // let shuffledArray = [];
      // let iterator = 0, randomIndex;
      // while(iterator < TeachersQuestionaires.length) {
      //   randomIndex = Math.floor(Math.random() * TeachersQuestionaires.length);
      //   while(shuffledArray[randomIndex] != null) {
      //     randomIndex = Math.floor(Math.random() * TeachersQuestionaires.length);
      //   }
      //   shuffledArray[randomIndex] = TeachersQuestionaires[iterator++];
      // }
      // setQuestionaires(shuffledArray);
    }
    setQuiz(quiz);
    setQuestionaires(TeachersQuestionaires);

    window.onbeforeunload = (e) => {
      return "are you sure you want to leave?";
    };
  }, [currentUser]);

  useEffect(async () => {
    const res = await axios.post(
      "/api/student/getAnsweredQuestionaires",
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
    const { answeredQuestions } = res.data;

    setAnsweredQuestions(answeredQuestions);
  }, []);

  return (
    <div className="answer__quiz__container">
      <Questionaire
        questionaires={questionaires}
        currentUser={currentUser}
        answeredQuestions={answeredQuestions}
        quiz={quiz}
        studentQuiz={studentQuiz}
      />
    </div>
  );
}

export default AnswerQuiz;
