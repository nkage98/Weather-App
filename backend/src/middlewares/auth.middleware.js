import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req, res, next) => {
    const access_token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "token not found" });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ message: "Invalid Token." });
        }

        req.userId = decoded.id;
    } catch (error) {
        return res.status(500).json({ message: "Error validating Token." });
    }

    next();
};

export default auth;
