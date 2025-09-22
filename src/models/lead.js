import mongoose from "mongoose";
const { Schema, model } = mongoose;

const LeadSchema = new mongoose.Schema({
  email: { type: String, required: true, lowercase: true, index: true ,  unique: true},
  name: { type: String, required: true },
  status: { 
    type: String, 
    enum: ["ACTIVE", "CONVERTED", "BLOCKED" , "PENDING"], 
    default: "PENDING" 
  },
  updatedBy:{ type: Schema.Types.ObjectId}
}, {timestamps : true});

export default mongoose.model("_lead", LeadSchema);
