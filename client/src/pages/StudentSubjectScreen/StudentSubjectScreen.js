import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Cookies from "js-cookie"
import './StudentSubjectScreen.css'

function StudentSubjectScreen() {

    const { id } = useParams();
    const [quizes, setQuizes] = useState([])
    useEffect( async() => {
      const res = await axios.get(`/api/student/getQuizBySubject/${id}`, {
        withCredentials: true,
        headers: {
          accesstoken: Cookies.get("userToken")
        }
      })
      console.log()
      const {ownSubject, quizes} = res.data;  
      if(!ownSubject) return window.history.back();

      setQuizes(res.data.quizes)
      window.sessionStorage.setItem("subject", id);
    }, [])

    const fetchQuizes = quizes.map(quiz => {
      
     
        return(
          <div className='quiz' onClick={() => window.location.assign(`/student/view/quiz/${quiz.id}`)}>
            <i className="fas fa-pencil-alt"></i>
            <div className='quiz_title'> <h1>Activity Title:</h1> &nbsp; <span>{quiz.title}</span></div>
            <div className='quiz_timeDuration'><h2>Time Duration:</h2> &nbsp; <span>{quiz.timeDuration}</span></div>
        </div>
        )
      
     })
    
    return (
        <div className='subject__screen__container'>
          <div className='quizes__container'>
            {fetchQuizes.length > 0 ? fetchQuizes : <div className='warning__sign'> <i class="fas fa-folder-open"></i> No quizes uploaded yet</div>}
          </div>
        </div>
    )
}

export default StudentSubjectScreen
