const { Courses, Students, TeachersSection } = require("../models");
module.exports.insertNewClassroom = async (req, res) => {
  const { courseName, section, schoolYear } = req.body;

  try {
    const resDB = await Courses.create({
        courseName,
        section,
        schoolYear
    })
    return res.status(200).json(resDB);

  } catch (error) {
      console.error(error);
  }
};

module.exports.getAllSections = async (req, res) => {
    try {
        const resDB = await Courses.findAll({include:[Students]});
    
        const courses = resDB.map((course) => course.dataValues);
    
        return res.status(200).json(courses);
        
    } catch (error) {
        console.error(error);
    }

}

module.exports.assignSection = async(req, res) => {
    const { CourseId, TeacherId, course, year, section, subject } = req.body;

    try {
        const resDB = await TeachersSection.create({ TeacherId, CourseId, subject, course, year, section  });

        return res.status(200).json(resDB);
    } catch (error) {
        console.error(error);
    }
}
