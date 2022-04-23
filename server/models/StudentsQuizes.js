module.exports = (sequelize, DataTypes) => {
    const StudentsQuizes = sequelize.define("StudentsQuizes", {
        score: {
            type:DataTypes.INTEGER,
            allowNull: false
        },
        fullname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        section: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isSubmitted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        startDate: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        expectedEnd: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    })

    StudentsQuizes.associate = (models) => {
        StudentsQuizes.hasMany(models.StudentsAnsweredQuestionaire, {
            onDelete: "cascade"
        });
    }
    // has many questionaires

    return StudentsQuizes
}