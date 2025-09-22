import Joi from "joi";

export function validateCreateLeadAndAccessRequest(body) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    questionResponse: Joi.string().required(),
    aggrementAccepted : Joi.boolean().default(true)
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
