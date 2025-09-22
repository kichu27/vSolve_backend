
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const OTPAuthenticationSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    otpCode: { type: String, require: true },
    deliveryMethod: { type: String, enum: ["SMS", "email"] },
    deliveryAddress: { type: String, require: true },
    expireTime: { type: Date },
    verificationTime: { type: Date },
    verificationAttempts: { type: Number, default: 0 },
    otpType :  { type: String} ,
    status: { type: String, enum: ['sent', 'verified', 'expired', 'failed'], default: "sent" }
}, { timestamps: true, collection: '_otpAuthentication' });

const OTP_Authentication = model('_otpAuthentication', OTPAuthenticationSchema);
export default OTP_Authentication;

