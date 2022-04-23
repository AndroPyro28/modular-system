module.exports = (sequelize, DataTypes) => {
    const Courses = sequelize.define("Courses", {
        courseName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        schoolYear: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false
        },
        section: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    Courses.associate = (model) => {
        Courses.hasMany(model.TeachersSection, {
            onDelete: "cascade"
        });
    
        Courses.hasMany(model.Students, {
            onDelete: "cascade"
        });
    }

    return Courses;
}