const express = require("express");

const router = express.Router();
const { verifyUser } = require("../middlewares/authMiddlewares");

const studentControllers = require("../controllers/studentControllers");

router.post("/signup", studentControllers.studentSignup);
router.post("/login", studentControllers.login);
router.get("/getAllSubjectsByStudent", verifyUser, studentControllers.getAllSubjectsByStudent);
router.get("/getQuizBySubject/:id", verifyUser, studentControllers.getQuizBySubject)
router.get("/getQuizById/:id", verifyUser, studentControllers.getQuizById)
router.get("/getQuizByIdV2/:id", verifyUser, studentControllers.getQuizByIdV2);
router.post("/submitQuestionaire", verifyUser, studentControllers.submitQuestionaire);
router.post("/getAnsweredQuestionaires", verifyUser, studentControllers.getAnsweredQuestionaires);
router.post("/submitAndTotalQuiz", verifyUser, studentControllers.submitAndTotalQuiz);
router.post("/putStartDate", verifyUser, studentControllers.putStartDate)
router.post("/putTimeEnd", verifyUser, studentControllers.putTimeEnd);
router.get("/getQuizByIdV3/:id", verifyUser, studentControllers.getQuizByIdV3);
router.get("/getTimer/:quizId", verifyUser, studentControllers.getTimer);

module.exports = router;