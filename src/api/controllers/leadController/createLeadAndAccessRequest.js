import { generateResponse } from "../../../utils/helpers/generate-response.js";
import { validateCreateLeadAndAccessRequest } from "../../validators/lead.validator.js";
import createAccessRequestUserResponse from "../../services/accessRequestQuestionResponseServices/createAccessQuestionResponse.js";
import createLead from "../../services/leadServices/createLead.js";
import leadExists from "../../services/leadServices/leadExists.js";
import getLastResponseDate from "../../services/accessRequestQuestionResponseServices/getLastResponseDate.js"

export default async (req, res) => {
  try {
    const { error, value } = validateCreateLeadAndAccessRequest(req.body);

    if (error) {
      return res.status(400).json(generateResponse("0001", { error: error.details[0].message }));
    }

    const { exists, data: existingLead } = await leadExists(value.email);

    if (exists) {

      switch (existingLead.status) {

        case "CONVERTED":
          return res.status(400).json(generateResponse("0003", { error: "Lead is already converted." }));

        case "PENDING":
          return res.status(400).json(generateResponse("0004", {error: "Lead request is still pending."}));

        case "REJECTED":
          const lastUpdated = await getLastResponseDate(value.email);

          const now = new Date();
          const diffInMs = now - lastUpdated;
          const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

          if (diffInDays < 2) {
            return res.status(400).json(generateResponse("0005", {error: "You can only re-apply 2 days after rejection."}));
          }

          // If okay, create only a response record (no new lead)
          await createAccessRequestUserResponse( existingLead._id,value.questionResponse);

          return res.status(200).json(generateResponse("0010", { lead: existingLead }));

        case "BLOCKED":
          return res.status(400).json(generateResponse("0006", { error: "Lead has been blocked." }));

        default:
          return res.status(400).json(generateResponse("0007", { error: "Invalid lead status." }));
      }
    }

    // If lead doesn't exist, create new lead
    const lead = await createLead(value);
    const { _id } = lead;

    await createAccessRequestUserResponse(_id, value.questionResponse);

    return res.status(200).json(generateResponse("0010", { lead }));

  } catch (exception) {
    return res
      .status(500)
      .json(generateResponse("0002", { error: exception.message }));
  }
};
