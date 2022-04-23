module.exports = (sequelize, DataTypes) => {
    const TeachersQuestionaires = sequelize.define("TeachersQuestionaires", {
        question: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dedicatedAnswer: {
            type: DataTypes.STRING,
            allowNull: false
        },
        questionNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        questionType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        choice1: {
            type: DataTypes.STRING,
            allowNull: true
        },
        choice2: {
            type: DataTypes.STRING,
            allowNull: true
        },
        choice3: {
            type: DataTypes.STRING,
            allowNull: true
        },
    });

    // TeachersQuestionaires.associate = (models) => {
    //     TeachersQuestionaires.hasMany(models.Quizes, {
    //         onDelete: "cascade"
    //     });
    // }

    return TeachersQuestionaires;
}