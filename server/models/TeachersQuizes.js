module.exports = (sequelize, DataTypes) => {
    const TeachersQuizes = sequelize.define("TeachersQuizes", {
        title: {
            type:DataTypes.STRING,
            allowNull: false
        },
        timeDuration: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        posted: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        dateSubmission: {
            type: DataTypes.STRING,
            allowNull: true
        },
        perfectScore: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    })

    TeachersQuizes.associate = (models) => {
        TeachersQuizes.hasMany(models.TeachersQuestionaires, {
            onDelete: "cascade"
        });

        TeachersQuizes.hasMany(models.StudentsQuizes, {
            onDelete: "cascade"
        });
    }

    return TeachersQuizes;
}