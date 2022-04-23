import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";

function PromptModal({ setPrompt, edittingQuiz, setOpenEditModal, setRefresh, refresh }) {

    const handleDelete = async () => {
        const res = await axios.post("/api/teacher/deleteQuiz",edittingQuiz, {
            withCredentials: true,
            headers: {
                accesstoken: Cookies.get("userToken")
            }
        })
        if(res.data.success) {
            setOpenEditModal(false);
            setRefresh(!refresh);
            setPrompt(false);
        }
    }
  return (
    <div className="modal__backdrop">
      <div className="prompt">
        <h2>Are you sure you want to delete the quiz?</h2>
        <div>
          <button onClick={handleDelete}>Confirm</button>
          <button onClick={() => setPrompt(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default PromptModal;
