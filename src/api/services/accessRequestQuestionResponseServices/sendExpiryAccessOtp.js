import crypto from "crypto";
import OTP_Authentication from "../../../models/otp_AuthenticationModel.js";
import { OTP_SECRET } from "../../../config/index.js";

const ENCRYPTION_KEY = crypto.createHash("sha256").update(OTP_SECRET).digest();
const IV_LENGTH = 16; // AES block size

function encryptOTP(otp) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv("aes-256-cbc", ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(otp, "utf8", "hex");
  encrypted += cipher.final("hex");
  return `${iv.toString("hex")}:${encrypted}`;
}

export default async function sendExpiryAccessOtp({ _id, email, accessCode, expiryDate }) {
  try {
    const encryptedOtp = encryptOTP(accessCode);
    const otpRecord = await OTP_Authentication.create({
      userId: _id,
      otpCode: encryptedOtp,
      deliveryMethod: "email",
      deliveryAddress: email,
      expireTime: expiryDate,
      status: "sent",
    });

    return { expireTime: otpRecord.expireTime };
  } catch (error) {
    throw error;
  }
}
