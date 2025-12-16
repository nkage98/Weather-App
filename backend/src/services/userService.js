import { validateEmail, validatePassword } from "../utils/utils.js";
import User from "../models/user.model.js";
import * as userRepository from "../repositories/userRepository.js";

export async function register(name, email, password) {
    if (!validateEmail(email)) {
        throw new Error("Invalid Email.");
    }

    if (!validatePassword(password)) {
        throw new Error("Password does not meet criteria.");
    }

    try {
        const userExists = await User.findOne({ email: email });

        if (userExists) {
            throw new Error("User already exists.");
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = userRepository.createUser(name, email, hashedPassword);

        return newUser;
    } catch (error) {
        throw new Error("Internal server error", error);
    }
}

export async function getUser(userId) {
    try {
        const userData = await userRepository.getUserById(userId);

        return userData;
    } catch (error) {
        throw new Error("Internal Server Error:", error);
    }
}
