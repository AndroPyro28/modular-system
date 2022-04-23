const express = require("express");

const router = express.Router();

const teacherControllers = require("../controllers/teacherControllers");
const { verifyUser } = require("../middlewares/authMiddlewares");

router.post("/signup", teacherControllers.signup);
router.post("/login", teacherControllers.login);
router.post("/fetchStudents", verifyUser, teacherControllers.fetchStudents);
router.post("/fetchQuizes", verifyUser, teacherControllers.fetchQuizes);
router.post("/createQuiz", verifyUser, teacherControllers.createQuiz);
router.get("/getQuizById/:quizId", verifyUser, teacherControllers.getQuizById);
router.post("/createQuestionaires", verifyUser, teacherControllers.createQuestionaires);
router.get("/getQuestionaires/:quizId", verifyUser, teacherControllers.getQuestionaires);
router.post("/postQuiz", verifyUser, teacherControllers.postQuiz);
router.post("/getStudentsByQuiz", verifyUser, teacherControllers.getStudentsByQuiz);
router.post("/getQuizBySection", verifyUser, teacherControllers.getQuizBySection);
router.get("/getAllHandledSections", verifyUser, teacherControllers.getAllHandledSections);
router.post("/checkCurrentSection", verifyUser, teacherControllers.checkCurrentSection)
router.get("/checkDueDate", teacherControllers.checkDueDate);
router.post("/editQuiz", verifyUser, teacherControllers.editQuiz);
router.post("/deleteQuiz", verifyUser, teacherControllers.deleteQuiz);
router.delete("/deleteQuestionaire/:id", verifyUser, teacherControllers.deleteQuestionaire)
router.post("/unPostQuiz", verifyUser, teacherControllers.unPostQuiz)
module.exports = router;
