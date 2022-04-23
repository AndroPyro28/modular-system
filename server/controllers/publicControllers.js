module.exports.getCurrentUser = async (req, res) => {
    try {
        return res.status(200).json({
            currentUser: req.currentUser,
            success: true,
        });
    } catch (error) {
        console.error(error);
    }
}