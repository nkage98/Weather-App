import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export async function newUser (userInfo) {
    const {email, password} = userInfo;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const data = {email, password: hashedPassword};
    await User.create(data);
    return {email};
}