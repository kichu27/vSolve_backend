import computeMicroscoreFromForm1 from "../microScoreServices/computeMicroscoreFromAccessRequestForm.js";
import createLead from "./createLead.js";
import createAccessRequestUserResponse from "../accessRequestQuestionResponseServices/createAccessQuestionResponse.js";
import sendStatusWiseEmail from "../accessRequestQuestionResponseServices/sendStatusWiseEmail.js";
import { getQueueTag } from "./getQueueTag.js";

export async function processNewLead(value) {
  const score = await computeMicroscoreFromForm1(value);
  value.microScore = score;
  value.queueTag = getQueueTag(score);

  if (!score.flags.risk_email_disposable && score.score >= 9) {
    value.status = "ACTIVE";
  }

  const lead = await createLead(value);
  const { _id, email, status } = lead;

  await createAccessRequestUserResponse(_id, value.questionResponse);

  if (status === "ACTIVE") {
    await sendStatusWiseEmail({ _id, email, status });
    return { code: "0015" };
  }

  return { code: "0010" };
}
