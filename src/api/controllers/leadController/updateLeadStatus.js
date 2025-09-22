import { generateResponse } from "../../../utils/helpers/generate-response.js";
import { validateUpdateLeadAndAccessRequest } from "../../validators/lead.validator.js";
import updateLead from "../../services/leadServices/updateLead.js";
import sendStatusWiseEmail from "../../services/accessRequestQuestionResponseServices/sendStatusWiseEmail.js"
import getLeadDataById from "../../services/leadServices/getLeadDataById.js"




export default async (req, res) => {
  try {
    const { error, value } = validateUpdateLeadAndAccessRequest(req.body);

    if (error) {
      return res
        .status(400)
        .json(generateResponse("0001", { error: error.details[0].message }));
    }

    await updateLead(value);

    if (value.status) {
      let {email} = await getLeadDataById(value._id)
      value.email = email;
      await sendStatusWiseEmail(value);
    }

    return res.status(200).json(generateResponse("0011"));
  } catch (exception) {
    return res
      .status(500)
      .json(generateResponse("0002", { error: exception.message }));
  }
};
