import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import EditQuizModal from "../../components/modals/EditQuizModal";
import InsertQuizModal from "../../components/modals/InsertQuizModal";
import { ToastContainer, toast } from 'react-toastify';
import "./section.css";

function SectionScreen() {
  const { id } = useParams();

  const [modal, setModal] = useState(false);
  const [quizes, setQuizes] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editQuiz, setEditQuiz] = useState({});
  const [refresh, setRefresh] = useState(false);

  useEffect(async () => {
    const res = await axios.post(
      `/api/teacher/checkCurrentSection`,
      {
        id,
      },
      {
        withCredentials: true,
        headers: {
          accesstoken: Cookies.get("userToken"),
        },
      }
    );
    const { isHandled, teacherSection } = res.data;
    if (!isHandled) return window.history.back();
    window.localStorage.setItem("currentSection", teacherSection.CourseId);
  }, []);

  useEffect(async () => {
    const res = await axios.post(
      "/api/teacher/fetchQuizes",
      {
        id,
      },
      {
        withCredentials: true,
        headers: {
          accesstoken: Cookies.get("userToken"),
        },
      }
    );
    setQuizes(res.data.quizes);
    if(res.data.quizes.length > 0) {
      return  toast("Your Available task has been fetched...", {
        type: "info"
      })
    }
   
  }, [refresh]);

  const quizContent = (quiz) => {
    if (!quiz.posted) {
      return (window.location.href = `/teacher/create/questionaires/${quiz.id}`);
    } else {
      return (window.location.href = `/teacher/view/scoreboard/${quiz.id}`);
    }
  };

  const openEditQuizModal = (quiz) => {
    setOpenEditModal(true)
    setEditQuiz(quiz)
  }

  const fetchQuizes = quizes?.map((quiz) => {
    return (
      <div className="quiz__item__wrapper">
        <button
        onClick={(e) => openEditQuizModal(quiz)}
        >
        <i class="fas fa-braille"></i>
        </button>
        <div className="quiz__item" onClick={() => quizContent(quiz)}>
          <div className="quiz__title">{quiz.title}</div>
          <div className="quiz__timeDuration">{quiz.timeDuration}</div>
          <div className="quiz__numberOfQuestions">
            {quiz.posted ? `Posted` : `Not Posted`}
          </div>
        </div>
      </div>
    );
  });

  return (
    <React.Fragment>
      <ToastContainer autoClose={2000} />
      {modal && <InsertQuizModal setModal={setModal} setQuizes={setQuizes} />}
      {openEditModal && <EditQuizModal setOpenEditModal={setOpenEditModal} editQuiz={editQuiz} setRefresh={setRefresh} refresh={refresh}/>}
      <div className="section__screen__container">
        <h1 style={{ textAlign: "center", color: "grey" }}>
          {/* { window.localStorage.getItem("currentSubject")} - You are currently in {window.localStorage.getItem("currentSection")}  */}
        </h1>
        <button className="add__btn" onClick={() => setModal(true)}>
          <i class="fas fa-calendar-plus"></i> Add a activity
        </button>

        <div className="quizes__container">
          <div className="quiz__header">
            <div>Task Title</div>
            <div>Time Limit</div>
            <div>Status</div>
          </div>
          {quizes?.length > 0 ? (
            fetchQuizes
          ) : (
            <h1 style={{ textAlign: "center", color: "grey" }}>
              <i class="fas fa-folder-open"></i> You haven't upload any quiz
              yet...
            </h1>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default SectionScreen;