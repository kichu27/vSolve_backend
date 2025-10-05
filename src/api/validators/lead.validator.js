import Joi from "joi";

export function validateCreateLeadAndAccessRequest(body) {
  const schema = Joi.object({

    name: Joi.string()
      .min(2)
      .max(80)
      .pattern(/^[a-zA-Z\s]+$/) 
      .required()
      .messages({
        'string.pattern.base': 'Full Name must contain only letters and spaces.',
        'string.min': 'Full Name must be at least 2 characters long.',
        'string.max': 'Full Name cannot exceed 80 characters.',
      }),

    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        'string.email': 'Email ID must be a valid email address.',
      }),
      
    questionResponse: Joi.string()
      .min(20)
      .max(400)
      .disallow('spam', 'keyword2', 'free money') 
      .required()
      .messages({
        'string.min': 'Reason for Access must be at least 20 characters long.',
        'string.max': 'Reason for Access cannot exceed 400 characters.',
        'any.invalid': 'Reason for Access contains prohibited spam keywords.'
      }),
      
    aggrementAccepted: Joi.boolean()
      .valid(true)
      .required()
      .messages({
        'any.only': 'Ethical Charter Consent must be checked to proceed.'
      }),

    phone: Joi.string()
      .pattern(/^\+?\d{1,15}$/)
      .required()
      .messages({
        'string.pattern.base': 'Phone Number must be in a valid E.164 format (e.g., +91...).'
      }),

    country: Joi.string()
      .valid('India', 'UAE', 'USA')
      .required()
      .messages({
        'any.only': 'Country must be selected from the approved list.'
      }),

    city: Joi.string()
      .min(2)
      .max(40)
      .required()
      .messages({
        'string.min': 'City must be at least 2 characters long.',
        'string.max': 'City cannot exceed 40 characters.'
      }),

    referralSource: Joi.string()
      .required(),

    preferredMode: Joi.array()
      .items(Joi.string())
      .min(1)
      .required()
      .messages({
        'array.min': 'At least one Preferred Engagement mode must be selected.'
      }),

    legacyScale: Joi.string()
      .required(),

    // Legacy Role (legacy_role)
    legacyRole: Joi.string()
      .required(),

    consentContact: Joi.boolean()
      .valid(true)
      .required()
      .messages({
        'any.only': 'Contact Consent must be checked for compliance.'
      }),

  });

  return schema.validate(body);
}

export function validateApproveLeadAccessCode(body) {
  const schema = Joi.object({
    accessCode: Joi.string().required().length(8),
  });

  return schema.validate(body);
}

export function validateUpdateLeadAndAccessRequest(body) {
  const schema = Joi.object({
    _id: Joi.string()
      .trim()
      .length(24)
      .hex()
      .required()
      .messages({
        "string.base": "_id must be a valid ObjectId",
        "string.length": "_id must be 24 characters",
        "any.required": "_id is required"
      }),
    email: Joi.string().email().optional().messages({
      "string.email": "email must be a valid email address"
    }),
    status: Joi.string()
      .valid("CONVERTED", "REJECTED", "BLOCKED" , "ACTIVE")
      .optional()
      .messages({
        "any.only": "status must be one of CONVERTED, REJECTED, BLOCKED"
      })
  });

  return schema.validate(body);
}
