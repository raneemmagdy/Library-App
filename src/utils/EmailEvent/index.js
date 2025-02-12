import { EventEmitter } from "events";
import sedEmailByNodeMailer from "../../services/sendEmail.js";
import { emailTemplate } from "../../services/emailTemplate.js";
import { roleOptions, userModel } from "../../DB/models/index.js";
import { AppGeneralError } from "../globalErrorHandling/index.js";
import { GenerateToken } from "../Token/generateToken.js";
import { customAlphabet } from "nanoid";
import { Hash } from "../Encryption/hash.js";

export const emailEvent = new EventEmitter();
emailEvent.on("sendEmailConfirm", async (data) => {
  let { name, email } = data;
  const otp = customAlphabet('0123456789',4)();
  const hashOtp= await Hash({key:otp,SALT_ROUND:process.env.SALT_ROUND})
  await userModel.updateOne({email},{otpEmail:hashOtp})
  const success=await sedEmailByNodeMailer(
    "Confime Email",
    emailTemplate("Confime Email",name,
     `<p>Thank you for joining <strong>Library App</strong>! Use the code below to verify your email address:</p>
      <div class="otp-box">${otp}</div>
      <p>If you didn’t request this, please ignore this email or contact support if you have questions.</p>
      <p>Best,<br>The Library Team</p>`
    ),
    email
  );
  success? await userModel.updateOne({email},{otpCreatedAt:Date.now()}): next(new Error('Error in Sending Email...'))
  
});


