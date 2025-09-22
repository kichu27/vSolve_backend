import mongoose from "mongoose";

const questionResponseSchema = new mongoose.Schema(
  {
    leadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
      required: true,
    },
    response: {
      type: mongoose.Schema.Types.Mixed, // can be string, number, array depending on question type
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model(
  "_accessQuestionResponse",
  questionResponseSchema
);
