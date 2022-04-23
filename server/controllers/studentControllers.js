const {
  Students,
  TeachersSection,
  TeachersQuizes,
  Courses,
  StudentsQuizes,
  TeachersQuestionaires,
  StudentsAnsweredQuestionaire,
} = require("../models");

const jwt = require("jsonwebtoken");

module.exports.studentSignup = async (req, res) => {
  try {
    const values = req.body;
    const resDB = await Students.create(values);
    return res.status(200).json(resDB);
  } catch (error) {
    console.log(error);
  }
};

const maxAge = 24 * 60 * 60;

const assignToken = (id) => {
  return jwt.sign({ id, status: "student" }, process.env.JWT_PRIVATEKEY, {
    expiresIn: maxAge,
  });
};

module.exports.login = async (req, res) => {
  try {
    const { studentId, password } = req.body;

    const resDB = await Students.findOne({
      where: {
        studentId,
        password,
      },
    });

    const assignedToken = assignToken(resDB.dataValues.id);

    return res.status(200).json({
      success: true,
      token: assignedToken,
      msg: "Logging in...",
    });
  } catch (error) {
    console.error(error);
    return res.status(200).json({
      success: false,
      msg: "Invalid Credentials",
    });
  }
};

module.exports.getAllSubjectsByStudent = async (req, res) => {
  try {
    const { CourseId } = req.currentUser;

    const resDB = await TeachersSection.findAll({
      where: {
        CourseId,
      },
    });

    return res.status(200).json({
      subjects: resDB,
      success: true,
    });
  } catch (error) {
    return res.status(404).json({
      subjects: {},
      success: false,
    });
  }
};

module.exports.getQuizBySubject = async (req, res) => {
  const { id } = req.params;
  try {
    const { CourseId } = req.currentUser;

    const teacherSection = await TeachersSection.findOne({
      where: {
        id,
      },
    });

    if (CourseId != teacherSection.CourseId) {
      console.log("not own subject");
      return res.status(200).json({
        ownSubject: false,
      });
    }

    const resDB = await TeachersQuizes.findAll({
      where: {
        TeachersSectionId: id,
        posted: true,
      },
    });

    return res.status(200).json({
      quizes: resDB,
      ownSubject: true,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(200).json({
      ownSubject: false,
    });
  }
};

module.exports.getQuizById = async (req, res) => {
  const { id } = req.params;

  try {
    const studentQuizes = await StudentsQuizes.findAll({
      where: {
        TeachersQuizeId: id,
      },
    });

    return res.status(200).json({
      success: true,
      studentQuizes,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(200).json({
      success: false,
      msg: "something went wrong...",
    });
  }
};

module.exports.getQuizByIdV2 = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: currentUserId } = req.currentUser;

    const quiz = await TeachersQuizes.findOne({
      include: [StudentsQuizes, TeachersQuestionaires],
      where: {
        id,
      },
    });
    const student = quiz.StudentsQuizes.find(
      (quiz) => quiz.StudentId === currentUserId
    );
    if (!quiz) {
      return res.status(200).json({
        success: false,
        msg: "no quiz found!",
      });
    }

    const checkSection = await TeachersSection.findOne({
      where: {
        id: quiz.TeachersSectionId,
      },
    });

    if (checkSection.CourseId != req.currentUser.CourseId) {
      return res.status(200).json({
        success: false,
        msg: "no quiz found!",
      });
    }
    return res.status(200).json({
      success: true,
      quiz,
      isSubmitted: student.isSubmitted,
    });
  } catch (error) {
    console.error("error now", error.message);
    return res.status(200).json({
      success: false,
      msg: "no quiz found!",
    });
  }
};

module.exports.getQuizByIdV3 = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: currentUserId } = req.currentUser;

    const quiz = await TeachersQuizes.findOne({
      include: [StudentsQuizes, TeachersQuestionaires],
      where: {
        id,
      },
    });
    const student = quiz.StudentsQuizes.find(
      (quiz) => quiz.StudentId == currentUserId
    );

    if (!quiz || student.expectedEnd == null || student.startDate == null) {
      return res.status(200).json({
        success: false,
        msg: "no quiz found!",
      });
    }

    const checkSection = await TeachersSection.findOne({
      where: {
        id: quiz.TeachersSectionId,
      },
    });

    if (checkSection.CourseId != req.currentUser.CourseId) {
      return res.status(200).json({
        success: false,
        msg: "no quiz found!",
      });
    }
    return res.status(200).json({
      success: true,
      quiz,
      studentQuiz: student,
      isSubmitted: student.isSubmitted,
    });
  } catch (error) {
    console.error("error now", error.message);
    return res.status(200).json({
      success: false,
      msg: "no quiz found!",
    });
  }
};

module.exports.submitQuestionaire = async (req, res) => {
  const {
    TeachersQuizeId,
    questionNumber,
    question,
    studentAnswer,
    dedicatedAnswer,
  } = req.body;

  try {
    const studentQuiz = await StudentsQuizes.findOne({
      include: [StudentsAnsweredQuestionaire],
      where: {
        StudentId: req.currentUser.id,
        TeachersQuizeId,
      },
    });

    const answeredQuestions =
      studentQuiz.dataValues.StudentsAnsweredQuestionaires;

    const isAlreadyAnswered = answeredQuestions.some(
      (answeredQuestion) => answeredQuestion.questionNumber == questionNumber
    );

    if (!isAlreadyAnswered) {
      const submitAnswer = await StudentsAnsweredQuestionaire.create({
        questionNumber,
        question,
        studentAnswer,
        dedicatedAnswer,
        StudentsQuizeId: studentQuiz.id,
      });
    } else {
      const updateAnswer = await StudentsAnsweredQuestionaire.update(
        {
          studentAnswer,
        },
        {
          where: {
            questionNumber,
          },
        }
      );
    }
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error(error.message);
  }
  return res.status(200).json({});
};

module.exports.getAnsweredQuestionaires = async (req, res) => {
  const { TeachersQuizeId } = req.body;
  const { id } = req.currentUser;

  try {
    const studentQuiz = await StudentsQuizes.findOne({
      include: [StudentsAnsweredQuestionaire],
      where: {
        StudentId: id,
        TeachersQuizeId,
      },
    });

    const answeredQuestions = studentQuiz.StudentsAnsweredQuestionaires;

    return res.status(200).json({
      answeredQuestions,
    });
  } catch (error) {}
};

module.exports.submitAndTotalQuiz = async (req, res) => {
  const { id } = req.currentUser;
  const { TeachersQuizeId } = req.body;

  try {
    const StudentsQuize = await StudentsQuizes.findOne({
      include: [StudentsAnsweredQuestionaire],
      where: {
        StudentId: id,
        TeachersQuizeId,
      },
    });

    const studentsQuestionaires = StudentsQuize.StudentsAnsweredQuestionaires;

    const correctAnswers = studentsQuestionaires.filter(
      (question) =>
        question.dedicatedAnswer.toLowerCase() ===
        question.studentAnswer.toLowerCase()
    );
    const studentSubmitQuiz = await StudentsQuizes.update(
      {
        isSubmitted: true,
        score: correctAnswers.length,
      },
      {
        where: {
          StudentId: id,
          TeachersQuizeId,
        },
      }
    );

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error(error.message);
  }
};

module.exports.putStartDate = async (req, res) => {
  const { id, timeDuration } = req.body;

  try {
    const date = new Date();
    const month = `${
      date.getMonth() + 1 < 9
        ? `0${date.getMonth() + 1}`
        : `${date.getMonth() + 1}`
    }`;
    const day = `${
      date.getDate() < 9 ? `0${date.getDate()}` : `${date.getDate()}`
    }`;

    const today = `${date.getFullYear()}-${month}-${day}`;

    hour =
      timeDuration == "1hour"
        ? date.getHours() + 1
        : timeDuration == "2hours"
        ? date.getHours() + 2
        : date.getHours();

        if(hour > 24) {
          hour = hour - 24;
        }

    const shift = hour >= 12 ? " pm" : " am";
    let minutes =
      timeDuration == "10min"
        ? date.getMinutes() + 10
        : timeDuration == "30min"
        ? date.getMinutes() + 30
        : date.getMinutes();

        if(minutes > 60) {
          minutes = minutes - 60;
          hour++;
        }
    minutes = minutes < 10 ? "0" + minutes : minutes;
    hour = (hour % 12) < 10 ? `0${hour % 12}` : hour % 12;
   
    let second = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();

    const putStartDate = await StudentsQuizes.update(
      { startDate: today, expectedEnd: `${hour}:${minutes}:${second}${shift}`},
      {
        where: {
          id,
        },
      }
    );

    return res.status(200).json({
      msg: "nice",
      success: true,
    });
  } catch (error) {
    console.error(error.message);

    return res.status(200).json({
      msg: "oh no",
      success: false,
    });
  }
};

module.exports.putTimeEnd = async (req, res) => {
  const date = new Date();
  const shift = date.getHours() >= 12 ? " pm" : " am";
  const hour =
    date.getHours() - 12 < 10
      ? `0${date.getHours() - 12}`
      : date.getHours() - 12;
  let minutes = date.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const second =
    date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();

  try {
    const putEndTime = await StudentsQuizes.update(
      {
        expectedEnd: `${hour}:${minutes}:${second}`,
      },
      {
        where: {
          id,
        },
      }
    );

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(200).json({
      success: false,
    });
  }
};

module.exports.getTimer = async (req, res) => {
    const { quizId } = req.params;
    const {id} = req.currentUser;

    try {
      const studentQuizData = await StudentsQuizes.findOne({
        where: {
          TeachersQuizeId: quizId,
          StudentId: id
        }
      })
  
      const {expectedEnd, startDate} = studentQuizData.dataValues;
      console.log(expectedEnd);
      return res.status(200).json({
        hours: expectedEnd[0]+expectedEnd[1],
        minutes: expectedEnd[3]+expectedEnd[4],
        seconds: expectedEnd[6]+expectedEnd[7],
        startDate
      })
    } catch (error) {
      console.error(error.message);
    }
    

    // console.log(`hour::::::::::${}`)
    // console.log(`minutes::::::::::${expectedEnd[3]+expectedEnd[4]}`)
    // console.log(`second::::::::::${expectedEnd[6]+expectedEnd[7]}`)
    
}