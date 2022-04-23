const express = require("express");

const router = express.Router();
const { getCurrentUser } = require("../controllers/publicControllers");
const { verifyUser } = require("../middlewares/authMiddlewares");

router.get("/", verifyUser, getCurrentUser);

module.exports = router;