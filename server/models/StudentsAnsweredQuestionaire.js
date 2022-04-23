module.exports = (sequelize, DataTypes) => {
    const StudentsAnsweredQuestionaire = sequelize.define("StudentsAnsweredQuestionaire", {
        questionNumber: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        question: {
            type: DataTypes.STRING,
            allowNull: false
        },
        studentAnswer: {
            type: DataTypes.STRING,
            allowNull: true
        },
        dedicatedAnswer: {
            type: DataTypes.STRING,
            allowNull: false
        } 
    })

    // has many questionaires

    return StudentsAnsweredQuestionaire
}