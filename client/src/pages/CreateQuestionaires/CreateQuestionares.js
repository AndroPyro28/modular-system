import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostQuizModal from "../../components/modals/PostQuizModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./questionares.css";

function CreateQuestionares() {
  const { id } = useParams();

  const [questionaireType, setQuestionaireType] = useState("");
  const [choices, setChoices] = useState([]);
  const [dedicatedAnswer, setDedicatedAnswer] = useState("");
  const [questionairesCreated, setQuestionairesCreated] = useState([]);
  const [question, setQuestion] = useState("");
  const [openModal, setOpenModal] = useState(false);

  useEffect(async () => {
    const res = await axios.get(`/api/teacher/getQuizById/${id}`, {
      withCredentials: true,
      headers: {
        accesstoken: Cookies.get("userToken"),
      },
    });

    const { success, msg, quiz } = res.data;

    if (!success) {
      alert("Someting went wrong...");
      window.location.href = "/teacher/dashboard";
    }
    if (quiz.posted == true) {
      window.location.href = `/teacher/view/scoreboard/${id}`;
    }
  }, []);

  useEffect(async () => {
    const res = await axios.get(`/api/teacher/getQuestionaires/${id}`, {
      withCredentials: true,
      headers: {
        accesstoken: Cookies.get("userToken"),
      },
    });
    const { questionaires, success } = res.data;
    setQuestionairesCreated(questionaires);
  }, []);

  const changeValues = (targetIndex, targetValue) => {
    setChoices(
      choices.map((value, index) => {
        if (index !== targetIndex) return value;
        return targetValue;
      })
    );
  };
  const createQuestionaires = async () => {
  const filledChoices = choices.every((choice) => choice != "" );
    if (!questionaireType || !dedicatedAnswer || !question) {
      return toast(`(Choose type, Correct-Answer And Question Here) must be filled`, {
        type:"error"
      });
    }

    if (questionaireType === "Single Select" && choices.length <= 0 || !filledChoices) {
      return toast("Please add a choices below", {
        type:"error"
      });
    }

    const button = document.querySelector(".createQ");
    button.disabled = true;
    const res = await axios.post(
      "/api/teacher/createQuestionaires",
      {
        questionaireType,
        choices,
        dedicatedAnswer,
        quizId: id,
        question,
        questionNumber: questionairesCreated.length + 1,
      },
      {
        withCredentials: true,
        headers: {
          accesstoken: Cookies.get("userToken"),
        },
      }
    );
    setQuestionairesCreated((prev) => [...prev, res.data.quizCreated]);
    setChoices([]);
    setDedicatedAnswer("");
    setQuestion("");
    setQuestionaireType("");
    button.disabled = false;
  };

  const removeChoices = (targetIndex) =>
    setChoices(choices.filter((value, index) => index !== targetIndex));

    const deleteQuestionaire = async (id) => {

      try {
        const res = await axios.delete(`/api/teacher/deleteQuestionaire/${id}`, {
          withCredentials: true,
          headers: {
            accesstoken: Cookies.get("userToken")
          }
        })
        const {msg, success} = res.data;

        if(success) {
          toast(msg, {
            type: "success"
          })
        setQuestionairesCreated(questionairesCreated.filter(questionaire => questionaire.id != id));
        }
        else {
          toast(msg, {
            type: "error"
          })
        }




      } catch (error) {
        
      }
      
    }

    const focusEvent = () => {
      const questionInput = document.querySelector('.question__input');
      questionInput.focus()
    }

  return (
    <React.Fragment>
      
      {openModal ? (
        <PostQuizModal
          questionairesCreated={questionairesCreated}
          setOpenModal={setOpenModal}
        />
      ):
      <ToastContainer autoClose={3000}/>
      }
      <div className="create__questionaires__container">
        <div className="questionaire__content">
          <div className="question__container">
            <label>
              <i class="fas fa-question-circle" style={{cursor:"pointer"}} onClick={focusEvent}></i>
            </label>
            <input
              type="text"
              className="question__input"
              value={question}
              placeholder="(Question Here)"
              onChange={(e) => setQuestion(e.target.value)}
            />
            <select
              onChange={(e) => setQuestionaireType(e.target.value)}
              value={questionaireType}
            >
              <option value="">Choose type</option>
              <option value="Single Select">Single Select</option>
              <option value="Enumeration">Enumeration</option>
              <option value="True/False">True/False</option>
            </select>
          </div>

          {questionaireType === "" ? null : questionaireType ===
            "True/False" ? (
            <select
              onChange={(e) => setDedicatedAnswer(e.target.value)}
              value={dedicatedAnswer}
              className="trueOfFalse"
            >
              <option value="">(Choose the correct answer)</option>
              <option value="True">True</option>
              <option value="False">False</option>
            </select>
          ) : (
            <input
              type="text"
              className="choices__input correct__input"
              style={{
                fontSize: "19px",
                borderBottom: "solid 2px rgb(54, 1, 87)",
                marginBottom: "50px",
              }}
              placeholder={`(Choose the correct answer)`}
              onChange={(e) => setDedicatedAnswer(e.target.value)}
            />
          )}

          {questionaireType === "Single Select" && (
            <div className="div__choices">
              {choices.map((value, index) => {
                return (
                  <div>
                    <input
                      type="text"
                      className="choices__input"
                      placeholder={`(EX: Choice${index + 1})`}
                      onChange={(e) => changeValues(index, e.target.value)}
                      value={value}
                    />
                    <i
                      class="fas fa-times-circle remove__question"
                      onClick={() => removeChoices(index)}
                    ></i>
                  </div>
                );
              })}
              {choices.length < 3 && (
                <i
                  class="fas fa-plus add__question"
                  onClick={() => setChoices((prev) => [...prev, ""])}
                >
                  Question
                </i>
              )}
            </div>
          )}

          <button className="createQ" onClick={createQuestionaires}>
            Insert
          </button>
        </div>
        <div className="questionaire__list">
          <h2 style={{ textAlign: "center" }}>Questionaires Created</h2>
          <div className="list__header__container">
          <div className="list__header questionaire__list__header">Type</div>
            <div className="list__header questionaire__list__header">
              Question
            </div>
            <div className="list__header questionaire__list__header">
              Answer
            </div>
            
          </div>

          <div className="questionaire__container">
            {questionairesCreated.length > 0 ? (
              questionairesCreated?.map((question) => (
                <div className="list__header__container">
                  <div className="questionaire__backdrop"><i class="far fa-times-circle" onClick={() => deleteQuestionaire(question.id)}></i></div>
                  <div className="list__header">{question.questionType}</div>
                  
                  <div className="list__header">{question.question}</div>
                  <div className="list__header">{question.dedicatedAnswer}</div>
                </div>
              ))
            ) : (
              <div className="empty">no question created yet</div>
            )}
          </div>
          <button className="post__btn" onClick={() => setOpenModal(true)}>
            Confirm
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CreateQuestionares;
