const bcrypt = require("bcryptjs")
const generateTokenAndSetCookie = require("../utils/generateToken.js")
const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    // test 1
    // return res.status(400).json({ hello: "hello backend" })

    try {
        const { fullName, userName, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }

        const user = await User.findOne({ userName });
        // console.log(user);
        if (user) {
            return res.status(400).json({ error: "userName already exists" });
        }
        // hash passowrd

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        // https://avatar-placeholder.iran.liara.run/

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?userName=${userName}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?userName=${userName}`;


        const newUser = new User({
            fullName,
            userName,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
        });

        if (newUser) {
            // Generate JWT token here
            // generateTokenAndSetCookie(newUser._id, res);
            const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
                expiresIn: "15d",
            });
            // console.log(token);

            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                userName: newUser.userName,
                profilePic: newUser.profilePic,
                token: token
            });
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


const login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await User.findOne({ userName });
        //                                                        must return this empty string
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid userName or password" });
        }

        // generateTokenAndSetCookie(user._id, res);
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "15d",
        });
        // console.log(token);


        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            profilePic: user.profilePic,
            token: token
        });
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
module.exports = { signup, login, logout }
