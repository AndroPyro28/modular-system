import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { BrowserRouter as Router, Switch, NavLink } from "react-router-dom";
import NormalRoutes from "./routes/NormalRoutes";
import TeachersRoutes from "./routes/TeachersRoutes";
import TeachersLogin from "./pages/TeachersLogin/TeachersLogin";
import StudentsLogin from "./pages/StudentsLogin/StudentsLogin";
import NormalNav from "./components/NormalNavbar.js/NormalNav";
import Home from "./pages/Home/Home";
import Cookies from "js-cookie";
import TeachersDashboard from "./pages/TeachersDashboard/TeachersDashboard";
import {
  authenticationFailed,
  authenticationSuccess,
} from "./redux/actions/authActions";
import { useSelector, useDispatch } from "react-redux";
import TeachersNavbar from "./components/TeachersNavbar.js/TeachersNavbar";
import StudentsNavbar from "./components/StudentsNavbar/StudentsNavbar";
import StudentsRoutes from "./routes/StudentsRoutes";
import Footer from "./components/Footer/Footer";
import SectionScreen from "./pages/ManageScreen/SectionScreen";
import CreateQuestionares from "./pages/CreateQuestionaires/CreateQuestionares";
import Scoreboard from "./pages/scoreboard/Scoreboard";
import StudentsDashboard from "./pages/StudentsDashboard/StudentsDashboard";
import StudentSubjectScreen from "./pages/StudentSubjectScreen/StudentSubjectScreen";
import ViewQuizScreen from "./pages/ViewQuizScreen/ViewQuizScreen";
import AnswerQuiz from "./pages/AnswerQuiz/AnswerQuiz";
import { date } from "yup/lib/locale";

function App() {
  const { isAuth } = useSelector((state) => state.authReducer);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const res = await axios.get("/api/auth", {
      withCredentials: true,
      headers: {
        accessToken: Cookies.get("userToken"),
      },
    });
    setLoading(false);
    const { success, currentUser } = res.data;
    if (!success) {
      Cookies.remove("userToken");
      Cookies.remove("status", currentUser.status);
      dispatch(authenticationFailed());
    } else {
      Cookies.set("status", currentUser.status);
      dispatch(authenticationSuccess(currentUser, true));
    }

    {const today = new Date();
    // const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    // console.log(new Date(date).toDateString() < "Sat Jan 22 2022");
  //   window.localStorage.setItem("timeStamp", JSON.stringify({
  //     hour: "",
  //     minutes: `${today.getMinutes() + 10}`,
  //     seconds: "00",
  //   }))

  // const time = JSON.parse(window.localStorage.getItem("timeStamp"));
  // console.log(time)
  // const Now = {
  //   minutes: today.getMinutes(),
  //   seconds: today.getSeconds()
    
  // console.log(today.getMinutes() + 10)
    }

  }, []);

  useEffect(async () => {
   const rollcall = await axios.get("/api/teacher/checkDueDate", {
      withCredentials: true
    })
  }, [])

  return (
    !loading && (
      <div className="App">
        <Router>
          {
            //navbar
            !isAuth ? (
              <NormalNav />
            ) : Cookies.get("status") === "teacher" ? (
              <TeachersNavbar />
            ) : (
              <StudentsNavbar />
            )
          }

          <Switch>
            <NormalRoutes
              exact
              path="/"
              isAuth={Cookies.get("userToken")}
              Component={Home}
            />
            <NormalRoutes
              exact
              path="/login/student"
              isAuth={Cookies.get("userToken")}
              Component={StudentsLogin}
            />
            <NormalRoutes
              exact
              path="/login/teacher"
              isAuth={Cookies.get("userToken")}
              Component={TeachersLogin}
            />
            <TeachersRoutes
              exact
              path="/teacher/dashboard"
              isAuth={Cookies.get("userToken")}
              Component={TeachersDashboard}
            />
            <TeachersRoutes
              exact
              path="/teacher/manage/:id"
              isAuth={Cookies.get("userToken")}
              Component={SectionScreen}
            />
            <TeachersRoutes
              exact
              path="/teacher/create/questionaires/:id"
              isAuth={Cookies.get("userToken")}
              Component={CreateQuestionares}
            />
            <TeachersRoutes
              path="/teacher/view/scoreboard/:id"
              isAuth={Cookies.get("userToken")}
              Component={Scoreboard}
            />
            <StudentsRoutes
              exact
              path="/student/dashboard"
              isAuth={Cookies.get("userToken")}
              Component={StudentsDashboard}
            />
            <StudentsRoutes
              exact
              path="/student/subject/:id"
              isAuth={Cookies.get("userToken")}
              Component={StudentSubjectScreen}
            />
            <StudentsRoutes
              exact
              path="/student/view/quiz/:id"
              isAuth={Cookies.get("userToken")}
              Component={ViewQuizScreen}
            />

            <StudentsRoutes
              exact
              path="/student/take/quiz/:id"
              isAuth={Cookies.get("userToken")}
              Component={AnswerQuiz}
            />
          </Switch>
          <Footer />
        </Router>
      </div>
    )
  );
}

export default App;