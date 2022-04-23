import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useSelector} from "react-redux";
import './studentDashboard.css'

function StudentsDashboard() {
  
    const { currentUser } = useSelector((state) => state.authReducer);
    const [subjects, setSubjects] = useState([]);
    useEffect(async() => {
        try {
            
            const res = await axios.get(`/api/student/getAllSubjectsByStudent`, {
                withCredentials: true,
                headers: {
                    accesstoken: Cookies.get("userToken")
                },
            });
            setSubjects(res.data.subjects);
        } catch (error) {
            console.error(error.message);
        }
    }, []);

    const handleClick = (id) => {
        // window.localStorage.setItem("currentSubject", subject);
        window.location.href = `/student/subject/${id}`
      }

    const fetchData = subjects.map((data, index) => (
        <div
          className="section"
           onClick={() => handleClick(data.id)}
        >
          {index % 2 == 0 ? (
            <img className="img__section img__section2" src="/img/undraw_Online_learning_re_qw08.png" />
          ) : (
            <img className="img__section img__section2" src="/img/undraw_book_reading_kx9s.png" />
          )}
          <div className="section__info">
          <p>{data.subject}</p>
          </div>
        </div>
      ));

    return (
        <div className="dashboard__container">
      <div className="dasboard__banner" style={{backgroundImage:"url('/img/undraw_Scrum_board_re_wk7v.png')"}}>
        <h1>Welcome to dashboard</h1>
        <h2>{currentUser.course} {currentUser.year}-{currentUser.section}</h2>
        <p>Manage your subjects</p>
      </div>
      <h1 className="h1__section">-Your Subjects-</h1>
      <div className="grid__sections">
          {/* subjects here */}

          {fetchData}
      </div>
    </div>
    )
}

export default StudentsDashboard
