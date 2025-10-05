import mongoose from "mongoose";
const { Schema, model } = mongoose;

const LeadSchema = new mongoose.Schema({
  // Mapped Existing Keys
  email: { 
    type: String, 
    required: true, 
    lowercase: true, 
    index: true,  
    unique: true,
    // NOTE: Mongoose doesn't natively check disposable domains, 
    // but the Joi validation will handle this before reaching the database.
  },
  name: { 
    type: String, 
    required: true,
    minlength: 2,
    maxlength: 80,
    // Use Joi for complex regex like letters/spaces only, 
    // or add a custom pre-save hook here.
  },

  // Reason for Access (Mapped to questionResponse)
  questionResponse: { 
    type: String, 
    required: true,
    minlength: 20,
    maxlength: 400,
    // Use Joi for spam keyword filtering.
  },

  // Ethical Charter Consent (Mapped to aggrementAccepted)
  aggrementAccepted: {
    type: Boolean,
    required: true,
    default: true,
  },
  
  // --- New Keys from Table ---

  // Phone Number (phone)
  phone: {
    type: String,
    required: true,
    // The E.164 format check is handled by Joi.
  },

  // Country (country)
  country: {
    type: String,
    required: true,
    enum: ['India', 'UAE', 'USA', /* add other fixed list values here */],
  },

  // City (city)
  city: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 40,
  },

  // Referral Source (referral_source)
  referralSource: {
    type: String,
    required: true,
  },

  // Preferred Engagement (preferred_mode) - Checkboxes -> Array of Strings
  preferredMode: {
    type: [String], // Array of strings to store selected options
    required: true,
    // minlength: 1 is handled by Joi validation
  },

  // Legacy Scale (legacy_scale)
  legacyScale: {
    type: String,
    required: true,
  },

  // Legacy Role (legacy_role)
  legacyRole: {
    type: String,
    required: true,
  },

  // Contact Consent (consent_contact) - For GDPR/DPDP
  consentContact: {
    type: Boolean,
    required: true,
    default: false,
  },

  // --- Original Schema Fields ---
  status: { 
    type: String, 
    enum: ["ACTIVE", "CONVERTED", "BLOCKED" , "PENDING"], 
    default: "PENDING" 
  },
  
  microScore: {
    type: Schema.Types.Mixed,
    default: {},
  },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'User' } // Assuming a 'User' model
}, { timestamps : true });

export default mongoose.model("_lead", LeadSchema);