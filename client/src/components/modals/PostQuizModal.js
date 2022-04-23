import React, { useEffect, useState } from "react";
import axios from "axios";
import {useParams} from "react-router-dom"
import Cookies from "js-cookie";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PostQuizModal({questionairesCreated, setOpenModal}) {

    const { id } = useParams();
    const [date, setDate] = useState();

  useEffect(() => {
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1; //January is 0!
    let year = today.getFullYear();

    const dateBox = document.querySelector(".date__submission");

    if(day < 10) {
        day = `0${day}`
    }
    if (month < 10) {
        month = `0${month}`;
     } 
     //configuring date in input date type
    today =  `${year}-${month}-${day}`;
     
    dateBox.min = today;
  }, []);

  const postQuiz = async () => {
    try {
      console.log(questionairesCreated);
      if (questionairesCreated.length <= 0) {
        return toast("Add a questionaires to post this quiz!", {
          type:"error"
        });
      }

      if (!date) {
        return toast("Select a date of submission", {
          type:"error"
        });
      }

      const res = await axios.post(
        "/api/teacher/postQuiz",
        { 
          quizId:id,
          sectionId: window.localStorage.getItem("currentSection"),
          dateSubmission: date,
          questionairesCreated
         },
        {
          withCredentials: true,
          headers: {
            accesstoken: Cookies.get("userToken"),
          },
        }
      );
      if (res.data.success) {
        window.location.href = `/teacher/view/scoreboard/${id}`;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="modal__backdrop">
      <ToastContainer autoClose={2000}/>
      <div className="confirm__box">
        <h1>Confirm Date Of Submission</h1>
        <input type="date" className="date__submission" onChange={(e) => setDate(e.target.value)} />
        <div className="buttons">
            <button onClick={postQuiz}>Post</button>
            <button onClick={() => setOpenModal(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default PostQuizModal;
