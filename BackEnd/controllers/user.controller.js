const User = require("../models/user.model.js");

const getUsersForSidebar = async (req, res) => {
    return res.status(200).json({ data: "Hello world" })
    try {
        const loggedInUserId = req.user._id;
        // removing ourself from side bar users
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password -__v -gender -createdAt -updatedAt ");
        // console.log(filteredUsers);
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({ error });
        // res.status(500).json({ error: "Internal server error"});
    }
};
module.exports = getUsersForSidebar