import Joi from "joi";


export function validateCreateScoreParam(body) {
  const schema = Joi.object({
    category: Joi.string().required(),
    parameterName: Joi.string().required(),
    weightage: Joi.number().required(),
    metaData : Joi.object().required()
  });

  return schema.validate(body);
}

export function validateUpdateScoreParam(body) {
  const schema = Joi.object({
    _id : Joi.string().required(),
    category: Joi.string().optional(),
    parameterName: Joi.string().optional(),
    weightage: Joi.number().optional(),
    metaData : Joi.object().optional()
  });

  return schema.validate(body);
}

