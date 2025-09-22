import { AccessQuestionResponse } from "../../../models/index.js";

export default async function getLastResponseDate(email) {
  try {
    let data = await AccessQuestionResponse.find({email}).sort({_id : -1}).limit(1);
    return data.updatedAt;
  } catch (error) {
    throw error; 
  }
}
