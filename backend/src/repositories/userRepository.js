import User from "../models/user.model.js";

export async function getUserById(id) {
    const userData = await User.findById(id).select("-password");

    return userData;
}

export async function getUserByEmail(email) {
    const user = await User.findOne({ email: email });

    return user;
}

export async function createUser(name, email, hashedPassword) {
    const newUser = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
    });

    return newUser;
}
