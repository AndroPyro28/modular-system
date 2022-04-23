module.exports = (sequelize, DataTypes) => {
    const TeachersSection = sequelize.define("TeachersSection", {
        course: {
            type: DataTypes.STRING,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        subject: {
            type: DataTypes.STRING,
            allowNull: false
        },
        section: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    TeachersSection.associate = (models) => {
        TeachersSection.hasMany(models.TeachersQuizes, {
            onDelete: "cascade"
        })
    }
    
    return TeachersSection;
}