module.exports = (sequelize, DataTypes) => {
    const Students = sequelize.define("Students", {
        studentId: {
            type: DataTypes.STRING,
            allowNull: false
        },password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false
        }, lastname: {
            type: DataTypes.STRING,
            allowNull: false
        }, section: {
            type: DataTypes.STRING,
            allowNull: false
        }, year: {
            type: DataTypes.INTEGER,
            allowNull: false
        },course : {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Students.associate = (model) => {
        Students.hasMany(model.StudentsQuizes, {
            onDelete: "cascade"
        })
    }

    return Students;
}