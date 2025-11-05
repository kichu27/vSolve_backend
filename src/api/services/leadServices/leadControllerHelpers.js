import getLastResponseDate from "../../services/accessRequestQuestionResponseServices/getLastResponseDate.js";
import createAccessRequestUserResponse from "../../services/accessRequestQuestionResponseServices/createAccessQuestionResponse.js";

export async function handleExistingLead(existingLead, value) {
  switch (existingLead.status) {
    case "CONVERTED":
      return { error: "Lead is already converted.", code: "0003" };

    case "PENDING":
      return { error: "Lead request is still pending.", code: "0004" };

    case "BLOCKED":
      return { error: "Lead has been blocked.", code: "0006" };

    case "REJECTED":
      const lastUpdated = await getLastResponseDate(value.email);
      const now = new Date();
      const diffInDays = (now - lastUpdated) / (1000 * 60 * 60 * 24);

      if (diffInDays < 2) {
        return { error: "You can only re-apply 2 days after rejection.", code: "0005" };
      }

      await createAccessRequestUserResponse(existingLead._id, value.questionResponse);
      return { success: true, lead: existingLead, code: "0010" };

    default:
      return { error: "Invalid lead status.", code: "0007" };
  }
}
