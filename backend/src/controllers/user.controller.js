import * as authService from "../services/authService.js";
import * as userService from "../services/userService.js";

const registerController = async (req, res) => {
    const registerDto = req.body;

    console.log("Register attempt:", registerDto);

    if (!registerDto.name || !registerDto.email || !registerDto.password) {
        return res
            .status(400)
            .json({ message: "Name, email and password are required" });
    }
    try {
        const newUser = await userService.register(
            registerDto.name,
            registerDto.email,
            registerDto.password
        );

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
    const loginDto = req.body;

    if (!loginDto.email || !loginDto.password) {
        res.status(400).json({ message: "Email and password are required" });
    }

    console.log("Login attempt for: ", loginDto);

    try {
        const { user, access_token, refresh_token } = await authService.login(
            loginDto.email,
            loginDto.password
        );

        res.cookie("token", refresh_token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 15, // 15 days
        });

        return res
            .status(200)
            .json({ message: "Login successful" }, access_token, user.name);
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" }, err);
    }
};

const getUserController = async (req, res) => {
    const userId = req.userId;

    try {
        const userData = await userService.getUser(userId);

        return res.status(200).json(userData);
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal server error" }, error);
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

const addFavCityController = async (req, res) => {
    const { city } = req.body;
    const id = req.userId;

    try {
        const user = await User.findByIdAndUpdate(
            id,
            {
                $addToSet: {
                    favoriteCities: city,
                },
            },
            { runValidators: true },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "Favorite city added" }, user);
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" }, err);
    }
};

const delFavCityController = async (req, res) => {
    const id = req.userId;
    const { city } = req.body;

    try {
        const user = await User.findById(id);

        user.favoriteCities = user.favoriteCities.filter((c) => c !== city);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await user.save();

        return res.status(200).json(user.favoriteCities);
    } catch (err) {
        return res.status(500).json({ message: "Internal server error" }, err);
    }
};

export {
    registerController,
    loginController,
    getUserController,
    updateUserController,
    deleteUserController,
    addFavCityController,
    delFavCityController,
};
