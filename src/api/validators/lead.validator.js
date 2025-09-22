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