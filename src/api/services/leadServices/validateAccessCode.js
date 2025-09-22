import { otpAuthentication } from "../../../models/index.js";
import jwt from "jsonwebtoken";
import { jwtSecretKey } from "../../../config/index.js";

export default async function validateAccessCode({ accessCode }) {
  if (!accessCode) {
    const err = new Error("Access code is required");
    err.status = 400;
    throw err;
  }
console.log(accessCode)
  const record = await otpAuthentication.findOne({
    otpCode: accessCode,
    otpType: "LEAD_EXP",
  });

  console.log(record)

  if (!record) {
    const err = new Error("Access code is invalid");
    err.status = 400;
    throw err;
  }

  const now = new Date();
  if (!record.expireTime || record.expireTime < now) {
    const err = new Error("Access code has expired");
    err.status = 400;
    throw err;
  }
  const tokenPayload = { userId: record.userId.toString() };
  const token = jwt.sign(tokenPayload, jwtSecretKey, { expiresIn: "48h" });

  return token; // valid
}
