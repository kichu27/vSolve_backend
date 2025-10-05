import { generateResponse } from "../../../utils/helpers/generate-response.js";
import getAllScoringParams from "../../services/scoringParamServices/getAllScoringParams.js";

export default async (req, res) => {
  try {

    const paramsData = await getAllScoringParams();
    return res.status(200).json(generateResponse("0010", { paramsData }));

  } catch (exception) {
    return res
      .status(500)
      .json(generateResponse("0002", { error: exception.message }));
  }
};
