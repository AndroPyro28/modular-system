const express = require('express');
const cors = require('cors');
const connectDB = require('./config/connectDB.js');
const env = require('dotenv');
const app = express();

env.config({path:'./.env'});

app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000"]
}))

app.use(express.json());

const teacherRoutes = require("./routers/teacherRoutes");
const studentRoutes = require("./routers/studentRoutes");
const publicRoutes = require("./routers/publicRoutes");
const coursesRoutes = require("./routers/coursesRoutes");

app.use("/api/teacher", teacherRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/auth", publicRoutes);
app.use("/api/course", coursesRoutes);

const PORT = process.env.PORT || 3001;

connectDB(app, PORT);

