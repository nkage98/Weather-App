import { validateEmail, validatePassword } from "../utils/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerController = async (req, res) => {
    const user = req.body;

    console.log("Register attempt:", user);

    if (!user.email || !user.password) {
        return res
            .status(400)
            .json({ message: "Email and password are required" });
    }

    if (!validateEmail(user.email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    if (!validatePassword(user.password)) {
        return res
            .status(400)
            .json({ message: "Password does not meet criteria" });
    }

    try {
        const userExists = await User.findOne({ email: user.email });

        if (userExists) {
            return res.status(400).json({ message: "User already exists." });
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(user.password, salt);

        const newUser = new User({
            name: user.name,
            email: user.email,
            password: hashedPassword,
        });

        console.log(newUser);

        await newUser
            .save()
            .then((user) => console.log("User created successfully:", user))
            .catch((err) => {
                console.error("Error creating user:", err);
                return res
                    .status(500)
                    .json({ message: "Error creating user" }, err);
            });

        return res
            .status(201)
            .json({ message: "User created successfully", user: newUser });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal server error" }, error);
    }
};

const loginController = async (req, res) => {
    const user = req.body;

    console.log("Login attempt:", user);

    if (!user.email || !user.password) {
        console.log("Missing email or password");
        return res
            .status(400)
            .json({ message: "Email and password are required" });
    }

    try {
        const findUser = await User.findOne({ email: user.email });

        console.log("User found:", findUser);

        if (!findUser) {
            console.log("User not found");
            return res.status(404).json({ message: "User does not exist" });
        }

        const isPasswordValid = await bcrypt.compare(
            user.password,
            findUser.password
        );

        if (!isPasswordValid) {
            console.log(isPasswordValid);
            return res.status(401).json({ message: "Incorrect password." });
        }

        const token = jwt.sign(
            { name: findUser.name, favoriteCity: findUser.favoriteCities[0] },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 86400000, // 1 day
        });

        console.log("Login successful for user:", findUser.email);

        return res
            .status(200)
            .json({ message: "Login successful" }, { user: user.username });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" }, err);
    }
};

const getUserController = async (req, res) => {
    const id = req.userId;

    if (!id) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const user = await User.findById(id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log(user);
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" }, err);
    }
};

const updateUserController = async (req, res) => {
    const id = req.userId;
    const { name } = req.body;

    console.log(id);

    if (!id) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const user = await User.findByIdAndUpdate(
            id,
            {
                $set: {
                    name: name,
                },
            },
            { runValidators: true },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res
            .status(200)
            .json({ message: "User updated succesfully" }, user);
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" }, err);
    }
};

const deleteUserController = async (req, res) => {
    const id = req.userId;

    try {
        await User.findByIdAndDelete(id);

        return res.status(200).json({ message: "User Deleted" });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" }, err);
    }
};

const authCheckController = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token)
            return res
                .status(404)
                .json({ authenticated: false, message: "No token provided" });

        console.log("Auth Check Controller"); //debug flag

        const userData = jwt.verify(token, process.env.JWT_SECRET);

        return res.status(200).json({ authenticated: true, userData });
    } catch (error) {
        return res.status(401).json({ authenticated: false, message: error });
    }
};

export {
    authCheckController,
    registerController,
    loginController,
    getUserController,
    updateUserController,
    deleteUserController,
};
