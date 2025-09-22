import { sendEmail } from "../../middlewares/index.js";
import crypto from "crypto";
import sendExpiryAccessOtp from "../accessRequestQuestionResponseServices/sendExpiryAccessOtp.js"

function generateSecureAccessCode(length = 7) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // Only uppercase + numbers
  const bytes = crypto.randomBytes(length);
  let code = "";

  for (let i = 0; i < length; i++) {
    code += chars[bytes[i] % chars.length];
  }

  return code;
}

export default async function sendStatusWiseEmail({ _id ,email, status }) {
  try {

    let subject, htmlContent;

    if (status === "ACTIVE") {
      subject = "Your Access Has Been Granted - VSOLVE";
      const accessCode = generateSecureAccessCode(8); // 7-char secure code
      const expiryDate = new Date(Date.now() + 48 * 60 * 60 * 1000);

      htmlContent = `
        <h2>Congratulations!</h2>
        <p>Your access request has been <b>approved</b>.</p>
        <p>Here is your <b>Access Code</b>: <strong>${accessCode}</strong></p>
        <p>This code is valid for <b>48 hours</b>. Do not share this code with anyone.</p>
        <p>Welcome aboard,<br/>Team VSOLVE</p>
      `;

      await sendExpiryAccessOtp({_id  , email , accessCode , expiryDate} )

    } else if (status === "REJECTED") {
      subject = "Access Request Update - VSOLVE";
      htmlContent = `
        <h2>Access Request Rejected</h2>
        <p>We regret to inform you that your access request has been <b>rejected</b>.</p>
        <p>You may apply again after <b>2 days</b>.</p>
        <p>Thank you for your understanding,<br/>Team VSOLVE</p>
      `;
    } else {
      return;
    }

   let data = await sendEmail(email, subject, htmlContent);

    return { message: "Email sent successfully" };
  } catch (error) {
    throw error;
  }
}
