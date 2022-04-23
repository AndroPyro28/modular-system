const express = require("express");

const router = express.Router();
const coursesControllers = require("../controllers/coursesControllers");

router.post("/insertNewClassroom", coursesControllers.insertNewClassroom);
router.post("/assignSection", coursesControllers.assignSection);
router.get("/getAllSections", coursesControllers.getAllSections);

module.exports = router;