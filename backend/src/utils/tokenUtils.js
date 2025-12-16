import crypto from "crypto";

export function generateRefreshToken() {
    const rawToken = crypto.randomBytes(64).toString("hex");

    const hash = crypto.createHash("sha256").update(rawToken).digest("hex");

    return { rawToken, hashToken };
}
