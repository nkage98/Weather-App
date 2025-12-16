import * as userRepo from "../repositories/userRepository.js";
import * as tokenRepo from "../repositories/tokenRepository.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function login(email, password) {
    try {
        console.log("email: ", email);
        const user = await userRepo.getUserByEmail(email);
        const userId = user._id.toString();
        console.log("user: ", user);
        if (!user) {
            throw new Error("User does not exist");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error("Incorrect password.");
        }

        console.log("password correct");

        await tokenRepo.deleteTokenByUserId(userId);

        const newRefreshTokenId = await tokenRepo.createToken(userId);

        console.log(newRefreshTokenId);

        const refresh_token = jwt.sign(
            { id: newRefreshTokenId.toString() },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        console.log("new refresh token: ", refresh_token);

        const access_token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "15m",
        });

        console.log("acces_token: ", access_token);
        return { user, access_token, refresh_token };
    } catch (error) {
        throw new Error("Internal server error", error);
    }
}

export async function verifyRefreshToken(token) {
    //Refresh Token too
    let payload;
    const renewThreshold = Number(process.env.REFRESH_RENEW_THRESHOLD);

    try {
        payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            throw new Error("ACCESS_TOKEN_EXPIRED");
        }
        throw new Error("ACCESS_TOKEN_INVALID");
    }

    const refreshToken = await tokenRepo.getTokenById(payload.id);

    if (!refreshToken) {
        throw new Error("REFRESH_TOKEN_NOT_FOUND");
    }

    if (Date.now() > refreshToken.expiresAt.getTime()) {
        throw new Error("REFRESH_TOKEN_EXPIRED");
    }

    if (refreshToken.expiresAt.getTime() - Date.now() < renewThreshold) {
        await tokenRepo.deleteTokenById(payload.id);

        const newRefreshToken = await tokenRepo.createToken(payload.userId);

        return { payload, newRefreshToken };
    }

    return payload;
}

export function verifyAccessToken(token) {
    let payload;
    try {
        payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            throw new Error("ACCESS_TOKEN_EXPIRED");
        }
        throw new Error("ACCESS_TOKEN_INVALID");
    }

    return payload;
}

export async function refreshAccessToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const data = await tokenRepo.getToken(decoded.id);

        if (!data) throw new Error("Invalid Token.");

        if (Date.now() > data.expiresAt.getTime()) {
            throw new Error("Token Expired.");
        }

        const access_token = jwt.sign(
            { userId: data.userId },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        return access_token;
    } catch (error) {
        throw new Error("Internal Server Error: ", error);
    }
}

//refatorar!!!
export async function issueRefreshToken(userId) {
    const { rawToken, hashToken } = generateRefreshToken();

    await tokenRepo.saveRefreshToken({
        userId,
        hashToken,
        expiresAt: new Date(Date.now() + REFRESH_TTL),
    });

    return rawToken;
}
