import { generateResponse } from "../../../utils/helpers/generate-response.js";
import { validateCreateScoreParam } from "../../validators/scoreParam.validator.js";
import createScoringParam from "../../services/scoringParamServices/createScoringParam.js";

export default async (req, res) => {
  try {
    const { error, value } = validateCreateScoreParam(req.body);

    if (error) {
      return res.status(400).json(generateResponse("0001", { error: error.details[0].message }));
    }

    const param = await createScoringParam(value);

    return res.status(200).json(generateResponse("0010", { param }));

  } catch (exception) {
    return res
      .status(500)
      .json(generateResponse("0002", { error: exception.message }));
  }
};
