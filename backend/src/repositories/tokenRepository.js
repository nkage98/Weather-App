import RefreshToken from "../models/tokens.model.js";

export async function createToken(userId) {
    return await RefreshToken.create({
        userId,
        expiresAt: new Date(
            Date.now() + Number(process.env.REFRESH_TOKEN_LIFETIME)
        ), // 7 days
    });
}

export async function getTokenById(userId) {
    return await RefreshToken.findById(userId);
}

export async function deleteTokenById(tokenId) {
    return await RefreshToken.findByIdAndDelete(tokenId);
}

export async function deleteTokenByUserId(userId) {
    console.log(userId);
    return await RefreshToken.findOne({ userId: userId });
}
