
import { AccessQuestionResponse } from "../../../models/index.js";

export default async function createAccessRequestUserResponse(_id , response ) {
  try {
    await AccessQuestionResponse.create({leadId : _id , response : response});
    return null;
  } catch (error) {
    throw error; 
  }
}
