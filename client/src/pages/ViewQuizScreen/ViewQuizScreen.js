import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./StartQuizScreen.css";

function StartQuizScreen() {
  const { id } = useParams();
  const [currentQuiz, setCurrentQuiz] = useState({});
  const [submitted, setSubmitted] = useState(null);
  const [score, setScore] = useState("");

  const { currentUser } = useSelector((state) => state.authReducer);

  useEffect(async () => {
    const res = await axios.get(`/api/student/getQuizByIdV2/${id}`, {
      withCredentials: true,
      headers: {
        accesstoken: Cookies.get("userToken"),
      },
    });
    const { success, quiz, isSubmitted } = res.data;
    if (!success || !quiz?.posted) return window.history.back();

    quiz.dateSubmission = new Date(quiz.dateSubmission).toDateString();
    setCurrentQuiz(quiz);

    setSubmitted(isSubmitted);
    
    const currentUsersQuiz = quiz.StudentsQuizes.find(
      (quiz) => quiz.StudentId == currentUser.id && quiz.TeachersQuizeId == id
    );

    setScore(currentUsersQuiz?.score);
  }, [currentUser]);

  const redirectToQuiz = async () => {
    const currentUsersQuiz = currentQuiz.StudentsQuizes.find(
      (quiz) => quiz.StudentId == currentUser.id && quiz.TeachersQuizeId == id
    );
      if(!currentUsersQuiz.startDate || !currentUsersQuiz.expectedEnd) {
        const res = await axios.post("/api/student/putStartDate",{
          id: currentUsersQuiz.id,
          timeDuration: currentQuiz?.timeDuration
        } ,{
          withCredentials: true,
          headers: {
            accesstoken: Cookies.get("userToken")
          }
        })
        console.log(res.data);
      }
    window.location.assign(`/student/take/quiz/${id}`)
  }

  return (
    <div className="view__quiz__container">
      <div className="view__quiz__screen">
        <section className="activity__title">
          <strong>Module:</strong> {currentQuiz.title}
        </section>

        <div className="activity__info__container">
          <section className="activity__info">
            <p>
              <strong>This quiz will close on</strong>{" "}
              {currentQuiz.dateSubmission}
            </p>
            <p>
              <strong>Time limit:</strong> {currentQuiz.timeDuration}
            </p>
            {submitted && (
              <p>
                <strong>Score:</strong> {score} / {currentQuiz.perfectScore}
              </p>
            )}
          </section>
        </div>
        {submitted ? (
          <button onClick={() => window.location.assign(`/student/subject/${sessionStorage.getItem("subject")}`)}>
            Back To The Course
          </button>
        ) : (
          <button
            onClick={redirectToQuiz}
          >
            Attempt Quiz
          </button>
        )}
      </div>
    </div>
  );
}

export default StartQuizScreen;
