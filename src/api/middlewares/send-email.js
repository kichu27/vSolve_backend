import nodemailer from "nodemailer";
import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export default async (toEmail, subject, htmlContent, fileUrl = null ,fileName = "vSolve.pdf") => {
  try {

    const userEmail = "kartikpatekar27@gmail.com";
    const passEmail = "gkbl pcag mggy rehp";
    const fromEmail = "kartikpatekar27@gmail.com";

    if (!toEmail || !subject || !htmlContent) {
      return {
        message: "Missing required fields",
        resultCode: "0001",
      };
    }

    let attachment = null;

    if (fileUrl) {
      // Create a replacement for __dirname
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);

      const response = await axios({
        url: fileUrl,
        method: "GET",
        responseType: "stream",
      });

      const tempFilePath = path.join(__dirname, "attachment.pdf");
      const writer = fs.createWriteStream(tempFilePath);

      response.data.pipe(writer);

      await new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
      });

      attachment = {
        filename: "attachment.pdf",
        path: tempFilePath,
        contentType: "application/pdf",
      };
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: userEmail,
        pass: passEmail,
      },
    });
    

    const mailOptions = {
      from: `"VSOLVE" <${fromEmail}>`,
      to: toEmail,
      subject,
      html: htmlContent,
      attachments: attachment ? [{
        filename: fileName,
        path: attachment.path,
      }] : [],
    };    

    const info = await transporter.sendMail(mailOptions);

    if (attachment && attachment.path) {
      fs.unlinkSync(attachment.path);
    }


    return {
      message: "Success",
      resultCode: "00131",
    };
  } catch (exception) {
    console.error(exception);
    return {
      message: "Server side error",
      resultCode: "00008",
    };
  }
};
