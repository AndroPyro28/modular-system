module.exports = (sequelize, DataTypes) => {
    const Teachers = sequelize.define("Teachers", {
        firstname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        teacherId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    })

    Teachers.associate = (models) => {
        Teachers.hasMany(models.TeachersQuizes, {
            onDelete: "cascade"
        });
        Teachers.hasMany(models.TeachersQuestionaires, {
            onDelete: "cascade"
        });
        Teachers.hasMany(models.Courses, {
            onDelete: "cascade"
        });
        Teachers.hasMany(models.TeachersSection, {
            onDelete: "cascade"
        });
    }

    return Teachers;
}