import mongoose, { Schema } from 'mongoose';

const scoringParamSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    trim: true
  },
  parameterName: {
    type: String,
    required: true,
    trim: true
  },
  weightage: {
    type: Number,
    required: true,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  metaData: {
    type: Schema.Types.Mixed,
    default: {},
  },
  
}, {timestamps : true});

export default mongoose.model("_scoringParam",scoringParamSchema);