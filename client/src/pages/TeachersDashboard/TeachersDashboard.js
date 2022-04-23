import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useSelector } from "react-redux";
import "./dashboard.css";
import { Prompt } from "react-router-dom";
function TeachersDashboard() {
  const { currentUser } = useSelector((state) => state.authReducer);
  const [room, setRoom] = useState([]);

  useEffect(async () => {
    const res = await axios.get(`/api/teacher/getAllHandledSections`, {
      headers: {
        accessToken: Cookies.get("userToken"),
      },
    });
    setRoom(res.data);
  }, []);

  const handleClick = (id, { subject, course, section, year }) => {
    // window.localStorage.setItem("currentSubject", subject);
    // window.localStorage.setItem("currentSection", `${course}-${year}-${section}`)
    window.location.href = `/teacher/manage/${id}`;
  };
  const fetchData = room.map((data, index) => (
    <div className="section" onClick={() => handleClick(data.id, data)}>
      <div className="section__subject">
        <p>Subject: {data.subject}</p>
      </div>
      {index % 2 == 0 ? (
        <img className="img__section" src="/img/undraw_Teaching_re_epqb.png" />
      ) : (
        <img className="img__section" src="/img/undraw_quiz_nlyh.png" />
      )}
      <div className="section__info">
        <p>{`${data.course}-${data.year}${data.section}`}</p>
      </div>
    </div>
  ));

  return (
    <div className="dashboard__container">
      <div className="dasboard__banner">
        <h1>Welcome To Dashboard</h1>
        <p>Manage your students</p>
      </div>
      <h1 className="h1__section">-Your handled sections-</h1>
      <div className="grid__sections">{fetchData}</div>
    </div>
  );
}

export default TeachersDashboard;
