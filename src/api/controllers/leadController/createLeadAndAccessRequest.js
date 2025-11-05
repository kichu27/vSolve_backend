import { generateResponse } from "../../../utils/helpers/generate-response.js";
import { validateCreateLeadAndAccessRequest } from "../../validators/lead.validator.js";
import leadExists from "../../services/leadServices/leadExists.js";
import { handleExistingLead } from "../../services/leadServices/leadControllerHelpers.js";
import { processNewLead } from "../../services/leadServices/processNewLead.js";

export default async (req, res) => {
  try {
    const { error, value } = validateCreateLeadAndAccessRequest(req.body);
    if (error){
      return res.status(400).json(generateResponse("0001", { error: error.details[0].message }));
    }

    const { exists, data: existingLead } = await leadExists(value.email);
    value.userIP = req.ip || req.connection.remoteAddress;

    if (exists) {
      const result = await handleExistingLead(existingLead, value);

      if (result.error)
        return res.status(400).json(generateResponse(result.code, { error: result.error }));

      if (result.success)
        return res.status(200).json(generateResponse(result.code, { lead: result.lead }));
    }

    // New lead
    const newLeadResponse = await processNewLead(value);
    return res.status(200).json(generateResponse(newLeadResponse.code));

  } catch (exception) {
    return res.status(500).json(generateResponse("0002", { error: exception.message }));
  }
};
