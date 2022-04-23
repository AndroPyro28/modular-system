const db = require("../models");

const connectDB = async (app, PORT) => {
    try {
    const resDB = await db.sequelize.sync();

    app.listen(PORT, () => console.log(`Server started at port ${PORT}`))
        
    } catch (error) {
        console.error(error);
        process.exit(0);
    }
}

module.exports = connectDB;