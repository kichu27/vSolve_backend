import Joi from "joi";

export function validateFetchLeadListByStatus(body) {
  const schema = Joi.object({
    type: Joi.string()
      .valid("CONVERTED", "REJECTED", "BLOCKED" , "ACTIVE")
      .messages({
        "any.only": "status must be one of CONVERTED, REJECTED, BLOCKED,ACTIVE"
      })
  });

  return schema.validate(body);
}
