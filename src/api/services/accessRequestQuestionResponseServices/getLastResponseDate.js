import { AccessQuestionResponse } from "../../../models/index.js";
import getLeadDataByEmail from "../leadServices/getLeadDataByEmail.js"

export default async function getLastResponseDate(email) {
  try {

    let {_id} = await getLeadDataByEmail(email);
    let data = await AccessQuestionResponse.find({leadId : _id}).sort({_id : -1}).limit(1);

    return data[0].updatedAt;
  } catch (error) {
    throw error; 
  }
}
