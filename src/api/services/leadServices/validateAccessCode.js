import { otpAuthentication } from "../../../models/index.js";
import jwt from "jsonwebtoken";
import { jwtSecretKey } from "../../../config/index.js";
import crypto from "crypto";
import { OTP_SECRET } from "../../../config/index.js";

const ENCRYPTION_KEY = crypto.createHash("sha256").update(OTP_SECRET || "").digest();
const IV_LENGTH = 16; // AES block size

function decryptOTP(encrypted) {
  const parts = (encrypted || "").split(":");
  if (parts.length !== 2) throw new Error("Invalid encrypted data");
  const [ivHex, encryptedData] = parts;
  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv("aes-256-cbc", ENCRYPTION_KEY, iv);
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

export default async function validateAccessCode({ accessCode }) {
  if (!accessCode) {
    const err = new Error("Access code is required");
    err.status = 400;
    throw err;
  }

  // Narrow down candidates: type and recent status reduce decrypt attempts
  const otpRecords = await otpAuthentication.find({
    otpType: "LEAD_EXP",
    status: "sent",
  });

  if (!otpRecords || otpRecords.length === 0) {
    const err = new Error("Access code is invalid");
    err.status = 400;
    throw err;
  }

  let validRecord = null;

  for (const record of otpRecords) {
    try {
      const decryptedOtp = decryptOTP(record.otpCode);

      // Use timingSafeEqual when buffers are same length, fallback to normal compare otherwise
      const a = Buffer.from(decryptedOtp);
      const b = Buffer.from(String(accessCode));
      let isEqual = false;

      if (a.length === b.length) {
        isEqual = crypto.timingSafeEqual(a, b);
      } else {
        // lengths differ -> definitely not equal, but still keep the same control flow
        isEqual = false;
      }

      if (isEqual) {
        validRecord = record;
        break;
      }
    } catch (e) {
      // ignore decryption errors/corrupted entries and continue
    }
  }

  if (!validRecord) {
    const err = new Error("Access code is invalid");
    err.status = 400;
    throw err;
  }

  const now = new Date();
  if (!validRecord.expireTime || validRecord.expireTime < now) {
    const err = new Error("Access code has expired");
    err.status = 400;
    throw err;
  }
  const tokenPayload = { userId: validRecord.userId.toString() };
  const token = jwt.sign(tokenPayload, jwtSecretKey, { expiresIn: "48h" });

  return token; // valid
}
