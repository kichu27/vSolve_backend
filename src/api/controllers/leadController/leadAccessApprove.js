import { generateResponse } from "../../../utils/helpers/generate-response.js";
import { validateApproveLeadAccessCode } from "../../validators/lead.validator.js";
import validateAccessCode from "../../services/leadServices/validateAccessCode.js";

export default async (req, res) => {
  try {
    const { error, value } = validateApproveLeadAccessCode(req.body);

    if (error) {
      return res.status(400).json(generateResponse("0001", { error: error.details[0].message }));
    }

    const data = await validateAccessCode(value);

    return res.status(200).json(generateResponse("0014", { userToken :data }));

  } catch (exception) {
    return res.status(exception.status || 500).json(generateResponse("0002", { error: exception.message }));
  }
};
