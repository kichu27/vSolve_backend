import OTP_Authentication from "../../../models/otp_AuthenticationModel.js";

export default async function sendExpiryAccessOtp({ _id, email, accessCode ,expiryDate}) {
  try {
    const otpRecord = await OTP_Authentication.create({
      userId: _id,
      otpCode: accessCode,
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
