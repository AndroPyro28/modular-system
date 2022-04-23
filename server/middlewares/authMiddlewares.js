const { Students, Teachers } = require("../models");
const { verify } = require("jsonwebtoken");
module.exports.verifyUser = async (req, res, next) => {

    try {
        const { accesstoken } = req.headers;
        
        const decodedToken = verify(accesstoken, process.env.JWT_PRIVATEKEY);
        if (decodedToken.status === "teacher") {
            const resDB = await Teachers.findByPk(decodedToken.id);
            req.currentUser = resDB.dataValues;
            req.currentUser.status = "teacher";
        }
        if(decodedToken.status === "student") {
            const resDB = await Students.findByPk(decodedToken.id);
            req.currentUser = resDB.dataValues;
            req.currentUser.status = "student";
        }
        next();
    } catch (error) {
        console.log("error in authentication", error.message)
        return res.status(200).json({
            currentUser: {},
            success: false,
        })
    }
}