import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema({
  email: { type: String, required: true, lowercase: true, index: true ,  unique: true},
  name: { type: String, required: true },
  status: { 
    type: String, 
    enum: ["ACTIVE", "CONVERTED", "BLOCKED" , "PENDING"], 
    default: "PENDING" 
  }
}, {timestamps : true});

export default mongoose.model("_lead", LeadSchema);
