import { generateResponse } from "../../../utils/helpers/generate-response.js";
import getLeadRequestsByType from "../../services/dashboardServices/getLeadRequestsByType.js";
import { validateFetchLeadListByStatus } from "../../validators/dashboard.validator.js";

export default async (req, res) => {
  try {
    const { error, value } = validateFetchLeadListByStatus(req.body);

    if (error) {
      return res
        .status(400)
        .json(generateResponse("0001", { error: error.details[0].message }));
    }

    let leadList = await getLeadRequestsByType(value.type);

    return res.status(200).json(generateResponse("0011", { leadList }));
  } catch (exception) {
    return res
      .status(500)
      .json(generateResponse("0002", { error: exception.message }));
  }
};
