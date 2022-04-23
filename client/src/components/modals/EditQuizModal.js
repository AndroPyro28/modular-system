import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PromptModal from "./PromptModal";

function EditQuizModal({ editQuiz, setOpenEditModal, setRefresh, refresh }) {
  const [edittingQuiz, setEdittingQuiz] = useState({
    id: editQuiz.id,
    title: editQuiz.title,
    timeDuration: editQuiz.timeDuration,
    TeachersSectionId: editQuiz.TeachersSectionId,
    dateSubmission: editQuiz.dateSubmission,
  });

  const [prompt, setPrompt] = useState(false);

  useEffect(() => {
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1; //January is 0!
    let year = today.getFullYear();

    const dateBox = document.querySelector(".date__submission");

    if (day < 10) {
      day = `0${day}`;
    }
    if (month < 10) {
      month = `0${month}`;
    }
    //configuring date in input date type
    today = `${year}-${month}-${day}`;

    dateBox.min = today;
  }, []);

  const handleSave = async () => {
    const values = Object.values(edittingQuiz);

    const isFilled = values.every((value) => value != "");

    if (!isFilled)
      return toast("Complete the requirements to update this quiz", {
        type: "error",
      });
    const res = await axios.post("/api/teacher/editQuiz", edittingQuiz, {
      withCredentials: true,
      headers: {
        accesstoken: Cookies.get("userToken"),
      },
    });
    const { success, msg } = res.data;

    if (!success)
      return toast(msg, {
        type: "error",
      });
    else {
      setRefresh(!refresh);
      setOpenEditModal(false);
    }
  };

  const editQuestionaire = async () => {
      const res = await axios.post("/api/teacher/unPostQuiz", {
        id: edittingQuiz.id
      }, {
        withCredentials: true,
        headers: {
          accesstoken: Cookies.get("userToken")
        }
      })
      window.location.assign(`/teacher/create/questionaires/${edittingQuiz.id}`);
  }

  return (
    <div className="modal__backdrop">
      <ToastContainer autoClose={2000} />
      {prompt && (
        <PromptModal
          setPrompt={setPrompt}
          setRefresh={setRefresh}
          refresh={refresh}
          edittingQuiz={edittingQuiz}
          setOpenEditModal={setOpenEditModal}
        />
      )}

      <i
        class="fas fa-times close__btn"
        onClick={() => setOpenEditModal(false)}
      ></i>
      <div className="edit__quiz__modal">
        <h1>Modify / Delete Quiz</h1>
        <div className="edit__field">
          <label>Title:</label>
          <input
            type="text"
            value={edittingQuiz.title}
            placeholder="Quiz title..."
            name="title"
            onChange={(e) =>
              setEdittingQuiz({
                ...edittingQuiz,
                [e.target.name]: e.target.value,
              })
            }
          />
        </div>

        <div className="edit__field">
          <label>Time Limit:</label>
          <select
            value={edittingQuiz.timeDuration}
            onChange={(e) =>
              setEdittingQuiz({
                ...edittingQuiz,
                [e.target.name]: e.target.value,
              })
            }
            name="timeDuration"
          >
            <option>10min</option>
            <option>30min</option>
            <option>1hour</option>
            <option>2hours</option>
          </select>
        </div>

        <div className="edit__field">
          <label>Date Submission:</label>
          <input
            type="date"
            name="dateSubmission"
            onChange={(e) =>
              setEdittingQuiz({
                ...edittingQuiz,
                [e.target.name]: e.target.value,
              })
            }
            className="date__submission"
            value={edittingQuiz.dateSubmission}
          />
        </div>

        <div className="button__container">
          <button onClick={handleSave}>Save Changes</button>
          <button onClick={editQuestionaire}>Edit Questionaire</button>
          <button onClick={() => setPrompt(true)}>Delete</button>
          
        </div>
      </div>
    </div>
  );
}

export default EditQuizModal;
