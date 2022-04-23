const {
  Teachers,
  Students,
  TeachersQuizes,
  TeachersQuestionaires,
  StudentsQuizes,
  TeachersSection,
  Courses,
} = require("../models");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
module.exports.signup = async (req, res) => {
  try {
    const values = req.body;
    console.log(req.body);
    const resDB = await Teachers.create(values);
    return res.status(200).json(resDB);
  } catch (error) {
    console.log(error);
  }
};
const maxAge = 24 * 60 * 60;

const assignToken = (id) => {
  return jwt.sign({ id, status: "teacher" }, process.env.JWT_PRIVATEKEY, {
    expiresIn: maxAge,
  });
};

module.exports.login = async (req, res) => {
  try {
    const { teacherId, password } = req.body;

    const resDB = await Teachers.findOne({
      where: {
        teacherId,
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

module.exports.fetchStudents = async (req, res) => {
  try {
    const { course, year, section } = req.body;
    const rawData = await Students.findAll({
      where: {
        course,
        year,
        section,
      },
    });

    const students = rawData.map((data) => data.dataValues);

    return res.status(200).json({
      success: true,
      students,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.createQuiz = async (req, res) => {
  const { currentUser } = req;
  const { title, timeLimit, id } = req.body;

  try {
    const isAlreadyCreated = await TeachersQuizes.findOne({
      where: {
        title,
        TeachersSectionId: id,
      },
    });

    if (!isAlreadyCreated) {
      const resDB = await TeachersQuizes.create({
        title,
        // numberOfQuestions: noQuestions,
        timeDuration: timeLimit,
        posted: false,
        TeacherId: currentUser.id,
        TeachersSectionId: id,
      });

      // const allStudentsInRoom = await Students.findAll({
      //     where: {
      //         course, section, year
      //     }
      // })
      // console.log(allStudentsInRoom)

      // const multipleCreate = await StudentsQuizes.bulkCreate([])
      return res.status(200).json({
        quiz: resDB.dataValues,
        msg: "Task has been created",
        success: true,
      });
    } else {
      return res.status(200).json({
        msg: "Sorry this quiz title is already in use",
        success: false,
      });
    }
  } catch (error) {
    console.log("error");
  }
};

module.exports.fetchQuizes = async (req, res) => {
  const { id } = req.body;
  try {
    // const {id} = req.currentUser;
    const resDB = await TeachersQuizes.findAll({
      where: {
        TeachersSectionId: id,
      },
    });
    const quizes = resDB.map((quiz) => quiz.dataValues);

    return res.status(200).json({
      quizes,
      success: true,
    });
  } catch (error) {}
};

module.exports.getQuizById = async (req, res) => {
  const { quizId } = req.params;
  const { currentUser } = req;

  try {
    const resDB = await TeachersQuizes.findOne({
      where: {
        id: quizId,
        TeacherId: currentUser.id,
      },
    });
    if (resDB.dataValues.TeacherId != currentUser.id) {
      return res.status(200).json({
        success: false,
        msg: "you cannot manage the quiz that you do not own",
      });
    }

    return res.status(200).json({
      quiz: resDB.dataValues,
      success: true,
    });
  } catch (error) {
    console.error("error fired", error);
    return res.status(200).json({
      success: false,
      msg: "sorry cannot find the quiz you are looking for.",
    });
  }
};

module.exports.getQuestionaires = async (req, res) => {
  const { quizId } = req.params;
  try {
    const data = await TeachersQuestionaires.findAll({
      where: {
        TeachersQuizeId: parseInt(quizId, Number),
      },
    });
    return res.status(200).json({
      questionaires: data,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.createQuestionaires = async (req, res) => {
  const {
    questionaireType,
    choices,
    dedicatedAnswer,
    quizId,
    question,
    questionNumber,
  } = req.body;
  const { currentUser } = req;

  try {
    const resDB = await TeachersQuestionaires.create({
      question,
      dedicatedAnswer,
      questionNumber,
      questionType: questionaireType,
      choice1: choices[0],
      choice2: choices[1],
      choice3: choices[2],
      TeachersQuizeId: quizId,
      TeacherId: currentUser.id,
    });

    console.log(resDB);
    return res.status(200).json({
      msg: "successfully created",
      quizCreated: resDB.dataValues,
    });
  } catch (error) {}
};

module.exports.postQuiz = async (req, res) => {
  const { quizId, sectionId, dateSubmission, questionairesCreated } = req.body;
  try {
    const resDB = await TeachersQuizes.update(
      {
        posted: true,
        dateSubmission,
        perfectScore: questionairesCreated.length,
      },
      {
        where: {
          id: quizId,
        },
      }
    );

    const students = await Students.findAll({
      where: {
        CourseId: sectionId,
      },
    });

    const getQuizByThisQuizId = await StudentsQuizes.findAll({
      where: {
        TeachersQuizeId: quizId
      }
    })

    if (getQuizByThisQuizId.length <= 0) {
      console.log("hitted no students in the quiz")
      const studentRawData = students.map((student, index) => {
        return {
          fullname: `${student.firstname} ${student.lastname}`,
          section: `${student.course}-${student.year}${student.section}`,
          isSubmitted: false,
          TeachersQuizeId: Number(quizId, Number),
          score: 0,
          StudentId: student.id,
          isAnsweredAllQuestion: false,
        };
      });
      const autoCreateQuiz = await StudentsQuizes.bulkCreate(studentRawData);
    }

    
    return res.status(200).json({
      msg: "the quiz has been posted",
      success: true,
      data: resDB.dataValues,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(200).json({
      msg: "some thing went wrong",
      success: false,
    });
  }
};

module.exports.getAllHandledSections = async (req, res) => {
  const { id } = req.currentUser;

  const resDB = await TeachersSection.findAll({
    where: {
      TeacherId: id,
    },
  });

  return res.status(200).json(resDB);
};

module.exports.getStudentsByQuiz = async (req, res) => {
  const { course, year, section, quizId } = req.body;
};

module.exports.getQuizBySection = async (req, res) => {
  const { course, year, section, quizId } = req.body;
};

module.exports.checkCurrentSection = async (req, res) => {
  const { id } = req.body;

  try {
    const resDB = await TeachersSection.findOne({
      where: {
        id,
      },
    });
    const teacherSection = resDB.dataValues;

    if (teacherSection.TeacherId == req.currentUser.id) {
      //if this section is handled by the same teacher id then we will send false

      return res.status(200).json({
        isHandled: true,
        teacherSection,
      });
    }
    return res.status(200).json({
      //else we will send false
      isHandled: false,
    });
  } catch (error) {
    //or if the data cannot be found in the database then we will return false

    return res.status(200).json({
      isHandled: false,
    });
  }
};

module.exports.checkDueDate = async (req, res) => {
  try {
    const today = new Date();

    const month = `${
      today.getMonth() + 1 < 9
        ? `0${today.getMonth() + 1}`
        : `${today.getMonth() + 1}`
    }`;
    const day = `${
      today.getDate() < 9 ? `0${today.getDate()}` : `${today.getDate()}`
    }`;
    const date = `${today.getFullYear()}-${month}-${day}`;

    let hour = today.getHours();
    const shift = hour >= 12 ? " pm" : " am";

    hour = hour % 12 < 10 ? `0${hour % 12}` : hour % 12;

    let minutes = today.getMinutes();
    
    minutes = minutes < 10 ? "0" + minutes : minutes;

    let seconds = today.getSeconds();

    const time = `${hour}:${minutes}:${minutes}:${seconds}${shift}`;

    const dueDateQuizes = await TeachersQuizes.findAll({
      include: [StudentsQuizes],
      where: {
        dateSubmission: {
          [Op.lt]: date,
        },
      },
    });
    const ids = dueDateQuizes.map((quiz) => quiz.id);
    const studentsQuizes = await StudentsQuizes.update(
      {
        isSubmitted: true,
      },
      {
        where: {
          [Op.or]: [
            { TeachersQuizeId: ids },
            {
              expectedEnd: {
                [Op.lt]: time,
              },
            },
          ],
        },
      }
    );
    return res.status(200).json({
      success: true
    })
  } catch (error) {
    console.error(error.message);
  }
};

module.exports.editQuiz = async (req, res) => {
  try {
    const { id } = req.currentUser;
    const updatedValues = req.body;
    const quizId = updatedValues.id;
    delete updatedValues.id;

    const checkQuiz = await TeachersQuizes.findOne({
      where: {
        title: updatedValues.title,
        TeacherId: id,
        TeachersSectionId: updatedValues.TeachersSectionId,
        id: {
          [Op.ne]: quizId,
        },
      },
    });

    if (checkQuiz) {
      console.log(checkQuiz);
      return res.status(200).json({
        msg: "This title is already in use",
        success: false,
      });
    }

    const editQuiz = await TeachersQuizes.update(updatedValues, {
      where: {
        id: quizId,
      },
    });

    return res.status(200).json({
      msg: "Update sucessful",
      success: true,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(200).json({
      msg: "Something went wrong...",
      success: false,
    });
  }
};

module.exports.deleteQuiz = async (req, res) => {
  try {
    const { id } = req.body;
    const deleteQuiz = await TeachersQuizes.destroy({
      where: {
        id,
      },
    });
    return res.status(200).json({
      msg: "Quiz deleted",
      success: true,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(200).json({
      msg: "Ooops Something went wrong...",
      success: false,
    });
  }
};

module.exports.deleteQuestionaire = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteQuestionaire = await TeachersQuestionaires.destroy({
      where: {
        id,
      },
    });

    return res.status(200).json({
      msg: "Questionaire deleted...",
      success: true,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(200).json({
      msg: "someting went wrong...",
      success: false,
    });
  }
};

module.exports.unPostQuiz = async (req, res) => {
  const { id } = req.body;
  try {
    const unpostQuiz = await TeachersQuizes.update({posted:false}, {
      where: {
        id
      }
    })
    return res.status(200).json({
      success: true
    })
  } catch (error) {
    console.error(error.message);
  }
    
}
