import * as authService from "../services/authService";

const refreshTokenController = async (req, res) => {
    const token = req.cookie.token;

    if (!token) return res.status(401).json({ message: "No token" });

    try {
        const newAccessToken = await authService.refreshAccessToken(token);

        return res
            .status(200)
            .json({ message: "new token generated" }, newAccessToken);
    } catch (error) {
        return res.status(401).json({ message: "Invalid Token: ", error });
    }
};

export { refreshTokenController };
