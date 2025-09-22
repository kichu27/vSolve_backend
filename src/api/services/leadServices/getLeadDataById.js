import { Lead } from "../../../models/index.js";

export default async function getLeadDataById(userId) {
  try {
    const lead = await Lead.findOne({ _id : userId });
    return lead ;

  } catch (error) {
    throw error;
  }
}
